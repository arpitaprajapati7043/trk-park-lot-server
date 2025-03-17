const ParkingLotsModel= require('../model/parkingLotModel'); // Correct "const"



// exports.createSlots = async (req, res) => {
//   const { address, spots } = req.body;

//   // Input validation
//   if (!address || !address.street || !address.city || !address.state || !address.zip) {
//       return res.status(400).json({ message: 'Address information is incomplete!' });
//   }

//   if (!Array.isArray(spots) || spots.length === 0) {
//       return res.status(400).json({ message: 'Spots array is missing or empty!' });
//   }

//   // Validate each spot structure
//   for (let spot of spots) {
//       if (!spot.spotName || typeof spot.spotName !== 'string') {
//           return res.status(400).json({ message: 'Each spot must have a valid spotName' });
//       }
//       if (typeof spot.status !== 'boolean') {
//           return res.status(400).json({ message: 'Each spot must have a valid status (true/false)' });
//       }
//   }

//   try {
//       // Check for duplicate spotNames
//       const spotNames = spots.map(spot => spot.spotName);
//       const uniqueSpotNames = new Set(spotNames);
//       if (uniqueSpotNames.size !== spotNames.length) {
//           return res.status(400).json({ message: 'Duplicate spotNames found!' });
//       }

//       // Creating a new parking lot with address and spots information
//       const newParkingLot = new ParkingLotsModel({
//           address: address, // address object
//           spots: spots.map(spot => ({
//               spotName: spot.spotName,  // Manually set spotName (spot1, spot2, etc.)
//               status: spot.status,      // status (available or booked)
//               trailerNumber: spot.trailerNumber || null, // Optional trailerNumber
//               driverDetails: spot.driverDetails || null, // Optional driver details
//               entryTime: null, // Initially null
//               exitTime: null, // Initially null
//           })),
//       });

//       await newParkingLot.save(); // Save the new parking lot to the database

//       res.status(201).json({
//           message: 'Parking lot created successfully!',
//           parkingLot: newParkingLot
//       });
//   } catch (err) {
//       console.error(err); // For debugging purposes
//       res.status(500).json({ message: 'Error creating parking lot', error: err.message });
//   }
// };

//get all
// exports.getAllSpots= async (req, res) => {
//     try {
//       const parkingLots = await ParkingLotsModel.find();
//       res.status(200).json(parkingLots);
//     } catch (err) {
//       res.status(500).json({ message: 'Error retrieving parking lots', error: err });
//     }
//   };

exports.getAllSpots = async (req, res) => {
  try {
      // Fetching all parking lots and their spots, including the spot._id field
      const parkingLots = await ParkingLotsModel.find().select('address spots._id spots.spotName spots.status spots.trailerNumber spots.driverDetails spots.entryTime spots.exitTime'); 

      if (!parkingLots || parkingLots.length === 0) {
          return res.status(404).json({ message: 'No parking lots found' });
      }

      // Formatting response
      const allSlots = parkingLots.map(parkingLot => ({
          address: parkingLot.address,
          spots: parkingLot.spots.map(spot => ({
              _id: spot._id,  // Include the spot's _id
              spotName: spot.spotName,
              status: spot.status,
              trailerNumber: spot.trailerNumber,
              driverDetails: spot.driverDetails,
              entryTime: spot.entryTime,
              exitTime: spot.exitTime,
          }))
      }));

      res.status(200).json({
          message: 'All parking spots retrieved successfully',
          parkingLots: allSlots
      });
  } catch (error) {
      console.error(error); // For debugging purposes
      res.status(500).json({ message: 'Error retrieving parking spots', error: error.message });
  }
};

  



// Update spot status (booked or available)
exports.updateSpot=async (req, res) => {
    const { address, spotId } = req.params;
  
    try {
      const parkingLot = await ParkingLotsModel.findOne({
        'address.street': address
      });
  
      if (!parkingLot) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      const spot = parkingLot.spots.find(spot => spot.spotId === spotId);
  
      if (!spot) {
        return res.status(404).json({ message: 'Spot not found' });
      }
  
      // Update the status of the spot (booked = false)
      spot.status = false;
      parkingLot.isBooked = false;  // Optional: if you want to update the whole parking lot status
  
      // Save the updated parking lot
      await parkingLot.save();
  
      res.status(200).json({
        message: `Spot ${spotId} has been successfully booked.`,
        parkingLot
      });
    } catch (err) {
      res.status(500).json({ message: 'Error updating spot status', error: err });
    }
  };

// Delete a parking lot by address
exports.deleteParkinglot= async (req, res) => {
    const { address } = req.params;
  
    try {
      const result = await ParkingLotsModel.deleteOne({
        'address.street': address
      });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      res.status(200).json({ message: 'Parking lot deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting parking lot', error: err });
    }
  };
  

  

 


//view bbookibg status by id 
exports.viewSpot = async (req, res) => {
  const { spotId } = req.params;

  try {
      // Find the parking lot containing the spot
      const parkingLot = await ParkingLotsModel.findOne({
          'spots.spotId': spotId,
      });

      if (!parkingLot) {
          return res.status(400).json({ message: 'Parking lot or spot not found' });
      }

      const spot = parkingLot.spots.find((s) => s.spotId === spotId);

      if (!spot) {
          return res.status(400).json({ message: 'Spot not found' });
      }

      // Respond with the spot details
      res.status(200).json({
          spotId: spot.spotId,
          status: spot.status ? 'Available' : 'Booked',
          trailerNumber: spot.trailerNumber,
          driverDetails: spot.driverDetails,
          entryTime: spot.entryTime,
          exitTime: spot.exitTime,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching spot details', error: error.message });
  }
};



//add number of spot by suing address
// Add a new spot to an existing parking lot
exports.addSpot = async (req, res) => {
  const { address, spotId, status } = req.body; // Spot details
  try {
    // Find the parking lot by address
    const parkingLot = await ParkingLotsModel.findOne({
      'address.street': address.street // You can refine this to match the full address if needed
    });

    if (!parkingLot) {
      return res.status(404).json({ message: 'Parking lot not found' });
    }

    // Add new spot to the parking lot's spots array
    parkingLot.spots.push({
      spotId,
      status,
      // If required, you can add other details such as trailer number, driver details, etc.
    });

    // Save the updated parking lot
    await parkingLot.save();

    res.status(201).json({
      message: 'New spot added successfully',
      parkingLot
    });
  } catch (err) {
    res.status(500).json({ message: 'Error adding spot', error: err });
  }
};




// exports.availableSpot = async (req, res) => {
//   try {
//     // MongoDB aggregate query to count available spots (status: true) per parking lot
//     const availableSpots = await ParkingLotsModel.aggregate([
//       { $unwind: "$spots" }, // Unwind the "spots" array to make each spot a separate document
//       { $match: { "spots.status": true } }, // Filter for available spots (status: true)
//       {
//         $group: {
//           _id: "$_id", // Group by parking lot ID
//           availableCount: { $sum: 1 } // Count available spots per parking lot
//         }
//       },
//       {
//         $project: {
//           address: 1, // Include address info
//           availableCount: 1 // Include available spot count
//         }
//       }
//     ]);

//     if (availableSpots.length > 0) {
//       // If available spots exist, send the counts along with the address
//       return res.json({ availableSpots });
//     } else {
//       // If no available spots, send an empty array
//       return res.json({ availableSpots: [] });
//     }
//   } catch (error) {
//     console.error('Error fetching available spots:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

exports.availableSpotDetails = async (req, res) => {
  try {
    // MongoDB aggregate query to count available spots (status: true)
    const availableCount = await ParkingLotsModel.aggregate([
      { $unwind: "$spots" },
      { $match: { "spots.status": true } },
      { $count: "availableCount" }
    ]);

    if (availableCount.length > 0) {
      return res.json({ availableCount: availableCount[0].availableCount });
    } else {
      return res.json({ availableCount: 0 });
    }
  } catch (error) {
    console.error('Error fetching available spots:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
//get all
exports.getAllSpots= async (req, res) => {
    try {
      const parkingLots = await ParkingLotsModel.find();
      res.status(200).json(parkingLots);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving parking lots', error: err });
    }
  };
  
//get slot by address // /routes/parkingRoutes.js
// Get a specific parking lot by address
exports.getslotByaddress=async (req, res) => {
    const { address } = req.params;
  
    try {
      const parkingLot = await ParkingLotsModel.findOne({
        'address.street': address
      });
  
      if (!parkingLot) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      res.status(200).json(parkingLot);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving parking lot', error: err });
    }
  };
  



// Update spot status (booked or available)
exports.updateSpot=async (req, res) => {
    const { address, spotId } = req.params;
  
    try {
      const parkingLot = await ParkingLotsModel.findOne({
        'address.street': address
      });
  
      if (!parkingLot) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      const spot = parkingLot.spots.find(spot => spot.spotId === spotId);
  
      if (!spot) {
        return res.status(404).json({ message: 'Spot not found' });
      }
  
      // Update the status of the spot (booked = false)
      spot.status = false;
      parkingLot.isBooked = false;  // Optional: if you want to update the whole parking lot status
  
      // Save the updated parking lot
      await parkingLot.save();
  
      res.status(200).json({
        message: `Spot ${spotId} has been successfully booked.`,
        parkingLot
      });
    } catch (err) {
      res.status(500).json({ message: 'Error updating spot status', error: err });
    }
  };

// Delete a parking lot by address
exports.deleteParkinglot= async (req, res) => {
    const { address } = req.params;
  
    try {
      const result = await ParkingLotsModel.deleteOne({
        'address.street': address
      });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
  
      res.status(200).json({ message: 'Parking lot deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting parking lot', error: err });
    }
  };
  

  

 


//view bbookibg status by id 
exports.viewSpot = async (req, res) => {
  const { spotId } = req.params;

  try {
      // Find the parking lot containing the spot
      const parkingLot = await ParkingLotsModel.findOne({
          'spots.spotId': spotId,
      });

      if (!parkingLot) {
          return res.status(400).json({ message: 'Parking lot or spot not found' });
      }

      const spot = parkingLot.spots.find((s) => s.spotId === spotId);

      if (!spot) {
          return res.status(400).json({ message: 'Spot not found' });
      }

      // Respond with the spot details
      res.status(200).json({
          spotId: spot.spotId,
          status: spot.status ? 'Available' : 'Booked',
          trailerNumber: spot.trailerNumber,
          driverDetails: spot.driverDetails,
          entryTime: spot.entryTime,
          exitTime: spot.exitTime,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching spot details', error: error.message });
  }
};



//add number of spot by suing address
// Add a new spot to an existing parking lot
exports.addSpot = async (req, res) => {
  const { address, spotId, status } = req.body; // Spot details
  try {
    // Find the parking lot by address
    const parkingLot = await ParkingLotsModel.findOne({
      'address.street': address.street // You can refine this to match the full address if needed
    });

    if (!parkingLot) {
      return res.status(404).json({ message: 'Parking lot not found' });
    }

    // Add new spot to the parking lot's spots array
    parkingLot.spots.push({
      spotId,
      status,
      // If required, you can add other details such as trailer number, driver details, etc.
    });

    // Save the updated parking lot
    await parkingLot.save();

    res.status(201).json({
      message: 'New spot added successfully',
      parkingLot
    });
  } catch (err) {
    res.status(500).json({ message: 'Error adding spot', error: err });
  }
};




// exports.availableSpot = async (req, res) => {
//   try {
//     // MongoDB aggregate query to count available spots (status: true) per parking lot
//     const availableSpots = await ParkingLotsModel.aggregate([
//       { $unwind: "$spots" }, // Unwind the "spots" array to make each spot a separate document
//       { $match: { "spots.status": true } }, // Filter for available spots (status: true)
//       {
//         $group: {
//           _id: "$_id", // Group by parking lot ID
//           availableCount: { $sum: 1 } // Count available spots per parking lot
//         }
//       },
//       {
//         $project: {
//           address: 1, // Include address info
//           availableCount: 1 // Include available spot count
//         }
//       }
//     ]);

//     if (availableSpots.length > 0) {
//       // If available spots exist, send the counts along with the address
//       return res.json({ availableSpots });
//     } else {
//       // If no available spots, send an empty array
//       return res.json({ availableSpots: [] });
//     }
//   } catch (error) {
//     console.error('Error fetching available spots:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

exports.availableSpot = async (req, res) => {
  try {
    // MongoDB aggregate query to count available spots (status: true)
    const availableCount = await ParkingLotsModel.aggregate([
      { $unwind: "$spots" },
      { $match: { "spots.status": true } },
      { $count: "availableCount" }
    ]);

    if (availableCount.length > 0) {
      return res.json({ availableCount: availableCount[0].availableCount });
    } else {
      return res.json({ availableCount: 0 });
    }
  } catch (error) {
    console.error('Error fetching available spots:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};