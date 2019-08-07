workflow "Check #1" {
  on = "check_run"
  uses = "docker://ubuntu:latest"
  args = "env"
}

workflow "Push #1" {
  on = "push"
  uses = "docker://ubuntu:latest"
  args = "env"
}

workflow "PR #1" {
  on = "pull_request"
  uses = "docker://ubuntu:latest"
  args = "env"
}

workflow "Check Suite #1" {
  on = "check_suite"
  uses = "docker://ubuntu:latest"
  args = "env"
}
