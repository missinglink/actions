workflow "Check #1" {
  on = "check_run"
  resolves = ["docker://missinglink/spatialite"]
}

action "docker://missinglink/spatialite" {
  uses = "docker://missinglink/spatialite"
  args = "--help"
}
