# Frontend
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5174
CMD ["npx", "vite", "--host", "0.0.0.0"]
