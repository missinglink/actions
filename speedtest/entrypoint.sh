#!/bin/bash
set -o xtrace

apt-get update -y && apt-get install ca-certificates speedtest-cli -y >/dev/null 2>&1

speedtest-cli