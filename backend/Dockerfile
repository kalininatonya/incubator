FROM node:14.18.2-slim

COPY src/ /var/www/node
COPY config/ /var/www/node/config
COPY package.json /var/www/node
COPY package-lock.json /var/www/node

RUN cd /var/www/node && npm ci

ENV NODE_ENV=production

CMD cd /var/www/node && node app.js
