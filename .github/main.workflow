workflow "Check #1" {
  on = "check_run"
  resolves = ["docker://missinglink/spatialite"]
}

action "docker://missinglink/spatialite" {
  uses = "docker://missinglink/spatialite"
  args = "--help"
}

workflow "New workflow" {
  on = "push"
  resolves = ["docker://missinglink/spatialite-1"]
}

action "docker://missinglink/spatialite-1" {
  uses = "docker://missinglink/spatialite"
  args = "--help"
}
