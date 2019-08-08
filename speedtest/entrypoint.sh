#!/bin/bash
set -o xtrace

apt-get update -y && apt-get install ca-certificates speedtest-cli -y

speedtest-cli