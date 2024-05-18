const express = require('express');
require('dotenv').config();
const connectDB = require('./config/connectDB');

const app = new express();

app.get('/', (req, res) => {
  res.send('Home page.');
});

const PORT = process.env.BACKEND_SERVER_PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
