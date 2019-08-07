FROM ubuntu:latest

# apt packages
RUN apt-get update && \
  apt-get install -y ca-certificates speedtest-cli && \
  rm -rf /var/lib/apt/lists/*

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]