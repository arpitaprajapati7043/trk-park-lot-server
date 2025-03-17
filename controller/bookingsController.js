
import ParkingsModel from '../model/parkingsModel.js';  // Add the .js extension
import BookingModel from '../model/bookingModel.js';  // Add the .js extension

// export const confirmBooking = async (req, res) => {
//   try {
//     const { spotId, trailerNumber, driverDetails, trailerStatus } = req.body;

//     // SpotId ko directly string ke roop mein check karenge
//     if (!spotId || typeof spotId !== 'string') {
//       return res.status(400).json({ message: 'Invalid spotId format' });
//     }

//     // Parking spot ko string format mein find karenge
//     const parkingSpot = await ParkingsModel.findOne({
//       'spots._id': spotId,  // spotId ko string format mein check karenge
//     });

//     if (!parkingSpot) {
//       return res.status(404).json({ message: "Parking spot not found" });
//     }

//     const newBooking = new BookingModel({
//       spotId: spotId,  // Directly store as string
//       trailerNumber,
//       trailerStatus,
//       entryTime: new Date(),
//       driverDetails,
//     });

//     await newBooking.save();

//     return res.status(200).json({ message: 'Booking successful', bookingId: newBooking._id });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error booking parking spot', error: error.message });
//   }
// };
// Assuming you have the same ParkingsModel schema as earlier

export const confirmBooking = async (req, res) => {
    const { spotId, trailerNumber, driverDetails, trailerStatus } = req.body;
  
    try {
      const parkingLot = await ParkingsModel.findOne({
        "spots._id": spotId,
      });
  
      if (!parkingLot) {
        return res.status(404).json({ message: "Parking lot not found.", success: false });
      }
  
      const spot = parkingLot.spots.find((spot) => spot._id.toString() === spotId);
  
      if (!spot) {
        return res.status(404).json({ message: "Spot not found.", success: false });
      }
  
      if (!spot.status) {
        return res.status(400).json({ message: "Spot is already booked.", success: false });
      }
  
      spot.status = false;
      spot.trailerNumber = trailerNumber;
      spot.driverDetails = driverDetails;
      spot.trailerStatus = trailerStatus;
      spot.entryTime = new Date();
  
      await parkingLot.save();
  
      return res.status(200).json({
        message: "Your booking is confirmed! Booking ID: " + parkingLot._id,
        success: true,
        bookingId: parkingLot._id,
      });
    } catch (error) {
      console.error("Error booking spot:", error);
      return res.status(500).json({
        message: "Error booking parking spot.",
        success: false,
      });
    }
  };
  
  export const getAllBookings = async (req, res) => {
    try {
      // ParkingsModel se saari bookings fetch karna
      const parkingLots = await ParkingsModel.find({});
  
      if (!parkingLots || parkingLots.length === 0) {
        return res.status(404).json({ message: "Koi booking nahi mili.", success: false });
      }
  
      const bookings = parkingLots.map((parkingLot) => {
        return parkingLot.spots
          .filter((spot) => !spot.status) // Sirf booked spots ko dikhana
          .map((spot) => ({
            bookingId: parkingLot._id,
            trailerNumber: spot.trailerNumber,
            driverDetails: spot.driverDetails,
            spotName: spot.spotName, // Spot ka number
            address: parkingLot.address, // Parking lot ka address
            entryTime: spot.entryTime,
          }));
      }).flat(); // Flat karte hai taaki ek single array mile
  
      if (bookings.length === 0) {
        return res.status(200).json({
          message: "Koi active bookings nahi hain.",
          success: true,
          bookings: [],
        });
      }
  
      return res.status(200).json({
        message: "Aapki saari bookings:",
        success: true,
        bookings,
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({
        message: "Bookings ko fetch karte waqt error aayi.",
        success: false,
      });
    }
  };
  

  