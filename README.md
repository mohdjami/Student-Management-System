Student Management System API Documentation
Project Description

This project aims to create a basic Student Management System API using ExpressJS. The system provides endpoints for both an Admin Panel and a Student Interface with various features such as admin login, student login, adding students, assigning tasks, viewing assigned tasks, and updating task status.
Technologies Used

    Node.js
    Express.js
    MongoDB (or any preferred database)
    JWT for authentication

Installation

    Clone the repository:

    bash

git clone https://github.com/your-username/student-management-system.git

Install dependencies:

bash

cd student-management-system
npm install

Set up the database and environment variables.

Start the server:

bash

    npm start

API Endpoints
Admin Panel Features

    Admin Login
        Endpoint: POST /api/users/login ...
        Description: Admins can log in using their email ID and password.
        Authentication: Admin authentication required.

    Add Students
        Endpoint: POST /api/users/signup ...
        Description: Admins can add students with their name, email ID, department, and password.
        Authentication: Admin authentication required.

    Assign Tasks to Students ...
        Endpoint: POST /api/students/tasks
        Description: Admins can assign tasks to students with a due time.
        Authentication: Admin authentication required.

    Get All Users (Admin Specific) ...
        Endpoint: GET /api/students
        Description: Admins can retrieve information about all users.
        Authentication: Admin authentication required.

    Get All Tasks (Admin Specific) ...
        Endpoint: GET /api/students/tasks
        Description: Admins can get details of all assigned tasks including statuses.
        Authentication: Admin authentication required.

Student Interface Features

    Student Login
        Endpoint: POST /api/users/login ...
        Description: Students can log in using their email ID and password.

    View Assigned Tasks and their Status ...
        Endpoint: GET /api/students/{studentId}/task
        Description: Students can view tasks assigned to them.
        Authentication: Student authentication required.

    Update Task Status
        Endpoint: GET /api/tasks/{taskId} ...
        Description: Students can update the status of a specific task to completed.
        Authentication: Student authentication required.

Authentication

    Admins and students need to log in to access their respective panels.
    Admin-specific operations require admin authentication.
    Student-specific operations require student authentication.

Predefined Credentials

    Admin Credentials:
        Email: admin@admin.com
        Password: admin

Usage Instructions

Admin Panel

1. Admin Login

   Endpoint: POST /api/users/login
   Description: Admins can log in using their email ID and password.
   Authentication: Admin authentication required.
   Usage:
   Make a POST request to /api/users/login with the admin's email and password.

2. Add Students

   Endpoint: POST /api/users/signup
   Description: Admins can add students with their name, email ID, department, and password.
   Authentication: Admin authentication required.
   Usage:
   Make a POST request to /api/users/signup with the student's details.

3. Assign Tasks to Students

   Endpoint: POST /api/students/tasks
   Description: Admins can assign tasks to students with a due time.
   Authentication: Admin authentication required.
   Usage:
   Make a POST request to /api/students/tasks with the task details.

4. Get All Users (Admin Specific)

   Endpoint: GET /api/students
   Description: Admins can retrieve information about all users.
   Authentication: Admin authentication required.
   Usage:
   Make a GET request to /api/students to retrieve all user information.

5. Get All Tasks (Admin Specific)

   Endpoint: GET /api/students/tasks
   Description: Admins can get details of all assigned tasks, including statuses.
   Authentication: Admin authentication required.
   Usage:
   Make a GET request to /api/students/tasks to retrieve all tasks and their statuses.

Student Interface

1. Student Login

   Endpoint: POST /api/users/login
   Description: Students can log in using their email ID and password.
   Usage:
   Make a POST request to /api/users/login with the student's email and password.

2. View Assigned Tasks and their Status

   Endpoint: GET /api/students/{studentId}/task
   Description: Students can view tasks assigned to them.
   Authentication: Student authentication required.
   Usage:
   Make a GET request to /api/students/{studentId}/task to retrieve assigned tasks and their statuses.

3. Update Task Status

   Endpoint: GET /api/tasks/{taskId}
   Description: Students can update the status of a specific task to completed.
   Authentication: Student authentication required.
   Usage:
   Make a GET request to /api/tasks/{taskId} to update the status of the task to completed.

API Documentation

For detailed information on how to use each API endpoint, refer to the https://documenter.getpostman.com/view/26354863/2s9YsDkvB5

I have deployed the application on Render so Api will take some to start Please wait once it is active you will face no issues.
