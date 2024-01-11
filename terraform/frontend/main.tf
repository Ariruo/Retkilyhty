resource "aws_security_group" "frontend_sg" {
  name        = "frontend-security-group"
  description = "Security group for frontend EC2 instance"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9200
    to_port     = 9200
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}




resource "aws_eip_association" "frontend_eip_association" {
  instance_id   = aws_instance.frontend_instance.id // Replace with your Frontend Instance resource ID
  allocation_id = "eipalloc-03cdc7ef20610e07f" // Replace with your EIP resource ID
}

resource "aws_instance" "frontend_instance" {
  ami           = var.ami_id
  instance_type = "t2.micro"
  key_name      = var.KeyName
  tags = {
    Name = "Frontend"
  }

  security_groups = [
    aws_security_group.frontend_sg.id // Replace with your security group ID
  ]

  user_data = templatefile("${path.module}/frontend.sh", {
      REGISTRY_USER    = var.REGISTRY_USER,
      REGISTRY_PASSWORD = var.REGISTRY_PASSWORD,
  })
}