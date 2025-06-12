# User Management System
This project is developed using ReactJS TailwindCSS for the client and NodeJS MySQL for the server.

## 🔥 Features

  <ul>
    <li>🔐 **Authentication & Authorization** – ระบบล็อกอิน / สมัครสมาชิก พร้อม JWT สำหรับจัดการ session</li>
    <li>👥 **User Roles & Access Control** – กำหนดสิทธิ์การเข้าถึงตาม role เช่น admin, user</li>
    <li>🧩 **User CRUD Management** – ฟังก์ชันเพิ่ม, ลบ, แก้ไข, และเรียกดูผู้ใช้</li>
    <li>🚫 **Route Protection** – ป้องกันการเข้าถึง endpoint ที่ไม่ได้รับอนุญาต</li>
  </ul>

## 🍀 Technologyies Used
  <i>Frontend :</i>
  <ul>
      <li>ReactJS</li>
      <li>TailwindCSS</li>
  </ul>
  
  <i>Backend :</i>
  <ul>
      <li>NodeJS</li>
      <li>ExpressJS</li>  
  </ul>

  <i>Database :</i>
  <ul>
      <li>MySQL</li>
     <li>Prisma ORM</li>
  </ul>

## ❄️ Installation

1. Clone this repository :

```bash
git clone https://github.com/supakunz/global_wireless_test.git
```

2. Navigate to the project folder and install dependencies :

```
cd global_wireless_test
```

3. Set up the environment variables :

 - Create a `.env` file in the client and server root directory.

 - Add the following variables to the .env file on client, replacing the placeholder values with your own:

```
VITE_APP_API = http://localhost:4000
```

 - Add the following variables to the .env file on server, replacing the placeholder values with your own:

```
PORT = 4000
CLIENT_URL = http://localhost:5174
DATABASE_URL = "mysql://root:root@db:3306/authentication"
JWT_SECRET = "your_jwt_secret"
DB_HOST = db
DB_PORT = 3306
```

4. Launch the application in development mode :

```
docker-compose up --build
```
- Create a `.env` file in the client and server root directory.

- Add the following variables to the .env file on client, replacing the placeholder values with your own:

- Add the following variables to the .env file on client, replacing the placeholder values with your own:

## 🧪 Access URLs

- Backend API - `http://localhost:4000`

- Frontend App - `http://localhost:5174`

- phpMyAdmin - `http://localhost:8080`

##

### 🛠️ แก้ปัญหา `entrypoint.sh: no such file or directory` บน Windows

```
exec /entrypoint.sh: no such file or directory
```
- ปัญหาอาจเกิดจาก entrypoint.sh ใช้ line ending แบบ Windows (CRLF) ซึ่งไม่ถูกต้องสำหรับ container ที่รันบน Linux

##

### ✅ วิธีแก้ใน VS Code:

- เปิดไฟล์ servers/entrypoint.sh ด้วย VS Code

- มองที่มุมล่างขวา → หากขึ้นว่า CRLF ให้คลิกที่มัน

- เลือก LF จากเมนูที่แสดง

- กด Ctrl + S เพื่อบันทึก
  
