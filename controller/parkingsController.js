const ParkingsModel= require('../model/parkingsModel'); // Correct "const"
const mongoose = require('mongoose');
exports.create=async (req, res) => {
    const { address, spots } = req.body;
  
    try {
      const newParkingLot = new ParkingsModel({
        address,
        spots,
      });
  
      await newParkingLot.save();
      res.status(201).json({ message: 'Parking lot created successfully!', parkingLotData: newParkingLot });
    } catch (error) {
      res.status(500).json({ message: 'Error creating parking lot', error: error.message });
    }
  }

  exports.getAll = async (req, res) => {
    try {
      const parkingLots = await ParkingsModel.find(); // Saare parking lots ko fetch karega
      res.status(200).json({ message: 'Parking lots fetched successfully!', parkingLotData: parkingLots });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching parking lots', error: error.message });
    }
  };
  
  exports.getById = async (req, res) => {
    const { id } = req.params; // ID ko params se lete hain
  
    try {
      const parkingLot = await ParkingsModel.findById(id); // Parking lot ko ID se find karte hain
  
      if (!parkingLot) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      res.status(200).json({ message: 'Parking lot fetched successfully!', data: parkingLot });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching parking lot', error: error.message });
    }
  };

  //PUT method use karke hum puri parking lot ke details ko update kar sakte hain.
  exports.update = async (req, res) => {
    const { id } = req.params; // ID ko params se lete hain
    const { address, spots } = req.body; // Naye address aur spots
  
    try {
      const updatedParkingLot = await ParkingsModel.findByIdAndUpdate(
        id,
        { address, spots },  // Update hone wali fields
        { new: true } // new: true ka matlab hai ki update hone ke baad naye data ko return karega
      );
  
      if (!updatedParkingLot) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      res.status(200).json({ message: 'Parking lot updated successfully!', data: updatedParkingLot });
    } catch (error) {
      res.status(500).json({ message: 'Error updating parking lot', error: error.message });
    }
  };
  

  //Agar aap kuch specific fields ko update karna chahte hain, toh PATCH method use karenge.
  exports.partialUpdate = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; // Jo fields update karne hain wo body se aayenge
  
    try {
      const updatedParkingLot = await ParkingsModel.findByIdAndUpdate(
        id,
        updateData,  // Only the fields that are passed in the request body will be updated
        { new: true } // Naye data ko return karne ke liye
      );
  
      if (!updatedParkingLot) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      res.status(200).json({ message: 'Parking lot partially updated successfully!', data: updatedParkingLot });
    } catch (error) {
      res.status(500).json({ message: 'Error updating parking lot', error: error.message });
    }
  };
  

  exports.delete = async (req, res) => {
    const { id } = req.params; // ID jo delete karna hai
  
    try {
      const deletedParkingLot = await ParkingsModel.findByIdAndDelete(id);
  
      if (!deletedParkingLot) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      res.status(200).json({ message: 'Parking lot deleted successfully!', data: deletedParkingLot });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting parking lot', error: error.message });
    }
  };
  


  //other useful information-------------
 // Controller to get spots of a specific parking lot by lotId
// Controller to get a specific spot with address
exports.getSpotByLotIdAndSpotId = async (req, res) => {
    const { lotId, spotId } = req.params; // lotId aur spotId ko params se lete hain
  
    try {
      // Parking lot ko lotId ke basis par dhundhna
      const parkingLot = await ParkingsModel.findById(lotId);
  
      // Agar parking lot nahi mila
      if (!parkingLot) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      // Spot ko parking lot ke spots array se find karna
      const spot = parkingLot.spots.find(spot => spot._id.toString() === spotId);
  
      // Agar spot nahi mila
      if (!spot) {
        return res.status(404).json({ message: `Spot with ID ${spotId} not found in this parking lot` });
      }
  
      // Agar spot mil gaya, toh spot details ko return karenge
      res.status(200).json({
        message: 'Spot found successfully',
        spotDetails: {
          spotId: spot._id,          // Spot ID
          spotName: spot.spotName,    // Spot Name
          status: spot.status,       // Status
          trailerNumber: spot.trailerNumber,
          driverDetails: spot.driverDetails,
          entryTime: spot.entryTime,
          exitTime: spot.exitTime
        },
        parkingLotAddress: parkingLot.address, // Parking lot ka address bhi return karenge
        lotId: parkingLot._id, // LotId bhi return karenge
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Error fetching spot details', error: error.message });
    }
  };
  

  // Controller to get a specific spot by spotId (without using lotId)
exports.getSpotDataBySpotId = async (req, res) => {
    const { spotId } = req.params;  // spotId ko params se lete hain
  
    try {
      // Sabhi parking lots ko fetch karenge
      const parkingLots = await ParkingsModel.find();
  
      // Spot ko sabhi parking lots ke andar search karenge
      for (let parkingLot of parkingLots) {
        const spot = parkingLot.spots.find(spot => spot._id.toString() === spotId); // Spot ko find karna
  
        // Agar spot mil gaya, toh details return karenge
        if (spot) {
          return res.status(200).json({
            message: 'Spot details and parking lot address fetched successfully',
            spotDetails: {
              spotId: spot._id,          // Spot ID
              spotName: spot.spotName,    // Spot Name
              status: spot.status,       // Status
              trailerNumber: spot.trailerNumber,
              driverDetails: spot.driverDetails,
              entryTime: spot.entryTime,
              exitTime: spot.exitTime
            },
            parkingLotAddress: parkingLot.address, // Parking lot ka address bhi return karenge
            lotId: parkingLot._id, // LotId bhi return karenge
          });
        }
      }
  
      // Agar spot kisi parking lot mein nahi milta hai
      return res.status(404).json({ message: `Spot with ID ${spotId} not found` });
  
    } catch (error) {
      res.status(500).json({ message: 'Error fetching spot details', error: error.message });
    }
  };
  



  // Release expired bookings
exports.releaseExpiredBookings = async () => {
    try {
      // Sabhi parking lots ko fetch karenge
      const parkingLots = await ParkingsModel.find();
  
      parkingLots.forEach(async (parkingLot) => {
        // Sabhi spots ke liye check karenge
        parkingLot.spots.forEach(async (spot) => {
          if (spot.status === false && spot.entryTime) {
            const currentTime = new Date();
            const exitTime = new Date(spot.exitTime);
  
            // Agar exit time reach ho gaya ho
            if (currentTime >= exitTime) {
              // Spot ko khali karenge
              spot.status = true;
              spot.trailerNumber = null;
              spot.driverDetails = null;
              spot.trailerStatus = null;
              spot.entryTime = null;
              spot.exitTime = null;
  
              // Update parking lot
              await parkingLot.save();
              console.log(`Spot ${spot._id} has been released because the booking expired.`);
            }
          }
        });
      });
    } catch (error) {
      console.error('Error releasing expired bookings:', error);
    }
  };
  
  // Cancel a booking
exports.cancelBooking = async (req, res) => {
    const { lotId, spotId } = req.params;  // lotId aur spotId ko params se lete hain
  
    try {
      // Parking lot ko lotId ke basis par find karna
      const parkingLot = await ParkingsModel.findById(lotId);
  
      if (!parkingLot) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      // Spot ko find karna
      const spot = parkingLot.spots.find(spot => spot._id.toString() === spotId);
  
      if (!spot) {
        return res.status(404).json({ message: 'Spot not found' });
      }
  
      // Spot ko khali karna (cancel booking)
      spot.status = true;  // Spot ko available karna
      spot.trailerNumber = null;  // Trailer number ko null karna
      spot.driverDetails = null;  // Driver details ko null karna
      spot.trailerStatus = null;  // Trailer status ko null karna
      spot.entryTime = null;  // Entry time ko null karna
      spot.exitTime = null;  // Exit time ko null karna
  
      // Parking lot ko save karna
      await parkingLot.save();
  
      return res.status(200).json({
        message: 'Booking cancelled and spot has been released.',
        success: true
      });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      return res.status(500).json({
        message: 'Error cancelling the booking.',
        success: false
      });
    }
  };
  


  exports.releaseSpot = async (req, res) => {
    const { lotId, spotId } = req.params; // lotId and spotId from params
  
    try {
      // Ensure that the lotId and spotId are valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(lotId) || !mongoose.Types.ObjectId.isValid(spotId)) {
        return res.status(400).json({ message: 'Invalid lotId or spotId', success: false });
      }
  
      // Find the parking lot by lotId
      const parkingLot = await ParkingsModel.findById(lotId);
      if (!parkingLot) {
        return res.status(404).json({ message: 'Parking lot not found', success: false });
      }
  
      // Find the spot by spotId
      const spot = parkingLot.spots.find(spot => spot._id.toString() === spotId);
      if (!spot) {
        return res.status(404).json({ message: 'Spot not found', success: false });
      }
  
      // Release the spot by making status true and clearing other details
      spot.status = true;  // Available spot
      spot.trailerNumber = null;
      spot.driverDetails = null;
      spot.trailerStatus = null;
      spot.entryTime = null;
      spot.exitTime = null;
  
      // Save the updated parking lot
      await parkingLot.save();
  
      return res.status(200).json({
        message: `Spot ${spotId} has been successfully released.`,
        success: true
      });
    } catch (error) {
      console.error('Error releasing the spot:', error); // Full error logging
      return res.status(500).json({
        message: 'Error releasing the spot.',
        success: false,
        error: error.message || error // Include error message in response
      });
    }
  };
  

exports.getAvailableSpotCount = async (req, res) => {
    const { lotId } = req.params;  // lotId from the params
  
    try {
      // Ensure that the lotId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(lotId)) {
        return res.status(400).json({ message: 'Invalid lotId', success: false });
      }
  
      // Find the parking lot by lotId
      const parkingLot = await ParkingsModel.findById(lotId);
      if (!parkingLot) {
        return res.status(404).json({ message: 'Parking lot not found', success: false });
      }
  
      // Filter out available spots
      const availableSpots = parkingLot.spots.filter(spot => spot.status === true);
  
      // Return the count of available spots
      return res.status(200).json({
        availableSpotsCount: availableSpots.length,
        success: true
      });
    } catch (error) {
      console.error('Error getting available spots count:', error);
      return res.status(500).json({
        message: 'Error getting available spots count.',
        success: false,
        error: error.message || error
      });
    }
  };
  


  // Get the count of available and booked spots
  // exports.availableSpot = async (req, res) => {
  //   try {
  //     // MongoDB aggregate query to count available spots (status: true)
  //     const availableCount = await ParkingsModel.aggregate([
  //       { $unwind: "$spots" },  // Deconstruct the spots array
  //       { $match: { "spots.status": true } },  // Match spots where status is true (available)
  //       { $count: "availableCount" }  // Count the number of available spots
  //     ]);
  
  //     // Check if availableCount is found and return it
  //     if (availableCount.length > 0) {
  //       return res.json({ availableCount: availableCount[0].availableCount });
  //     } else {
  //       return res.json({ availableCount: 0 });  // If no available spots found
  //     }
  //   } catch (error) {
  //     console.error('Error fetching available spots:', error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  // exports.availableSpotDetails = async (req, res) => {
  //   try {
  //     // MongoDB aggregate query to count available spots and get their details (name and status)
  //     const availableSpots = await ParkingsModel.aggregate([
  //       { $unwind: "$spots" },
  //       { $match: { "spots.status": true } },
  //       { $project: { "spots.spotName": 1, "spots.status": 1 } },  // Include spot name and status
  //       { $group: {
  //         _id: null,
  //         availableCount: { $sum: 1 },  // Count of available spots
  //         spotsDetails: { $push: { spotName: "$spots.spotName", status: "$spots.status" } }  // Push details of available spots
  //       }}
  //     ]);
  
  //     if (availableSpots.length > 0) {
  //       return res.json({
  //         availableCount: availableSpots[0].availableCount,  // Available spots count
  //         spotsDetails: availableSpots[0].spotsDetails  // Available spots details
  //       });
  //     } else {
  //       return res.json({
  //         availableCount: 0,
  //         spotsDetails: []  // No available spots
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching available spots:', error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  // exports.getAvailableSpots = async (req, res) => {
  //   try {
  //     const availableCount = await ParkingsModel.aggregate([
  //       { $unwind: "$spots" },
  //       { $match: { "spots.status": true } },
  //       { $count: "availableCount" }
  //     ]);
  
  //     const spotsDetails = await ParkingsModel.aggregate([
  //       { $unwind: "$spots" },
  //       { $match: { "spots.status": true } },
  //       { $project: { "spotName": "$spots.spotName", "status": "$spots.status" } }
  //     ]);
  
  //     if (availableCount.length > 0) {
  //       return res.json({
  //         availableCount: availableCount[0].availableCount,
  //         spotsDetails: spotsDetails
  //       });
  //     } else {
  //       return res.json({ availableCount: 0, spotsDetails: [] });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching available spots:', error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
   
  exports.countAvailableSpots = async (req, res) => {
    try {
      const availableCount = await ParkingsModel.aggregate([
        { $unwind: "$spots" },
        { $match: { "spots.status": true } },
        { $count: "availableCount" }
      ]);
  
      const spotsDetails = await ParkingsModel.aggregate([
        { $unwind: "$spots" },
        { $match: { "spots.status": true } },
        { $project: {
          "spotId": "$spots.spotId",     // Include spotId
          "spotName": "$spots.spotName", // Include spotName
          "status": "$spots.status"      // Include status
        } }
      ]);
  
      if (availableCount.length > 0) {
        return res.json({
          availableCount: availableCount[0].availableCount,
          spotsDetails: spotsDetails
        });
      } else {
        return res.json({ availableCount: 0, spotsDetails: [] });
      }
    } catch (error) {
      console.error('Error fetching available spots:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  