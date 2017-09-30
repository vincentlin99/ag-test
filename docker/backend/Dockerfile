FROM ubuntu:16.04

# install locales
RUN apt-get update
RUN apt-get install -y locales
RUN locale-gen zh_TW.UTF-8 &&\
  DEBIAN_FRONTEND=noninteractive dpkg-reconfigure locales
RUN locale-gen zh_TW.UTF-8
ENV LANG zh_TW.UTF-8
ENV LANGUAGE zh_TW:zh
ENV LC_ALL zh_TW.UTF-8

# install curl
RUN apt-get install -y curl

# install imagemagick
RUN apt-get install -y imagemagick

# install node.js
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

# install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install -y yarn

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install app dependencies
COPY . /usr/app
RUN yarn install --production

EXPOSE 3000

CMD ["node", "server.js"]
