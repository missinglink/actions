FROM ubuntu:latest

# apt packages
RUN apt-get update && \
  apt-get install -y git-core curl && \
  rm -rf /var/lib/apt/lists/*

# configure git
RUN git config --global 'user.email' 'pelias.team@gmail.com'
RUN git config --global 'user.name' 'Pelias Docker'

# install nodejs
ENV NODE_VERSION='10.15.0'
RUN git clone 'https://github.com/isaacs/nave.git' /code/nave && /code/nave/nave.sh 'usemain' "${NODE_VERSION}" && rm -rf ~/.nave /code/nave

# add global install dir to $NODE_PATH
ENV NODE_PATH="/usr/local/lib/node_modules:$NODE_PATH"

# install node dependencies
ADD package.json /package.json
RUN npm install

ADD entrypoint.js /entrypoint.js
ENTRYPOINT ["/entrypoint.js"]