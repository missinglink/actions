#!/bin/bash
set -o xtrace

# kernel
uname -a

# OS
cat /etc/issue

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

# environment
env

# user
whoami