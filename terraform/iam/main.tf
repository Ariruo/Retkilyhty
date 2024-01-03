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

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

  tags = {
    Name = "DBdump"
  }
}



output "role_name" {
  value = aws_iam_role.s3_access_role_backend.name
}

output "profile_name" {
  value = aws_iam_instance_profile.s3_access_backend_instance_profile.name
}