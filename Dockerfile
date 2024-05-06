FROM node:21.6.2

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD ["npx", "ts-node", "src/index.ts"]
