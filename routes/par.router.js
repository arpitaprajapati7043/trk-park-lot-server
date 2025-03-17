
const express = require('express');
const router = express.Router();
const parkingsController = require('../controller/parkingsController');
router.post('/create', parkingsController.create);
router.get('/all', parkingsController.getAll);
router.get('/:id', parkingsController.getById);
// PUT: Update parking s
router.put('/:id', parkingsController.update);
// PATCH: Partially update parking s
router.patch('/:id', parkingsController.partialUpdate);
// DELETE: Delete parking s by ID
router.delete('/:id', parkingsController.delete);


router.get('/parking-lots/:lotId/spot/:spotId', parkingsController.getSpotByLotIdAndSpotId);
router.get('/spot/:spotId', parkingsController.getSpotDataBySpotId);

//free next booking---------
router.get('/release-expired',parkingsController.releaseExpiredBookings);
router.delete('/cancel-booking/:lotId/:spotId',parkingsController.cancelBooking);
router.patch('/releaseSpot/:lotId/:spotId',parkingsController.releaseSpot); 

//available spot count......
router.get('/availableSpotsCount/:lotId',parkingsController.getAvailableSpotCount);
// Correct Route Setup
router.get('/spots/availableSpot', parkingsController.countAvailableSpots);

module.exports = router;