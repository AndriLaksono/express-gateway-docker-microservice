FROM node:latest

WORKDIR /usr/src/app/api-auth

COPY package.json /usr/src/app/api-auth

RUN npm install

COPY . /usr/src/app/api-auth

EXPOSE 3003

CMD [ "npm", "start" ]