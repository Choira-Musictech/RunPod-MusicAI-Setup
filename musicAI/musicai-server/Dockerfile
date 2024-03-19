FROM node:16.18.1

WORKDIR /app/musicai-server

COPY package*.json ./

RUN npm install

EXPOSE 3002

CMD ["npm", "run", "dev"]