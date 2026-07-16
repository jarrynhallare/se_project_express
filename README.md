# WTWR (What to Wear?) — Back End

## 1. Project Name
**WTWR (What to Wear?) — Back End**

---

## 2. Project Description

The WTWR back-end project is a server-side application that powers the What to Wear? (WTWR) app. This server handles data storage, user authentication, and API requests for managing clothing items based on weather conditions.

The application allows users to:
- Create, read, update, and delete clothing items
- Categorize clothing by weather type (e.g., hot, cold, rainy)
- Store and retrieve item images via URLs
- Interact with a structured REST API
- (Optional) Authenticate users and protect routes

The primary goal of this project is to build a secure, scalable backend that connects seamlessly to a front-end client.

---

## 3. Technologies & Techniques Used

### Technologies:
- Node.js — JavaScript runtime for building the server
- Express.js — Web framework for routing and middleware
- MongoDB — NoSQL database for storing application data
- Mongoose — ODM for modeling and interacting with MongoDB
- Postman — API testing and debugging

### Techniques:
- RESTful API design
- MVC (Model-Controller) architecture
- Middleware for error handling and validation
- Schema validation with Mongoose
- Environment variable configuration (dotenv)
- User authentication & authorization (JWT, if implemented)
- Error handling with custom error messages
- Input validation and data normalization

---

## 4. Screenshots / GIFs

---

 ## Project Pitch Video
 
 - Check out [this video], https://www.loom.com/share/c50f3907b001433b9baaa95cd235a9c3 
 where I describe my project and some challenges I faced while building it.

---

## Additional Notes

- The project uses ES6+ syntax wherever possible
- Code is formatted using Prettier for consistency and readability
- The server is designed with scalability and maintainability in mind

---

## Future Improvements

- Full user authentication and authorization system
- Deployment to a cloud server (AWS, Render, DigitalOcean, etc.)
- Integration with front-end application
- Improved validation and error handling
- Logging and monitoring

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the server
npm run start

# Run in development mode (if configured)
npm run dev
