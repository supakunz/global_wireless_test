FROM node:18-alpine

WORKDIR /app

# ติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# ติดตั้ง netcat สำหรับรอ DB
RUN apk add --no-cache netcat-openbsd

# Copy source code
COPY . .

# Copy script entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

# ใช้ script เป็น entrypoint
ENTRYPOINT ["/entrypoint.sh"]
