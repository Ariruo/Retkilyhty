variable "REGISTRY_USER" {
  description = "Username for Docker registry"
  type        = string
}

variable "REGISTRY_PASSWORD" {
  description = "Password for Docker registry"
  type        = string
}

variable "ami_id" {
  description = "AMI ID for the Frontend instance"
  default     = "ami-0fc61db8544a617ed" // Replace this with your desired default AMI ID
}


variable "KeyName" {
  description = "Name of an existing EC2 KeyPair to enable SSH access to the instances"
  type        = string
}