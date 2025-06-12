# User Management System
This test is developed using ReactJS TailwindCSS for the client and NodeJS MySQL for the server.

## 🔥 Features

  <ul>
      <li>A robust authentication system ensures user data is safeguarded and protected.</li>
      <li>Includes a smooth scroll-to-top feature for effortless navigation and improved usability.</li>
      <li>Supports secure and reliable payments via Stripe. Helps users to make transactions easily.</li>
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
      <li>MongoDB</li>
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
DATABASE_URL="mysql://root:root@db:3306/authentication"
JWT_SECRET="your_jwt_secret"
PORT=4000
DB_HOST=db
DB_PORT=3306
```

4. Launch the application in development mode :

```
docker-compose up --build
```
