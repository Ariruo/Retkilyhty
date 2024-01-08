module "iam" {
  source = "../iam"  # Adjust the path to the IAM module directory

  // Define input variables if required by the IAM module
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
  iam_instance_profile = module.iam.profile_name
  tags = {
    Name = "Backend"
  }

  security_groups = [
    aws_security_group.backend_sg.id // Replace with your security group ID
  ]

  user_data = templatefile("${path.module}/backend.sh", { 
  
    POSTGRES_DB     = var.POSTGRES_DB,
    POSTGRES_USER    = var.POSTGRES_USER,
    POSTGRES_PASSWORD = var.POSTGRES_PASSWORD,
    POSTGRES_PORT    = var.POSTGRES_PORT,
    POSTGRES_HOST    = var.POSTGRES_HOST})
}





resource "aws_eip_association" "backend_eip_association" {
  instance_id   = aws_instance.backend_instance.id // Replace with your Backend Instance resource ID
  allocation_id = "eipalloc-0bb855b1c54df265a" // Replace with your EIP resource ID
}

