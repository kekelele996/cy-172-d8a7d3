FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY src ./src

ENV PORT=3272
ENV HOST=0.0.0.0
EXPOSE 3272

CMD ["npm", "start"]
