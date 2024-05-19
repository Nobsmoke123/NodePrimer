require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB');
const taskRoute = require('./routes/tasks');
const cors = require('cors');

const app = new express();

// Middleware
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Routes
app.use('/api/tasks', taskRoute);

const PORT = process.env.BACKEND_SERVER_PORT || 5000;

const startServer = async () => {
  try {
     // Connect to the database
    await connectDB();

    // start listening for requests
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
