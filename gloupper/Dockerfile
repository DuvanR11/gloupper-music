FROM node:18

WORKDIR /gloupper

COPY package*.json .

RUN npm install --force  
RUN npm rebuild bcrypt --build-from-source

COPY prisma ./prisma
RUN npx prisma generate  

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
