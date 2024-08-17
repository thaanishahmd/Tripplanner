import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal Server Error" });
  }
};

export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);

    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: book,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find({});
    res.send(books);
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const updatedBooking = async (req, res) => {
  try {
    const book = await Booking.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        status: req.body.status,
        phone: req.body.phone,
        guestSize: req.body.guestSize,
        tourId: req.body.tourId,
        userId: req.body.userId,
        hotelId: req.body.hotelId,
      },
      {
        new: true,
      }
    );

    if (book) {
      res.send({
        status: 200,
        book: book,
      });
    } else {
      res.send({
        status: 500,
        message:"Update booking failed"
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBooking = async (req, res) => {
  const book = await Booking.findOneAndDelete({ _id: req.params.id });
  res.send(book);
};

// export const getAllpendingBookings = async (req, res) => {
//   const booking = await Booking.find({ status: "pending" });
//   res.send(booking);
// };
// export const getAllOngoingBookings = async (req, res) => {
//   const booking = await Booking.find({ status: "ongoing" });
//   res.send(booking);
// };
// export const getAllComletedBookings = async (req, res) => {
//   const booking = await Booking.find({ status: "completed" });
//   res.send(booking);
// };

// export const getSingleBooking = async (req, res) => {
//   console.log("id");
//   console.log(req.body.id);
//   const booking = await Booking.findOne({ userId: req.body.id });
//   console.log(booking);
//   res.send(booking);
// };
