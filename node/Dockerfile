# latest official node image
FROM node:latest

MAINTAINER Jonathan Foster <jxf9099@rit.edu>

# use nodemon for development
RUN npm install --global nodemon
RUN npm install -g express-generator
RUN npm install --global express

# use cached layer for node modules
#ADD package.json /tmp/package.json
#RUN cd /tmp && npm install
#RUN mkdir -p /usr/src && cp -a /tmp/node_modules /usr/src/

# add project files
#WORKDIR /usr/src
#ADD . /usr/src

WORKDIR /node

CMD ["nodemon", "server.js"]
