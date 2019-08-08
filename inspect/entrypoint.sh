#!/bin/bash
set -o xtrace

# kernel
uname -a

# OS
cat /etc/issue

# user
whoami

# users
cat /etc/passwd

# disks
df -h

# mounts
lsblk -f

# memory summary
free -m

# Memory info
cat /proc/meminfo

# CPU info
cat /proc/cpuinfo