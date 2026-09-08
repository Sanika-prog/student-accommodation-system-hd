# Melbourne Student Accommodation System

A full-stack student accommodation management system built using Node.js, Express, MongoDB and a simple HTML/CSS/JavaScript frontend.

The system has three main parts:

1. **Authentication** – students and admins can register and log in using JWT authentication.
2. **Room Management** – admins can add, update and delete rooms, while logged-in users can view available rooms.
3. **Applications** – students can apply for rooms and check their application status. Admins can view applications and approve or reject them.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* HTML, CSS and JavaScript
* Docker and Docker Compose

The frontend does not require a separate build process. It is served directly by the Express server.

## Project Structure

```text
student_accomodation_system_hd/
│
├── server.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Room.js
│   │   └── Application.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── roomController.js
│   │   └── applicationController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   └── routes/
│       ├── authRoutes.js
│       ├── roomRoutes.js
│       └── applicationRoutes.js
│
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## Getting Started

### Using Docker

Docker Compose can be used to run both the application and MongoDB.

Run:

```bash
docker-compose up --build
```

Once the containers are running, open:

```text
http://localhost:5000
```

The application should be available through the browser.

### Running Without Docker

First install the project dependencies:

```bash
npm install
```

Make sure MongoDB is running locally, or update the MongoDB connection string to use MongoDB Atlas.

Create a `.env` file based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student_accomodation_system_hd
JWT_SECRET=replace-with-a-long-random-secret
```

Then start the server:

```bash
npm start
```

## Using the Application

### Student

A student can:

* Register an account
* Log in
* View available rooms
* Apply for a room
* View their applications
* Track whether an application is pending, approved or rejected

### Admin

An admin can:

* Register and log in
* Add new rooms
* Update room details
* Delete rooms
* View all student applications
* Approve or reject applications

## API Routes

### Authentication

| Method | Route                | Body                               | Authentication |
| ------ | -------------------- | ---------------------------------- | -------------- |
| POST   | `/api/auth/register` | `{ name, email, password, role? }` | None           |
| POST   | `/api/auth/login`    | `{ email, password }`              | None           |
| GET    | `/api/auth/me`       | None                               | Bearer token   |

The `role` field can be `student` or `admin`. If it is not provided during registration, the user is created as a student.

### Rooms

| Method | Route            | Body                                                | Authentication |
| ------ | ---------------- | --------------------------------------------------- | -------------- |
| GET    | `/api/rooms`     | None                                                | None           |
| GET    | `/api/rooms/:id` | None                                                | None           |
| POST   | `/api/rooms`     | `{ roomNumber, block, capacity, pricePerSemester }` | Admin          |
| PUT    | `/api/rooms/:id` | Room fields                                         | Admin          |
| DELETE | `/api/rooms/:id` | None                                                | Admin          |

### Applications

| Method | Route                          | Body                                   | Authentication |
| ------ | ------------------------------ | -------------------------------------- | -------------- |
| POST   | `/api/applications`            | `{ roomId, notes? }`                   | Student        |
| GET    | `/api/applications/my`         | None                                   | Student        |
| GET    | `/api/applications`            | None                                   | Admin          |
| PUT    | `/api/applications/:id/status` | `{ status: "approved" or "rejected" }` | Admin          |

Protected routes use the following header:

```text
Authorization: Bearer <token>
```

The token is returned after a successful registration or login.

## Main Application Flow

The basic flow of the application is:

1. An admin registers and logs in.
2. The admin creates accommodation rooms.
3. A student registers and logs in.
4. The student views the available rooms.
5. The student submits an application for a room.
6. The application is initially given a `pending` status.
7. The admin views the submitted applications.
8. The admin approves or rejects an application.
9. The student can see the updated application status.
10. When an application is approved, the room occupancy is updated.

## Required Student Route

The following route is included for marking:

```text
GET /api/student
```

It returns:

```json
{
  "name": "Sanika Thelakkadan Chathoth",
  "studentId": "226265671"
}
```

## Example API Testing Flow

The main API flow can be tested using Postman or another API testing tool.

### 1. Register an Admin

Send a `POST` request to:

```text
/api/auth/register
```

Example body:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin123",
  "role": "admin"
}
```

Save the JWT token returned by the API.

### 2. Create a Room

Using the admin token, send:

```text
POST /api/rooms
```

Example:

```json
{
  "roomNumber": "A101",
  "block": "A",
  "capacity": 2,
  "pricePerSemester": 4500
}
```

### 3. Register a Student

Register another account using:

```text
POST /api/auth/register
```

For example:

```json
{
  "name": "Student User",
  "email": "student@example.com",
  "password": "Student123"
}
```

If no role is supplied, the account is created as a student.

### 4. View Rooms

Send:

```text
GET /api/rooms
```

Copy the `id` of one of the rooms.

### 5. Apply for a Room

Using the student token:

```text
POST /api/applications
```

Example:

```json
{
  "roomId": "ROOM_ID_HERE",
  "notes": "I would like to apply for this room."
}
```

### 6. Check the Application

The student can check their application using:

```text
GET /api/applications/my
```

The application should initially have a status of:

```text
pending
```

### 7. Approve the Application

Using the admin token:

```text
PUT /api/applications/APPLICATION_ID/status
```

Body:

```json
{
  "status": "approved"
}
```

### 8. Check the Student Application Again

The student can call:

```text
GET /api/applications/my
```

The status should now be:

```text
approved
```

The room occupancy should also be updated after the approval.

## Testing from a Clean State

Before submission, I recommend testing the project from a clean Docker environment.

Stop the containers and remove the existing Docker volumes:

```bash
docker-compose down -v
```

Then rebuild and start the application:

```bash
docker-compose up --build
```

After starting the application, check:

```text
http://localhost:5000
```

and:

```text
http://localhost:5000/api/student
```

The main authentication, room and application flows should then be tested again.

## Environment Variables

The project uses environment variables for configuration.

Example:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/student_accomodation_system_hd
JWT_SECRET=replace-with-a-long-random-secret
```

The `.env` file is not committed to the repository. The `.env.example` file is provided as a template.

## Notes

This project was developed as an individual full-stack application. The backend follows a simple separation between routes, controllers, models and middleware, while the frontend communicates with the Express API using JavaScript.
