
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

resource "aws_security_group" "backend_sg" {
  name_prefix = "BackendSecurityGroup"
  description = "Security Group for Backend EC2 Instance"

  ingress {
    from_port   = 9000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
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

resource "aws_instance" "backend_instance" {
  ami           = var.ami_id
  instance_type = "t2.micro"
  key_name      = var.KeyName
  iam_instance_profile = aws_iam_instance_profile.s3_access_backend_instance_profile.name
  tags = {
    Name = "Backend"
  }

  security_groups = [
    aws_security_group.backend_sg.id // Replace with your security group ID
  ]

  user_data = templatefile("./backend.sh", {})
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

  user_data = templatefile("./frontend.sh", {})
}

resource "aws_eip" "backend_eip" {
  instance = aws_instance.backend_instance.id // Replace with your Backend Instance resource ID
  vpc      = true // If working in a VPC

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_eip_association" "backend_eip_association" {
  instance_id   = aws_instance.backend_instance.id // Replace with your Backend Instance resource ID
  allocation_id = eipalloc-0bb855b1c54df265a // Replace with your EIP resource ID
}

resource "aws_eip" "frontend_eip" {
  instance = aws_instance.frontend_instance.id // Replace with your Frontend Instance resource ID
  vpc      = true // If working in a VPC

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_eip_association" "frontend_eip_association" {
  instance_id   = aws_instance.frontend_instance.id // Replace with your Frontend Instance resource ID
  allocation_id = eipalloc-03cdc7ef20610e07f // Replace with your EIP resource ID
}

resource "aws_iam_role" "s3_access_role_backend" {
  name = "S3AccessRoleBackend"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = {
        Service = "ec2.amazonaws.com"
      },
      Action    = "sts:AssumeRole"
    }]
  })

  tags = {
    Name = "S3AccessRoleBackend"
  }
}

resource "aws_iam_policy" "s3_access_policy" {
  name        = "S3AccessPolicy"
  description = "Policy for accessing S3 resources"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Action    = [
        "s3:GetObject",
        "s3:PutObject"
      ],
      Resource  = [
        "arn:aws:s3:::databasee/*",
        "arn:aws:s3:::DBdump/*"
      ]
    }]
  })
}

resource "aws_iam_role_policy_attachment" "s3_access_attachment" {
  role       = aws_iam_role.s3_access_role_backend.name
  policy_arn = aws_iam_policy.s3_access_policy.arn
}

resource "aws_iam_instance_profile" "s3_access_backend_instance_profile" {
  name = "S3AccessBackendInstanceProfile"
  role = aws_iam_role.s3_access_role_backend.name
}


resource "aws_s3_bucket" "dbdump" {
  bucket = "DBdump"

  tags = {
    Name = "DBdump"
  }
}
