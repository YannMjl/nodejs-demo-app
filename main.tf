# -------------------------------------------------------------*
# Set the required provider and versions
# -------------------------------------------------------------*
terraform {
  required_providers {
    # it's now recommend pinning to the specific version of the 
    # Docker Provider you're using since new versions are 
    # released frequently
    docker = {
      source = "kreuzwerker/docker"
      version = "2.12.1"
    }
  }
}
# Configure the docker provider
provider "docker" {}
resource "docker_image" "nginx" {
  name         = "nginx:latest"
  keep_locally = false
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.latest
  name  = "tutorial"
  ports {
    internal = 80
    external = 8000
  }
}
