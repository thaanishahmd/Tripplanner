import Tour from "../models/Tour.js";
import feedback from "../models/Review.js";

export const createReview = async (req, res) => {
  const { userId, username, hotelName, hotelImage, hotelId} = req.body;
  const newFeedback = new feedback({
    feedbackId: req.body.feedbackId,
    rating: req.body.rating,
    reviewText: req.body.reviewText,
    userId: userId,
    username: username,
    hotelName: hotelName,
    hotelImage: hotelImage,
    hotelId: hotelId,
  });
  let code = 1;
  try {
    const fbcount = await feedback.find().sort({ _id: -1 }).limit(1);
    if (fbcount.length > 0) code += fbcount[0].code;
    newFeedback.feedbackId = "FB" + code;
    newFeedback.code = code;
    try {
      const savedFeedback = await newFeedback.save();
      res.status(200).json(savedFeedback);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatedReview = async (req, res) => {
  try {
    // console.log("123");
    await feedback.findOneAndUpdate(
      { feedbackId: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json("Feedback updated");
  } catch (err) {
    res.status(500).json(err);
  }
};


export const deleteReview = async (req, res) => {
  try {
    await feedback.findOneAndDelete({ feedbackId: req.params.id });
    res.status(200).json("Feedback has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const allReviews = async (req, res) => {
  try {
    const feedbacks = await feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const userReviews = async (req, res) => {
  try {
    // console.log(req.params.id)
    const feedbacks = await feedback.find({ userId: req.params.id });
    res.status(200).json(feedbacks);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const hotelReviews = async (req, res) => {
  try {
    const feedbacks = await feedback.find({ hotelId: req.params.id });
    res.status(200).json(feedbacks);
  } catch (err) {
    return res.status(500).json(err);
  }
};


export const oneReview = async (req, res) => {
  try {
    const feedbacks = await feedback.findOne({ feedbackId: req.params.id });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json(err);
  }
};







