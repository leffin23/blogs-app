FROM node:20-alpine

WORKDIR /bloggs-app
COPY package*.json .

RUN npm install

COPY . .
# RUN npx prisma migrate dev
RUN npx prisma generate
# RUN npx prisma db push
# RUN npx prisma studio

EXPOSE 3000

# CMD ["npx", "prisma", "db", "push", "&&", "npm", "run", "dev"]

CMD ["sh", "-c", "npx prisma db push && npm run dev"]