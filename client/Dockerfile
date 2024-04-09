FROM node:18-alpine

WORKDIR /analytics-web

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT ["/analytics-web/entrypoint.sh"]

CMD ["npm", "run", "start"]
