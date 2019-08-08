FROM ubuntu:latest

<<<<<<< HEAD
# apt packages
RUN apt-get update && \
  apt-get install -y ca-certificates speedtest-cli && \
  rm -rf /var/lib/apt/lists/*

=======
>>>>>>> ca-certificates
ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]