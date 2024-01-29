# Basic PayTM web application

Basic Paytm's react and rest api application.

## Module used

Frontend

1. React Vite (Frontend library)
1. Recoil (state managment library)
1. Tailwindcss (styling library)
1. Prettier (makes code look pretty)
1. axios (makes http request)
1. react router (routing url)

Bakcend

1. Mongoose (MongoDB )
1. zod (Body validator)
1. jsonwebtoken (JWT token generator)
1. nodemon (dev tool to run file)
1. express (Backend module)
1. cors (Cors settings)
1. bcrypt (For password hashing)

## Configuration (required)

Add .env file inside backend folder

```dotenv
  MONGO_URI = 
  PORT = 3009
  JWT_SECRETE = 
  BCRYPT_SALT_ROUND = 10
```

## Running steps

1. Clone this repo to run locally.
1. Run following steps

Backend

```bash
cd backend
npm install
npm run start
```

Frontend

```bash
cd frontend
npm install
npm run dev
```
