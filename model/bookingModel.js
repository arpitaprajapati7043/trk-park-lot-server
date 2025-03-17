const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    spotId: String,
    trailerNumber: {
      type: String,
      required: true, // Trailer's registration number
      
    },
    trailerStatus: {
      type: String,
      enum: ['loaded', 'empty'], // Trailer can either be loaded or empty
      default: 'empty' // Default to 'empty'
    },
    entryTime: {
      type: Date,
      required: true,
      default: Date.now // Set the current time when the booking is created
    },
    exitTime: {
      type: Date,
      required: false, // Exit time is optional and can be updated later
      default: null // Will be updated when the trailer exits
    },
    driverDetails: {
      name: {
        type: String,
        required: true
      },
      contactNumber: {
        type: String,
        required: true
      }
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

const BookingModel = mongoose.model('BookingModel', bookingSchema);

module.exports = BookingModel;
