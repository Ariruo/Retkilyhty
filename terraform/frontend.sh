#!/bin/bash -xe
          sudo yum update -y
          sudo amazon-linux-extras install docker -y
          sudo systemctl start docker
          sudo systemctl enable docker

          # Docker login and pull image

          sudo docker login -u ${DockerUsername} -p ${DockerPassword}
          sudo docker pull ariru/trailtorchfrontend:latest
          sudo docker run -d -p 8000:8000 --name frontend_container ariru/trailtorchfrontend:latest

          # Nginx configuration

          sudo amazon-linux-extras install nginx1 -y
          sudo systemctl enable nginx
          sudo systemctl start nginx

          

          echo "user nginx;
          worker_processes auto;
          error_log /var/log/nginx/error.log;
          pid /run/nginx.pid;

          events {
              worker_connections 1024;
          }

          http {
              include /etc/nginx/mime.types;
              default_type application/octet-stream;
              log_format main '\$remote_addr - \$remote_user [\$time_local] \"\$request\" ' '\$status \$body_bytes_sent \"\$http_referer\" ' '\"\$http_user_agent\" \"\$http_x_forwarded_for\"';
              access_log /var/log/nginx/access.log main;
              sendfile on;
              tcp_nopush on;
              tcp_nodelay on;
              keepalive_timeout 65;
              types_hash_max_size 2048;

              include /etc/nginx/conf.d/*.conf;

              server {
                  listen 80 default_server;
                  listen [::]:80 default_server;
                  server_name www.retkilyhty.fi;

                  location / {
                      proxy_pass http://localhost:8000;
                      proxy_set_header Host \$host;
                      proxy_set_header X-Real-IP \$remote_addr;
                  }
              }
          }" > /etc/nginx/nginx.conf

          systemctl restart nginx 

          # Certbot installation and certificate generation

          sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm -y
          sudo yum-config-manager --enable epel
          sudo yum install certbot python-certbot-nginx -y
          sudo certbot --nginx -d www.retkilyhty.fi --agree-tos --email trailtorchinfo@gmail.com