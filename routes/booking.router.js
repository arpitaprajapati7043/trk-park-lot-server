


const express = require('express');
const router = express.Router();
const bookingsController = require('../controller/bookingsController');
const parkingsController=require('../controller/parkingsController')

// router.post('/parkinglots/:addressId/book/:spotId',BookingController.bookSpot);
// router.post('/bookSpot/:spotId',BookingController.bookSpot);
router.post('/bookSpot/:spotId',bookingsController.confirmBooking);
router.get('/bookings/all',bookingsController.getAllBookings);


module.exports = router;