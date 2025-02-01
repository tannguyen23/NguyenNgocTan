# 🚀 Resource Management API

This is a RESTful API built with **Node.js, Express, TypeScript, and Prisma**.

## 📌 Prerequisites

Ensure you have installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [SQLite](https://www.sqlite.org/) (used for local development)
- [Prisma CLI](https://www.prisma.io/docs/) (`npm install -g prisma`)

## 🚀 Getting Started

### 🛠 **Running Locally (Development Mode)**

#### 1️⃣ **Install dependencies**
```sh
npm install
```

#### 2️⃣ **Configure environment variables**
Create a `.env` file in the root directory:
```env
PORT=3000
DATABASE_URL="file:./prisma/dev.db"
```

#### 3️⃣ **Set up the database**
```sh
npx prisma migrate dev --name init
npx prisma generate
npx prisma db push  # Ensure SQLite file is created
```

#### 4️⃣ **Run the application**
```sh
npm run dev
```

---

### 🐳 **Running with Docker**

#### 1️⃣ **Configure Docker environment variables**
Create a `.env.docker` file:
```env
PORT=3000
DATABASE_URL="file:/app/prisma/dev.db"
```

#### 2️⃣ **Build and start the application**
```sh
docker-compose up --build
```

#### 3️⃣ **Run database migrations inside the container**
```sh
docker exec -it resource_api sh -c "npx prisma migrate dev --name init && npx prisma db push"
```

---

## 📡 **API is now running at**
```
http://localhost:3000/api
```

## 🛠 Available API Endpoints

| Method   | Endpoint             | Description           |
| -------- | -------------------- | --------------------- |
| `POST`   | `/api/resources`     | Create a new resource |
| `GET`    | `/api/resources`     | Get all resources     |
| `GET`    | `/api/resources/:id` | Get resource by ID    |
| `PUT`    | `/api/resources/:id` | Update a resource     |
| `DELETE` | `/api/resources/:id` | Delete a resource     |

## 🧪 API Testing

- Use **Postman** or **cURL** to test API.
- Example:
```sh
curl -X GET "http://localhost:3000/api/resources"
```

---
🚀 **You're ready to go!** If you run into issues, check your `.env` settings and database connection. Happy coding! 😊