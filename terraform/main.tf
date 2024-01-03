module "backend" {
  source = "./backend"
  
  // Pass required variables for the backend module
  POSTGRES_DB     = var.POSTGRES_DB
  POSTGRES_USER   = var.POSTGRES_USER
  POSTGRES_PASSWORD = var.POSTGRES_PASSWORD
  POSTGRES_PORT   = var.POSTGRES_PORT
  POSTGRES_HOST   = var.POSTGRES_HOST
  KeyName = var.KeyName
}

module "frontend" {
  source = "./frontend"
  
  // Pass required variables for the frontend module
  REGISTRY_USER = var.REGISTRY_USER
  REGISTRY_PASSWORD = var.REGISTRY_PASSWORD
  KeyName = var.KeyName
}

module "iam" {
  source = "./iam"
  
  // Pass required variables for the IAM module
  // Add your IAM-related variables here
}
