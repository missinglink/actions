workflow "Check #1" {
  on = "check_run"
  resolves = ["docker://missinglink/spatialite"]
}

action "docker://missinglink/spatialite" {
  uses = "docker://ubuntu:latest"
  args = "env"
}

workflow "Push #1" {
  resolves = ["docker://missinglink/spatialite-1"]
  on = "push"
}

action "docker://missinglink/spatialite-1" {
  uses = "docker://ubuntu:latest"
  args = "env"
}

workflow "PR #1" {
  on = "pull_request"
  resolves = ["docker://ubuntu:latest"]
}

action "docker://ubuntu:latest" {
  uses = "docker://ubuntu:latest"
  args = "env"
}

workflow "Check Suite #1" {
  on = "check_suite"
  resolves = ["docker://ubuntu:latest-1"]
}

action "docker://ubuntu:latest-1" {
  uses = "docker://ubuntu:latest"
  args = "env"
}
