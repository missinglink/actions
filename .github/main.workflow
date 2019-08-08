workflow "Check #1" {
  on = "check_run"
  resolves = ["ENV"]
}

workflow "Push #1" {
  on = "push"
  resolves = ["ENV"]
}

workflow "PR #1" {
  on = "pull_request"
  resolves = ["ENV"]
}

workflow "Check Suite #1" {
  on = "check_suite"
  resolves = ["ENV"]
}

workflow "Cron #1" {
  on = "schedule(*/15 * * * *)"
  resolves = ["ENV"]
}

action "ENV" {
  uses = "docker://ubuntu:latest"
  args = "env"
}

workflow "Check #2" {
  on = "check_run"
  resolves = ["action-a"]
}

workflow "Push #2" {
  on = "push"
  resolves = ["action-a"]
}

action "action-a" {
  uses = "./action-a"
  env = {
    MY_NAME = "Test"
  }
  args = "\"Hello world, I'm $MY_NAME!\""
}
