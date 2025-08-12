# Angular Ngrx with NestJS (Basic Jira-Clone)

A full-stack project to clone the core features of Jira, built as a monorepo with **Nx**. The application consists of a modern front-end using Angular and a robust back-end using NestJS, with data persisted in MongoDB.

## Features

### 🚀 **Front-end (Angular)**

- **User Interface**: Built with **PrimeNG** components and styled with **Tailwind CSS** for a clean, responsive design.
- **State Management**: Uses **NgRx** to manage global application state efficiently.
- **Task Management**: Create, read, update, and delete tasks with an intuitive UI.
- **Comment System**: Add and manage comments on individual tasks.

### ⚙️ **Back-end (NestJS)**

- **Authentication**: Secure user authentication using **Passport.js** with a JWT strategy.
- **RESTful API**: Provides a well-structured API for managing tasks and comments.
- **CRUD Operations**: Complete Create, Read, Update, and Delete functionality for tasks and comments.

### 💾 **Database (MongoDB)**

- A NoSQL database for flexible and scalable data storage.

---

## Getting Started

### Prerequisites

- [**Node.js**](https://nodejs.org/) (v18 or higher)
- [**npm**](https://www.npmjs.com/)
- [**Docker**](https://www.docker.com/) & [**Docker Compose**](https://docs.docker.com/compose/)

### Installation

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Setup Environment Variables:**
    Create a `.env` file by copying the provided example.

    ```bash
    cp .env.example .env
    ```

    Modify the `.env` file based on the `.env.example` to set your database connection details and other configurations:

    ```ini
    # --- .env.example ---
    PORT=3000

    # Shared Configuration
    MONGODB_USER=user_mongo
    MONGODB_PASS=pass_mongo
    MONGODB_DB=jira-clone
    JWT_SECRET=c30b1155402a4b260c9541b6768b4546
    JWT_EXPIRES_IN=60m

    # Docker-specific Connection
    MONGODB_URI_DOCKER=mongodb://mongo:27017

    # Local-specific Connection
    MONGODB_URI_LOCAL=mongodb://localhost:27017
    ```

---

## How to Run

### Option 1: Docker (Recommended for production and development)

Use Docker Compose to run the entire application stack with a single command. This will set up the Angular, NestJS, and MongoDB services in separate containers.

1.  **Start the services:**

    ```bash
    docker-compose up -d
    ```

    - The Angular front-end will be available at: `http://localhost:80`
    - The NestJS back-end API will be available at: `http://localhost:3000`

### Option 2: Local Development (Manual)

This method requires a running MongoDB instance on your local machine.

1.  **Start the MongoDB database:**
    If you don't have MongoDB running locally, you can use Docker to start it:

    ```bash
    docker-compose up mongo -d
    ```

2.  **Run all services with a single command:**
    Use `npm run dev` to start both the NestJS and Angular applications in development mode.

    ```bash
    npm run dev
    ```

    - The Angular front-end will be available at: `http://localhost:4200`
    - The NestJS back-end API will be available at: `http://localhost:3000`

### **`npm run dev` Script**

For the `npm run dev` command to work correctly, please ensure your `package.json` file includes the following script:

```json
"scripts": {
  "dev": "nx run-many --target=serve --projects=jira-clone-angular,jira-clone-nest --parallel"
},
```

## Project Structure

This project is a monorepo managed by Nx. The key directories are:

- apps/: Contains the main applications.
- jira-clone-angular/: The Angular front-end application.
- jira-clone-nest/: The NestJS back-end application.

## Resource

- [Angular Official Documentation](https://angular.dev/)
- [Ngrx Official Documentation](https://ngrx.io/)
- [NestJS Official Documentation](https://nestjs.com/)
- [NX Official Documentation](https://nx.dev/)
- [PrimeNG UI Official Documentation](https://primeng.org/)
- [TailwindCSS Official Documentation](https://tailwindcss.com/)
