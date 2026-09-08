# Student Accommodation System

A full-stack student accommodation management system developed using Node.js, Express, MongoDB and a plain HTML/CSS/JavaScript frontend. The application is fully containerised using Docker and Docker Compose.

## Features

The system has three main modules:

* **Authentication:** Students and admins can register and log in using JWT authentication. Passwords are securely hashed using bcryptjs.
* **Room Management:** Admins can add, update and delete accommodation rooms. Users can view available rooms.
* **Applications:** Students can apply for rooms and track their application status. Admins can view, approve or reject applications.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* HTML, CSS and JavaScript
* Docker
* Docker Compose

The frontend is served directly by the Express server and does not require a separate frontend build process.

## Project Structure

```text
student-accomodation-system-hd/
├── server.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── room.model.js
│   │   └── application.model.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── room.controller.js
│   │   └── application.controller.js
│   ├── middleware/
│   │   └── auth.js
│   └── routes/
│       ├── auth.routes.js
│       ├── room.routes.js
│       └── application.routes.js
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
└── package-lock.json
```

## Getting Started

### 1. Clone the Repository

Clone the GitHub repository:

```bash
git clone https://github.com/Sanika-prog/student-accommodation-system-hd.git
```

Navigate into the project folder:

```bash
cd student-accommodation-system-hd
```

Open the project in Visual Studio Code:

```bash
code .
```

### 2. Start Docker Desktop

Make sure Docker Desktop is installed and running before starting the application.

### 3. Build and Start the Application

Open the VS Code terminal in the project folder and run:

```bash
docker-compose up --build
```

Docker Compose starts two services:

* **Node.js/Express:** Runs the backend API and serves the frontend.
* **MongoDB:** Stores the application data.

### 4. Open the Application

Once the containers are running, open:

```text
http://localhost:5000
```

The complete application can be accessed through the browser.

## Using the Application

### Student

A student can:

* Register and log in
* View available rooms
* Apply for a room
* View their applications
* Track pending, approved and rejected applications

### Admin

An admin can:

* Register and log in
* Add, update and delete rooms
* View student applications
* Approve or reject applications

## API Endpoints

### Authentication

| Method | Endpoint             | Access        |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Public        |
| POST   | `/api/auth/login`    | Public        |
| GET    | `/api/auth/me`       | Authenticated |

### Rooms

| Method | Endpoint         | Access |
| ------ | ---------------- | ------ |
| GET    | `/api/rooms`     | Public |
| GET    | `/api/rooms/:id` | Public |
| POST   | `/api/rooms`     | Admin  |
| PUT    | `/api/rooms/:id` | Admin  |
| DELETE | `/api/rooms/:id` | Admin  |

### Applications

| Method | Endpoint                       | Access  |
| ------ | ------------------------------ | ------- |
| POST   | `/api/applications`            | Student |
| GET    | `/api/applications/my`         | Student |
| GET    | `/api/applications`            | Admin   |
| PUT    | `/api/applications/:id/status` | Admin   |

Protected routes use a JWT Bearer token in the `Authorization` header.

## Application Flow

1. Admin registers and logs in.
2. Admin creates accommodation rooms.
3. Student registers and logs in.
4. Student views available rooms.
5. Student applies for a room.
6. The application is created with a `pending` status.
7. Admin reviews the application.
8. Admin approves or rejects the application.
9. The student sees the updated application status.
10. Approved applications update room occupancy.

## Required Student Route

The required marking endpoint is:

```text
http://localhost:5000/api/student
```

It returns:

```json
{
  "name": "Sanika Thelakkadan Chathoth",
  "studentId": "226265671"
}
```

## Testing

The application was tested through the web interface after starting the Docker containers.

The main end-to-end flow was tested by:

1. Registering an admin.
2. Creating a room as the admin.
3. Registering a student.
4. Applying for a room as the student.
5. Checking the pending application.
6. Approving or rejecting the application as the admin.
7. Checking the updated application status.
8. Confirming that room occupancy is updated correctly.

The application was also tested from a clean Docker environment using:

```bash
docker-compose down -v
docker-compose up --build
```

The application was then accessed through:

```text
http://localhost:5000
```

The required student endpoint was also checked at:

```text
http://localhost:5000/api/student
```

## Environment Variables

The project uses environment variables for configuration:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/hosteldb
JWT_SECRET=replace-with-a-long-random-secret
```

The `.env.example` file is provided as a template. The actual `.env` file is excluded from the repository to avoid exposing sensitive configuration.

## Stopping the Application

To stop the running containers:

```bash
docker-compose down
```

To remove the containers and MongoDB volume for a clean test:

```bash
docker-compose down -v
```
