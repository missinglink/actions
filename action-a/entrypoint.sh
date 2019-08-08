#!/bin/sh -l

sh -c "echo $*"

docker run --rm ubuntu:latest whoami