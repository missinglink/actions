#!/bin/bash
set -o xtrace

apt-get update -y && apt-get install speedtest-cli -y

export PYTHONHTTPSVERIFY=0
speedtest-cli