import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    console.log(newHotel);
    const savedHotel = await newHotel.save();

    res.status(200).json({
      success: true,
      message: "Successfully created a new Hotel",
      data: savedHotel,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes

    res.status(500).json({
      success: false,
      message: "Unable to create Hotel",
    });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        roomCount: req.body.roomCount,
        image: req.body.image,
      },
      {
        new: true,
      }
    );

    if (hotel) {
      res.send({
        status: 200,
        hotel: hotel,
      });
    } else {
      res.send({
        status: 500,
        hotel: hotel,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteHotel = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      await Hotel.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Successfully Deleted Hotel",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to delete Hotel",
    });
  }
};

export const getSingleHotel = async (req, res) => {
  const id = req.params.id;
  const hotel = await Hotel.findById(id);
  res.send(hotel);
};

export const getAllHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.send(hotels);
};

export const getHotelLatest = async (req, res) => {
  const hotels = await Hotel.find().sort({ createdAt: -1 }).limit(5);
  res.send(hotels);
};
