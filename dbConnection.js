require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('DB_URI:', process.env.DB_URI); // Check if DB_URI is loaded

  if (!process.env.DB_URI) {
    console.error('DB_URI is not defined. Check your .env file.');
    return;
  }

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

// Optional: Add a handler for the connection status
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from the database');
});

module.exports = connectDB;
