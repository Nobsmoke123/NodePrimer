const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/connectDB');

const app = new express();

// Routes
app.get('/', (req, res) => {
  res.send('Homepage.');
});

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
