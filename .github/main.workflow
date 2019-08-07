workflow "Check #1" {
  on = "check_run"
  resolves = "ENV"
}

workflow "Push #1" {
  on = "push"
  resolves = "ENV"
}

workflow "PR #1" {
  on = "pull_request"
  resolves = "ENV"
}

workflow "Check Suite #1" {
  on = "check_suite"
  resolves = "ENV"
}

action "ENV" {
  uses = "docker://ubuntu:latest"
  args = "env"
}
