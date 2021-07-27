# -------------------------------------------------------------*
# Create and config Kubernetes cluster
# -------------------------------------------------------------*
# This will created the Kubernetes cluster and nodes in GCP
resource "google_container_cluster" "primary" {
  name               = "node-demo-k8s"  # cluster name
   location          = "us-central1-c"
  initial_node_count = 3               # number of node for the cluster

  # cluster auth
  master_auth {
    username = ""
    password = ""

    client_certificate_config {
      issue_client_certificate = false
    }
  }

  # let's now configure kubectl to talk to the cluster
  provisioner "local-exec" {
    command = "gcloud container clusters get-credentials ${var.cluster_name} --zone ${var.zone} --project ${var.project_id}"
  }

  node_config {
    preemptible  = true
    machine_type = "e2-micro"

    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    metadata = {
      disable-legacy-endpoints = "true"
    }

    tags = ["node-demo-k8s"]
  }

  timeouts {
    # time out after 45 min if the Kubernetes cluster creation is still not finish
    create = "45m" 
    update = "60m"
  }
}

# -------------------------------------------------------------*
# Next, we create firewall rule to allow access to application
# note: in our deploy.yml we set and know that
# The range of valid ports in kubernetes is 30000-32767
# -------------------------------------------------------------*
resource "google_compute_firewall" "nodeports" {
  name    = "node-port-range"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["30000-32767"]
  }
  source_ranges = ["0.0.0.0/0"]
}
