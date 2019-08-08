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

# memory
free -m

# CPU
cat /proc/cpu_info