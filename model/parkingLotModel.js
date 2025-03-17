const mongoose = require('mongoose');

// Trailer and Driver Details Schema
const driverSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
});

const parkingLotSchema = new mongoose.Schema({
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  spots: [
    {
      spotId: String, // e.g. "spot3", "spot4"
      status: Boolean, // true = available, false = booked
      trailerNumber: String, // null initially, set when booked
      driverDetails: driverSchema, // driver details if booked
      entryTime: Date, // time when spot is booked
      exitTime: Date, // exit time when trailer leaves
    },
  ],
});

const ParkingLotsModel = mongoose.model('ParkingLotsModel', parkingLotSchema);
module.exports = ParkingLotsModel;
