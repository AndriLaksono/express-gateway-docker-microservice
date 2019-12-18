FROM node:latest

WORKDIR /usr/src/app/api-crud

COPY package.json /usr/src/app/api-crud

RUN npm install

COPY . /usr/src/app/api-crud

EXPOSE 3004

CMD [ "npm", "start" ]