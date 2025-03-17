// exports.getSlots = async (req, res) => {
//   try {
//     const slotsRef = db.ref('parking_slots'); // Firebase reference to 'parking_slots'
//     slotsRef.once('value', (snapshot) => {
//       const slots = snapshot.val(); // Retrieve data
//       res.json(slots); // Send response to frontend
//     });
//   } catch (error) {
//     console.error('Error fetching parking slots:', error);
//     res.status(500).json({ error: 'Failed to fetch parking slots' });
//   }
// };


// exports.getSlots = async (req, res) => {
//   try {
//     // Firestore me collection access karne ke liye .collection() ka use karen
//     const slotsRef = db.collection('parking_slots'); // Firestore collection ka reference

//     // Data ko fetch karna
//     const snapshot = await slotsRef.get();

//     if (snapshot.empty) {
//       return res.status(404).json({ error: 'No parking slots found' }); // Handle empty data
//     }

//     const slots = snapshot.docs.map(doc => doc.data()); // Data ko retrieve karna
//     res.json(slots); // Response frontend ko bhejna
//   } catch (error) {
//     console.error('Error fetching parking slots:', error);
//     res.status(500).json({ error: 'Failed to fetch parking slots' });
//   }
// };


// exports.getSlots = async (req, res) => {
//   try {
//     const slotsRef = db.collection('parking_slots');
//     const snapshot = await slotsRef.get();

//     if (snapshot.empty) {
//       return res.status(404).json({ error: 'No parking slots found' });
//     }

//     const slots = snapshot.docs.map(doc => {
//       const data = doc.data();
      
//       // Convert Firestore timestamp to JavaScript Date object
//       const createdAt = new Date(data.created_at._seconds * 1000);
//       const updatedAt = new Date(data.updated_at._seconds * 1000);

//       return {
//         id: doc.id,
//         slot_number: data.slot_number,
//         address: data.address,
//         city: data.city,
//         is_booked: data.is_booked,
//         created_at: createdAt,
//         updated_at: updatedAt
//       };
//     });

//     res.json(slots);
//   } catch (error) {
//     console.error('Error fetching parking slots:', error);
//     res.status(500).json({ error: 'Failed to fetch parking slots' });
//   }
// };




// const admin = require('firebase-admin');
// const serviceAccount = require('./config/serviceAccount.json');

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "process.env.FDB_URL"
//   });
//   console.log('Firebase Initialized');
// } catch (error) {
//   console.error('Error initializing Firebase: ', error);
// }

// const db = admin.database(); // Firebase database instance

// module.exports = db; // Export the database instance


// Import required packages
// require('dotenv').config(); // Load environment variables from .env file
// const admin = require('firebase-admin');

// // Setup Firebase credentials using environment variables
// const serviceAccount = {
//   type: "service_account",
//   project_id: "truck-project9",
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,  // Store these in .env
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Fix multi-line private key format
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40truck-parking-app-dade9.iam.gserviceaccount.com"
// };

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FDB_URL // Database URL from .env file
//   });
//   console.log('Firebase Initialized');
// } catch (error) {
//   console.error('Error initializing Firebase: ', error);
// }

// const db = admin.database(); // Firebase database instance
// module.exports = db; // Export the database instance


// index.js or app.js











old parking controller
// // const db =require('../firebaseConfig')


// // // Using Native JavaScript (Intl.DateTimeFormat)
// // exports.getSlots = async (req, res) => {
// //   try {
// //     const slotsRef = db.collection('parking_slots');
// //     const snapshot = await slotsRef.get();

// //     if (snapshot.empty) {
// //       return res.status(404).json({ error: 'No parking slots found' });
// //     }

// //     const slots = snapshot.docs.map(doc => {
// //       const data = doc.data();
      
// //       // Convert Firestore timestamp to Date object
// //       const createdAt = new Date(data.created_at._seconds * 1000);
// //       const updatedAt = new Date(data.updated_at._seconds * 1000);

// //       // Convert to PST using Intl.DateTimeFormat
// //       const options = {
// //         timeZone: 'America/Los_Angeles',
// //         hour12: true,
// //         weekday: 'short',
// //         year: 'numeric',
// //         month: 'short',
// //         day: 'numeric',
// //         hour: '2-digit',
// //         minute: '2-digit',
// //         second: '2-digit'
// //       };
      
// //       const createdAtPST = new Intl.DateTimeFormat('en-US', options).format(createdAt);
// //       const updatedAtPST = new Intl.DateTimeFormat('en-US', options).format(updatedAt);

// //       return {
// //         id: doc.id,
// //         slot_number: data.slot_number,
// //         address: data.address,
// //         city: data.city,
// //         is_booked: data.is_booked,
// //         created_at: createdAtPST,
// //         updated_at: updatedAtPST
// //       };
// //     });

// //     res.json(slots);
// //   } catch (error) {
// //     console.error('Error fetching parking slots:', error);
// //     res.status(500).json({ error: 'Failed to fetch parking slots' });
// //   }
// // };


// const admin = require('../firebaseConfig'); // Firebase config ko import karein

// exports.createSlots = async (req, res) => {
//   try {
//     const { slot_number, address, city, is_booked } = req.body;

//     // Check if required fields are provided
//     if (!slot_number || !address || !city || is_booked === undefined) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Firestore collection reference
//     const slotsRef = admin.firestore().collection('parking_slots');
    
//     // Add new parking slot document
//     const newSlotRef = await slotsRef.add({
//       slot_number,
//       address,
//       city,
//       is_booked,
//       created_at: admin.firestore.FieldValue.serverTimestamp(),
//       updated_at: admin.firestore.FieldValue.serverTimestamp()
//     });

//     // Send success response with new document ID
//     res.status(201).json({
//       message: 'Parking slot created successfully!',
//       slot_id: newSlotRef.id
//     });
//   } catch (error) {
//     console.error('Error creating parking slot:', error);
//     res.status(500).json({ error: 'Failed to create parking slot', details: error.message });
//   }
// };



// // exports.getSlots = async (req, res) => {
// //   try {
// //     // Reference to the Firestore 'parking_slots' collection
// //     const slotsRef = admin.firestore().collection('parking_slots');
    
// //     // Fetch the snapshot of the collection
// //     const snapshot = await slotsRef.get();

// //     // Check if collection is empty
// //     if (snapshot.empty) {
// //       return res.status(404).json({ error: 'No parking slots found' });
// //     }

// //     // Map through the documents to extract data
// //     const slots = snapshot.docs.map(doc => {
// //       const data = doc.data();
// //       return {
// //         id: doc.id,
// //         slot_number: data.slot_number,
// //         address: data.address,
// //         city: data.city,
// //         is_booked: data.is_booked,
// //         created_at: data.created_at,
// //         updated_at: data.updated_at,
// //       };
// //     });

// //     // Send response back with all the parking slots
// //     res.json(slots);
// //   } catch (error) {
// //     console.error('Error fetching parking slots:', error);
// //     res.status(500).json({ error: 'Failed to fetch parking slots' });
// //   }
// // };

// exports.getSlots = async (req, res) => {
//   try {
//     // Reference to the Firestore 'parking_slots' collection
//     const slotsRef = admin.firestore().collection('parking_slots');
    
//     // Fetch the snapshot of the collection
//     const snapshot = await slotsRef.get();

//     // Check if collection is empty
//     if (snapshot.empty) {
//       return res.status(404).json({ error: 'No parking slots found' });
//     }

//     // Function to convert Firestore Timestamp to PST
//     const convertToPST = (timestamp) => {
//       if (!timestamp) return null;

//       // Convert Firestore timestamp to Date object
//       const date = new Date(timestamp._seconds * 1000);
      
//       // Define options for the PST format
//       const options = {
//         timeZone: 'America/Los_Angeles',
//         weekday: 'short',
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true
//       };
      
//       // Format the date in PST timezone using Intl.DateTimeFormat
//       const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
      
//       return formattedDate;
//     };

//     // Map through the documents to extract data
//     const slots = snapshot.docs.map(doc => {
//       const data = doc.data();
//       return {
//         id: doc.id,
//         slot_number: data.slot_number,
//         address: data.address,
//         city: data.city,
//         is_booked: data.is_booked,
//         created_at: convertToPST(data.created_at),  // Convert created_at to PST
//         updated_at: convertToPST(data.updated_at),  // Convert updated_at to PST
//       };
//     });

//     // Send response back with all the parking slots
//     res.json(slots);
//   } catch (error) {
//     console.error('Error fetching parking slots:', error);
//     res.status(500).json({ error: 'Failed to fetch parking slots' });
//   }
// };


// //booking create karna........


// exports.createBooking = async (req, res) => {
//   try {
//     const { user_name, slot_id, booking_date,trailer_number, trailer_status } = req.body;

//     if (!user_name || !slot_id || !booking_date || !trailer_number || !trailer_status) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const bookingsRef = admin.firestore().collection('bookings');
//     const newBookingRef = await bookingsRef.add({
//       user_name,
//       slot_id,
//       booking_date: admin.firestore.Timestamp.fromDate(new Date(booking_date)), 
//       trailer_number,
//       trailer_status,
//       created_at: admin.firestore.FieldValue.serverTimestamp(),
//       updated_at: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     const slotRef = admin.firestore().collection('parking_slots').doc(slot_id);
//     const slotDoc = await slotRef.get();
//     if (!slotDoc.exists) {
//       return res.status(404).json({ error: 'Parking slot not found' });
//     }

//     await slotRef.update({
//       is_booked: true,
//       updated_at: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.status(201).json({
//       message: 'Booking created successfully!',
//       booking_id: newBookingRef.id,
//     });
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({
//       error: 'Failed to create booking',
//       details: error.message, 
//     });
//   }
// };



// exports.bookByslotid = async (req, res) => {
//   try {
//     const { slotId } = req.params; // Extract slotId from the route params
//     const { user_name, booking_date, trailer_number, trailer_status } = req.body; // Extract the data from the request body

//     // Validate input fields
//     if (!user_name || !booking_date || !trailer_number || !trailer_status) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Check if the parking slot exists in Firestore
//     const slotRef = admin.firestore().collection('parking_slots').doc(slotId);
//     const slotDoc = await slotRef.get();

//     // If slot not found, return an error
//     if (!slotDoc.exists) {
//       return res.status(404).json({ error: 'Parking slot not found' });
//     }

//     const slotData = slotDoc.data();

//     // Check if the slot is already booked
//     if (slotData.is_booked) {
//       return res.status(400).json({ error: 'This parking slot is already booked' });
//     }

//     // Create a new booking in the 'bookings' collection
//     const bookingsRef = admin.firestore().collection('bookings');
//     const newBookingRef = await bookingsRef.add({
//       user_name,
//       slot_id: slotId,
//       booking_date: admin.firestore.Timestamp.fromDate(new Date(booking_date)), // Convert booking_date to Firestore timestamp
//       trailer_number,
//       trailer_status,
//       created_at: admin.firestore.FieldValue.serverTimestamp(),
//       updated_at: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     // Update the parking slot to mark it as booked
//     await slotRef.update({
//       is_booked: true,
//       updated_at: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     // Send response back with the booking ID
//     res.status(201).json({
//       message: 'Booking created successfully!',
//       booking_id: newBookingRef.id,
//     });
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({
//       error: 'Failed to create booking',
//       details: error.message,
//     });
//   }
// };


// exports.bookingDetails = async (req, res) => {
//   const { bookingId } = req.params;

//   try {
//     // Reference to the Firestore 'bookings' collection (note the plural 'bookings')
//     const bookingRef = admin.firestore().collection('bookings').doc(bookingId);

//     // Get the document from Firestore
//     const bookingDoc = await bookingRef.get();

//     // Check if the document doesn't exist
//     if (!bookingDoc.exists) {
//       // If no document is found, return a 404 error
//       return res.status(404).json({ error: 'Booking not found' });
//     }

//     // If document exists, extract the data
//     const bookingData = bookingDoc.data();

//     // Return the booking data as JSON
//     res.json(bookingData);

//   } catch (error) {
//     // Log the error if an exception occurs
//     console.error('Error fetching booking details:', error);

//     // Return a 500 error response
//     res.status(500).json({ error: 'Failed to fetch booking details' });
//   }
// };



// // module.exports = ParkingLotModel;
// const mongoose = require('mongoose');
// // Define the schema for parking lot
// const parkingLotSchema = new mongoose.Schema({
//   address: {
//     street: { type: String, required: true }, // street field
//     city: { type: String, required: true },   // city field
//     state: { type: String, required: true },  // state field
//     zip: { type: String, required: true }     // zip code
//   },
//   spots: [
//     {
//       spotId: { type: String, required: true }, // spotId field (e.g., "spot1")
//       status: { type: Boolean, default: true }  // status of the spot (true = available, false = booked)
//     }
//   ],
 
// });

// const ParkingLotModel = mongoose.model('ParkingLotModel', parkingLotSchema);

// module.exports = ParkingLotModel;



// routes/parking.router.js
const express = require('express');
const router = express.Router();
const parkinglotController = require('../controller/parkinglotController');
const bookingController=require('../controller/bookingController')
// Define routes with handler functions
router.post('/spots', parkinglotController.createSlots); // Create a new parking slot
router.get('/spots', parkinglotController.getAllSpots); // Fetch all parking slots
router.get('/:address',parkinglotController.getslotByaddress)//fetch slot by address
router.put('/book/:address/:spotId',parkinglotController.updateSpot)//Update Parking Spot (Booking or Freeing up a Spot)
router.delete('/:address',parkinglotController.deleteParkinglot)// 1  parking lot ko delete karenge.
router.post('/book', bookingController.createBooking); // Create a new booking
//GET /api/bookings/:bookingId bookingdetails.........
router.get('api/bookings/:bookingId',bookingController.getBookingDetails)
router.post('/free-spot',bookingController.freeSpot);//update after 
// router.post('/book/:slotId', parkinglotController.bookBySlotId); // Book a parking slot by slotId
// router.get('/bookings/:bookingId', parkinglotController.bookingDetails); // Fetch booking details by bookingId
// router.delete('/clearbooking/:slotId', parkinglotController.clearBooking); 
// router.post('/updateSlotBookingStatus',parkinglotController.updateSlotBookingStatus) // Book a parking slot by slotId
module.exports = router;






const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    spotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parking', // Assuming you have a 'Parking' model for parking spots
      required: true
    },
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
      default: null, // Will be updated when the trailer exits
    },
    driverDetails: {
      name: {
        type: String,
        required: true
      },
      contactNumber: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            // Simple phone number regex (for example: 10-digit number)
            return /\d{10}/.test(v);
          },
          message: props => `${props.value} is not a valid contact number!`
        }
      }
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

const BookingParkModel = mongoose.model('BookingParkModel', bookingSchema);

module.exports = BookingParkModel;







const BookingParkModel=require('../model/bookingModel');
const ParkingsModel=require('../model/parkingsModel');
const mongoose = require('mongoose')

  // exports.createBooking = async (req, res) => {
  //   const { spotId, trailerNumber, driverDetails } = req.body;
  
  //   try {
  //     // Find the parking lot containing the spot
  //     const parkingLot = await ParkingLotModel.findOne({
  //       'spots.spotId': spotId,
  //     });
  
  //     if (!parkingLot) {
  //       return res.status(400).json({ message: 'Spot not found' });
  //     }
  
  //     const spot = parkingLot.spots.find((s) => s.spotId === spotId);
  
  //     if (!spot) {
  //       return res.status(400).json({ message: 'Spot not found' });
  //     }
  
  //     // Check if the spot is already booked
  //     if (!spot.status) {
  //       return res.status(400).json({ message: 'Spot is already booked' });
  //     }
  
  //     // Mark the spot as occupied
  //     spot.status = false;
  //     spot.trailerNumber = trailerNumber;
  //     spot.driverDetails = driverDetails;
  //     spot.entryTime = new Date();
  //     spot.exitTime = null; // Set exit time to null, since we don't know yet
  
  //     // Save the updated parking lot
  //     await parkingLot.save();
  
  //     // Create booking record without exit time
  //     const newBooking = new BookingModel({
  //       spotId,
  //       trailerNumber,
  //       driverDetails,
  //       entryTime: spot.entryTime,
  //       exitTime: null, // Set to null initially
  //     });
  
  //     await newBooking.save();
  
  //     res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Error creating booking', error: error.message });
  //   }
  // };
  
  exports.createBooking = async (req, res) => {
    const { spotId, trailerNumber, driverDetails } = req.body;
  
    try {
      // Find the parking lot containing the spot
      const parkingLot = await ParkingsModel.findOne({
        'spots.spotId': spotId,
      });
  
      if (!parkingLot) {
        return res.status(400).json({ message: 'Spot not found' });
      }
  
      const spot = parkingLot.spots.find((s) => s.spotId === spotId);
  
      if (!spot) {
        return res.status(400).json({ message: 'Spot not found' });
      }
  
      // Check if the spot is already booked
      if (!spot.status) {
        return res.status(400).json({ message: 'Spot is already booked' });
      }
  
      // Mark the spot as occupied
      spot.status = false; // Mark as booked
      spot.trailerNumber = trailerNumber;
      spot.driverDetails = driverDetails;
      spot.entryTime = new Date();
      spot.exitTime = null; // Exit time will be set later
  
      // Save the updated parking lot
      await parkingLot.save();
  
      // Create booking record without exit time
      const newBooking = new BookingParkModel({
        spotId,
        trailerNumber,
        driverDetails,
        entryTime: spot.entryTime,
        exitTime: null, // Exit time is initially null
      });
  
      await newBooking.save();
  
      // Return only the bookingId in the response
      res.status(201).json({
        bookingId: newBooking._id,  // Only send the bookingId (_id from MongoDB)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
  };
  
  exports.freeSpot = async (req, res) => {
    const { spotId } = req.body;
  
    try {
      // Find the parking lot containing the spot
      const parkingLot = await ParkingLotsModel.findOne({
        'spots.spotId': spotId,
      });
  
      if (!parkingLot) {
        return res.status(400).json({ message: 'Spot not found' });
      }
  
      // Find the specific spot
      const spot = parkingLot.spots.find((s) => s.spotId === spotId);
  
      if (!spot) {
        return res.status(400).json({ message: 'Spot not found' });
      }
  
      // Free the spot
      spot.status = true; // Spot is now free
      spot.trailerNumber = null; // Remove trailer info
      spot.driverDetails = null; // Remove driver info
      spot.entryTime = null; // Reset entry time
      spot.exitTime = new Date(); // Set current time as exit time
  
      // Save the updated parking lot
      await parkingLot.save();
  
      // Send success response
      res.status(200).json({ message: 'Spot freed successfully', spot });
    } catch (error) {
      console.error('Error freeing spot:', error);
      res.status(500).json({ message: 'Error freeing spot', error: error.message });
    }
  };
  

  exports.getBookingDetails = async (req, res) => {
    const { bookingId } = req.params; // Booking ID URL params se

    try {
        // Booking ko ID ke basis pe dhoondhna
        const booking = await BookingParkModel.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Booking details ko response me bhejna
        res.status(200).json({ message: 'Booking found', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching booking details', error: error.message });
    }
};

  




//  exports.bookSpot = async (req, res) => {
//   const { spotId, trailerNumber, driverDetails } = req.body;

//   try {
//       // Find the parking lot containing the spot
//       const parkingLot = await ParkingLotModel.findOne({
//           'spots.spotId': spotId,
//       });

//       if (!parkingLot) {
//           return res.status(400).json({ message: 'Parking lot or spot not found' });
//       }

//       const spot = parkingLot.spots.find((s) => s.spotId === spotId);

//       if (!spot) {
//           return res.status(400).json({ message: 'Spot not found' });
//       }

//       // Check if the spot is already booked
//       if (!spot.status) {
//           return res.status(400).json({ message: 'Spot is already booked' });
//       }

//       // Mark the spot as booked
//       spot.status = false; // Set spot as booked
//       spot.trailerNumber = trailerNumber;
//       spot.driverDetails = driverDetails;
//       spot.entryTime = new Date(); // Set entry time
//       spot.exitTime = null; // Set exit time to null initially

//       // Save the updated parking lot
//       await parkingLot.save();

//       // Create a booking record
//       const newBooking = new BookingPark({
//           spotId,
//           trailerNumber,
//           driverDetails,
//           entryTime: spot.entryTime,
//           exitTime: null, // Exit time is initially null
//       });

//       await newBooking.save();

//       // Return the booking ID as the response
//       res.status(201).json({
//           message: 'Booking created successfully',
//           bookingId: newBooking._id.toString(),  // Ensure bookingId is returned as a string
//       });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error creating booking', error: error.message });
//   }
// };


// exports.bookSpot = async (req, res) => {
//   const { trailerNumber, driverDetails } = req.body;
//   const { spotId } = req.params;  // spotId ko URL se fetch karen (assuming route me spotId diya gaya hai)

//   try {
//       // Find the parking lot containing the spot
//       const parkingLot = await ParkingLotsModel.findOne({
//           'spots.spotId': spotId,
//       });

//       if (!parkingLot) {
//           return res.status(400).json({ message: 'Parking lot or spot not found' });
//       }

//       const spot = parkingLot.spots.find((s) => s.spotId === spotId);

//       if (!spot) {
//           return res.status(400).json({ message: 'Spot not found' });
//       }

//       // Check if the spot is already booked
//       if (!spot.status) {
//           return res.status(400).json({ message: 'Spot is already booked' });
//       }

//       // Mark the spot as booked
//       spot.status = false; // Set spot as booked
//       spot.trailerNumber = trailerNumber;
//       spot.driverDetails = driverDetails;
//       spot.entryTime = new Date(); // Set entry time
//       spot.exitTime = null; // Set exit time to null initially

//       // Save the updated parking lot
//       await parkingLot.save();

//       // Create a booking record
//       const newBooking = new BookingParkModel({
//           spotId,
//           trailerNumber,
//           driverDetails,
//           entryTime: spot.entryTime,
//           exitTime: null, // Exit time is initially null
//       });

//       await newBooking.save();

//       // Return the booking ID as the response
//       res.status(201).json({
//           message: 'Booking created successfully',
//           bookingId: newBooking._id.toString(),  // Ensure bookingId is returned as a string
//       });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error creating booking', error: error.message });
//   }
// };


// exports.bookSpot = async (req, res) => {
//   const { trailerNumber, driverDetails, trailerStatus } = req.body;
//   const { spotId, addressId } = req.params; // Spot aur Address ID ko URL parameters se lena hai

//   try {
//     // Validate karte hain ki Spot ID aur Address ID sahi format mein hain ya nahi
//     if (!mongoose.Types.ObjectId.isValid(spotId) || !mongoose.Types.ObjectId.isValid(addressId)) {
//       return res.status(400).json({ message: 'Spot ID ya Address ID galat hai' });
//     }

//     // Parking lot ko addressId ke through dhoondhna
//     const parkingLot = await ParkingsModel.findOne({ '_id': new mongoose.Types.ObjectId(addressId) });

// if (!parkingLot) {
//   console.log(`Parking lot with ID ${addressId} not found`);
//   return res.status(404).json({ message: 'Parking lot nahi mila' });
// }

// console.log(parkingLot); // Check the result of the query

//     // Spot ko spotId ke through dhoondhna
//     const spot = parkingLot.spots.find((s) => s._id.toString() === spotId);

//     if (!spot) {
//       return res.status(404).json({ message: 'Parking spot nahi mila' });
//     }

//     // Spot ko book karte waqt, uska status check karna
//     if (!spot.status) {
//       return res.status(400).json({ message: 'Spot pehle hi book ho chuki hai' });
//     }

//     // Spot ko book karna
//     spot.status = false;  // Spot ko book kar rahe hain
//     spot.trailerNumber = trailerNumber;
//     spot.trailerStatus = trailerStatus || 'empty';  // Default 'empty' agar trailerStatus nahi diya
//     spot.driverDetails = driverDetails;
//     spot.entryTime = new Date();  // Current time pe entry time set kar rahe hain
//     spot.exitTime = null;  // Exit time ko null set karte hain

//     // Parking lot ko update karte hain
//     await parkingLot.save();

//     // Success response dena with only bookingId
//     res.status(201).json({
//       bookingId: spot._id,  // Spot ID as booking ID (this can be used as the booking ID)
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Spot book karte waqt kuch galat ho gaya', error: error.message });
//   }
// };


exports.bookSpot = async (req, res) => {
  try {
    const { trailerNumber, trailerStatus, driverName, driverContact, spotId } = req.body;

    // Spot ko find kar rahe hain aur check kar rahe hain ki wo spot available hai ya nahi
    const parkingSpot = await ParkingsModel.findById(spotId);
    if (!parkingSpot) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }

    if (parkingSpot.status !== 'available') {
      return res.status(400).json({ message: 'Parking spot is already booked' });
    }

    // Booking ke liye nayi entry create karte hain
    const newBooking = new BookingParkModel({
      spotId,
      trailerNumber,
      trailerStatus,
      driverDetails: {
        name: driverName,
        contactNumber: driverContact
      }
    });

    // Booking ko save kar rahe hain
    await newBooking.save();

    // Parking spot ka status update karte hain ki wo 'booked' ho gaya hai
    parkingSpot.status = 'booked';
    await parkingSpot.save();

    // Response mein sirf bookingId bhej rahe hain
    res.status(200).json({
      bookingId: newBooking._id  // MongoDB ka _id ko as bookingId return kar rahe hain
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking parking spot', error: error.message });
  }
};




// Booking confirm karne ki method


// In the confirmBooking function
export const confirmBooking = async (req, res) => {
  try {
    const { spotId, trailerNumber, driverDetails, trailerStatus } = req.body;

    // Check if spotId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(spotId)) {
      return res.status(400).json({ message: 'Invalid spotId format' });
    }

    // Convert the spotId from string to ObjectId
    const spotObjectId = mongoose.Types.ObjectId(spotId);

    // Find the parking spot by spotId (converted to ObjectId)
    const parkingSpot = await ParkingsModel.findOne({ 'spots._id': spotObjectId });

    if (!parkingSpot) {
      return res.status(404).json({ message: "Parking spot not found" });
    }

    // Proceed with the booking logic, e.g., save booking data
    const newBooking = new BookingParkModel({
      spotId: spotObjectId, // Store the ObjectId of the spot
      trailerNumber,
      trailerStatus,
      entryTime: new Date(),
      driverDetails,
    });

    // Save the booking to the database
    await newBooking.save();

    return res.status(200).json({ message: 'Booking successful', bookingId: newBooking._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error booking parking spot', error: error.message });
  }
};
