#!/bin/sh -l

sh -c "echo $*"

docker run --rm -it ubuntu:latest whoami