variable "ami_id" {
  description = "AMI ID for the Frontend instance"
  default     = "ami-0fc61db8544a617ed" // Replace this with your desired default AMI ID
}

variable "KeyName" {
  description = "Name of an existing EC2 KeyPair to enable SSH access to the instances"
  type        = string
  
}


variable "REGISTRY_USER" {
  description = "Username for Docker registry"
  type        = string
}

variable "REGISTRY_PASSWORD" {
  description = "Password for Docker registry"
  type        = string
}

variable "POSTGRES_DB" {
  description = "PostgreSQL database name"
  type        = string
}

variable "POSTGRES_USER" {
  description = "PostgreSQL username"
  type        = string
}

variable "POSTGRES_PASSWORD" {
  description = "PostgreSQL password"
  type        = string
}

variable "POSTGRES_PORT" {
  description = "PostgreSQL port"
  type        = string
}

variable "POSTGRES_HOST" {
  description = "PostgreSQL host"
  type        = string
}

variable "AWS_ACCESS_KEY" {
  description = "AWS Access Key"
}

variable "AWS_SECRET_ACCESS_KEY" {
  description = "AWS Secret Access Key"
}