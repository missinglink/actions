workflow "check_run" {
  on = "check_run"
  resolves = ["env"]
}

workflow "check_suite" {
  on = "check_suite"
  resolves = ["env"]
}

workflow "commit_comment" {
  on = "commit_comment"
  resolves = ["env"]
}

workflow "create" {
  on = "create"
  resolves = ["env"]
}

workflow "delete" {
  on = "delete"
  resolves = ["env"]
}

workflow "deployment" {
  on = "deployment"
  resolves = ["env"]
}

workflow "deployment_status" {
  on = "deployment_status"
  resolves = ["env"]
}

workflow "fork" {
  on = "fork"
  resolves = ["env"]
}

workflow "gollum" {
  on = "gollum"
  resolves = ["env"]
}

workflow "issue_comment" {
  on = "issue_comment"
  resolves = ["env"]
}

workflow "issues" {
  on = "issues"
  resolves = ["env"]
}

workflow "label" {
  on = "label"
  resolves = ["env"]
}

workflow "member" {
  on = "member"
  resolves = ["env"]
}

workflow "milestone" {
  on = "milestone"
  resolves = ["env"]
}

workflow "page_build" {
  on = "page_build"
  resolves = ["env"]
}

workflow "project" {
  on = "project"
  resolves = ["env"]
}

workflow "project_card" {
  on = "project_card"
  resolves = ["env", "projectcard"]
}

workflow "project_column" {
  on = "project_column"
  resolves = ["env"]
}

workflow "public" {
  on = "public"
  resolves = ["env"]
}

workflow "pull_request" {
  on = "pull_request"
  resolves = []
}

workflow "pull_request_review_comment" {
  on = "pull_request_review_comment"
  resolves = ["env"]
}

workflow "pull_request_review" {
  on = "pull_request_review"
  resolves = ["env"]
}

workflow "push" {
  on = "push"
  resolves = ["inspect", "speedtest"]
}

workflow "repository_dispatch" {
  on = "repository_dispatch"
  resolves = ["env"]
}

workflow "repository_vulnerability_alert" {
  on = "repository_vulnerability_alert"
  resolves = ["env"]
}

workflow "release" {
  on = "release"
  resolves = ["env"]
}

workflow "status" {
  on = "status"
  resolves = ["env"]
}

workflow "watch" {
  on = "watch"
  resolves = ["env"]
}

workflow "Cron" {
  on = "schedule(*/15 * * * *)"
  resolves = ["env"]
}

action "env" {
  uses = "docker://ubuntu:latest"
  args = "env"
}

action "inspect" {
  uses = "./inspect"
}

action "speedtest" {
  uses = "./speedtest"
}

action "projectcard" {
  uses = "./project_card"
}
