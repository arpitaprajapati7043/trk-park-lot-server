const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const connectDB = require('./dbConnection');
const cookieParser = require('cookie-parser');
// const parkingRouter = require('./routes/parking.router')
const parRouter=require('./routes/par.router')
const bookingRouter=require('./routes/booking.router')
const PORT = process.env.PORT || 8282;

// CORS setup
app.use(cors({
  origin: 'https://trk-park-lot-client.onrender.com',  // Change to the appropriate frontend URL
  credentials: true, // Allow cookies with credentials (if needed)
}));

// Body parsers and cookie parser
app.use(express.json());
app.use(cookieParser());

connectDB();

// Logging middleware (before routes)
app.use('/api', (req, res, next) => {
  console.log(`Request received at: ${req.method} ${req.url}`);
  next();
});

// Register parkingRouter routes
// app.use('/api', parkingRouter);
app.use('/api', parRouter);
app.use('/api',bookingRouter);


// Start the server
app.listen(PORT, () => {
  console.clear();
  console.log(`Server started at port ${PORT}`);
});
