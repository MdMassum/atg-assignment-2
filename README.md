
# ATG Post-Comment Assignment

## Overview
This is a Full Stack(Mern) application designed to manage posts, comments, and user authentication. It is built using React for frontend, Express and Nodejs for Backend(Typescript), Mongodb for database and other essential libraries to enhance performance and functionality.


## Installation
To get started with the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/MdMassum/atg-assignment-2.git
   ```
2. Navigate to the project directory:
   ```sh
   cd atg-assignment-2
   cd frontend and cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Backend Details -->

## Backent Project Structure
```
atg-assignment-2/backend
    |── src/
    │   ├── config/
    │   │   ├── mongoConfig.ts
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── postController.ts
    │   ├── middleware/
    │   │   ├── auth.ts
    │   │   ├── error.ts
    │   ├── models/
    │   │   ├── authModel.ts
    │   │   ├── postModel.ts
    │   ├── routes/
    │   │   ├── authRoute.ts
    │   │   ├── postRoutes.ts
    │   ├── services/
    │   │   ├── postService.ts
    │   ├── types/
    │   │   ├── express.d.ts
    │   ├── utils/
    │   │   ├── auth.ts
    │   │   ├── errorHandler.ts
    │   │   ├── sendMail.ts
    │   │ 
    │   ├── server.ts
    │
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── vercel.json
    ├── tsconfig.json
```

## API Endpoints Documentation

### Authentication Routes

Base URL: `/api/auth`

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| POST   | `/signup`          | Registers a new user           |
| POST   | `/login`           | Logs in an existing user       |
| POST   | `/logout`          | Logs out the authenticated user|
| POST   | `/forgot-password` | Sends password reset link      |
| POST   | `/reset`           | Resets Password                |

---

### Post Routes

Base URL: `/api/posts`   (All this routes are authenticated)

| Method | Endpoint       | Description                         |
|--------|----------------|-------------------------------------|
| GET    | `/`            | Retrieves all posts                 |
| GET    | `/:id`         | Retrieves a specific post by ID     |
| POST   | `/create`      | Creates a new post                  |
| PUT    | `/:id`         | Updates an existing post by ID      |
| DELETE | `/:id`         | Deletes a post by ID                |
| POST   | `/like/:id`    | Likes a post                        |
| POST   | `/unlike/:id`  | Unlikes a post                      |
| POST   | `/comment/:id` | Adds a comment to a post            |


## Frontend Project Structure
```
atg-assignment-2/frontend
    │-- public/
    │-- src/
    │   │-- components/       # Reusable UI components
    │   │-- pages/            # Page components
    │   │-- assets/           # Static assets
    │   │-- App.jsx           # Main application file
    │   │-- index.css          # css file
    │   │-- main.jsx          # Entry point
    │-- .gitignore
    │-- index.html
    │-- package.json
    │-- README.md
```
## Technologies Used
- Express.js 
- Node.js 
- React.js
- React Router
- TailwindCSS
- Redux
- Mongodb

## Links

- Frontend Link : `https://atg-assignment-2-inky.vercel.app/`
- Backend Link : `https://atg-assignment-2-backend.vercel.app/`
- Video Link : `https://drive.google.com/file/d/1Zm-O_rFRUTJ6uKs-_6QwaHwliPsQUGMP/view?usp=drivesdk`
- Postman Link : `https://assignment-7873.postman.co/workspace/Assignment-Workspace~b4804b6c-c9aa-4dc8-9ecc-51d60bf895cc/collection/35181588-112e9ff3-55c7-4b28-9603-b1784840cfcd?action=share&creator=35181588`

