const User = require("./../models/User");
const DonationCamp = require(".././models/DonationCamp");
const { restrictTo } = require('../controllers/authController');


// Function to get patients
exports.getPatients = async (req, res, next) => {
    try {
        // Geospatial query to search for nearest user with role doner
        const nearestDoner = await User.findOne({
            role: 'doner',
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [req.user.location.coordinates[0],
                        req.user.location.coordinates[1]]
                    },
                    $maxDistance: 10000 // Max distance in meters
                }
            }
        });
        if (!nearestDoner) {
            return res.status(404).json({ message: 'No doner found near you.' });
        }
        res.status(200).json({ nearestDoner });
    } catch (error) {
        next(error);
    }
};

//    exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     // roles ['admin', 'lead-guide']. role='user'
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError("You do not have permission to perform this action", 403)
//       );
//     }

//     next();
//   }
// };

// Function to send a request to the nearest doner
epxorts.requestToNearestDoner = async (req, res, next) => {
    try {
      if (!nearestDoner) {
        return res.status(404).json({ message: "No doner found near you" });
      }
      // Send requist to the nearest doner
      const requistSent = await sendRequistToDoner(nearestDoner);
      if (requistSent) {
        res
          .status(200)
          .json({ message: "Requist sent to the nearest doner successfully." });
      } else {
        res
          .status(500)
          .json({ message: "Faild to send requist to nearest doner." });
      }
    } catch (error) {
        next(error);
    }
};

// Create donation camp
exports.createDonationCamp = async (req, res, next) => {
  try {
    const { name, location, date } = req.body;

    const DonationCamp = new DonationCamp({
      name,
      location,
      date
    });

    await newDonationCamp.save();
    res.status(201).json({ message: 'Donation camp created successfuly.', donationCamp: newDonationCamp });
  } catch (error) {
    next(error);
  }
};
