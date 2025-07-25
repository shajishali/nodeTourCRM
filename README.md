# NodeTour CRM

## Description
NodeTour CRM is a full-stack travel itinerary management application with role-based access, JWT authentication, and a PostgreSQL backend. It allows admins to manage clients and itineraries while users can view their personalized trips.

## Features
- Secure user login and registration using JWT authentication
- Role-based dashboards for Admin and User
- CRUD operations for itineraries
- Image uploads for itineraries
- Responsive frontend built with React
- RESTful API with Node.js and Express backend
- PostgreSQL database integration

## Setup Instructions

1. Clone the repository:

git clone https://github.com/shajishali/nodeTourCRM.git
2.Install backend dependencies:
cd backend
npm install

3. Set up environment variables:

Create a .env file inside the backend folder with the following content:
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key

5.Run the backend server:
cd backend
npm start

6.Run the frontend server:
cd ../frontend
npm start
