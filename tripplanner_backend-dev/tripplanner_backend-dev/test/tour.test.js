import Tour from "../models/Tour";
import {
  createTour,
  updatedTour,
  deleteTour,
  getSingleTour,
  getAllTour,
} from "../controllers/tourController";

// Mock the response object
const res = {
  send: jest.fn(),
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Tour Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createTour", () => {
    it("should create a tour", async () => {
      const req = {
        body: {
          title: "Tour Title",
          city: "City",
          desc: "Tour Description",
          pricePerHead: 100,
          maxGroupSize: 10,
          modeOfTransport: "Transport",
        },
      };

      await createTour(req, res);

      expect(res.send).toHaveBeenCalledWith({
        status: "success",
        details: expect.any(Object),
      });
    });
  });

  describe("updatedTour", () => {
    it("should update a tour", async () => {
      const req = {
        body: {
          id: "tour_id",
          title: "Updated Tour Title",
          city: "Updated City",
          desc: "Updated Tour Description",
          price: 200,
          maxGroupSize: 20,
          modeOfTransport: "Updated Transport",
        },
      };

      Tour.findOneAndUpdate = jest.fn().mockResolvedValue({
        _id: req.body.id,
        ...req.body,
      });

      await updatedTour(req, res);

      expect(Tour.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: req.body.id },
        expect.objectContaining({
          title: req.body.title,
          city: req.body.city,
          desc: req.body.desc,
          pricePerHead: req.body.price,
          maxGroupSize: req.body.maxGroupSize,
          modeOfTransport: req.body.modeOfTransport,
        }),
        { new: true }
      );
      expect(res.send).toHaveBeenCalledWith({
        status: 200,
        tour: expect.any(Object),
      });
    });

    it("should handle error when updating a tour", async () => {
      const req = {
        body: {
          id: "tour_id",
          title: "Updated Tour Title",
          city: "Updated City",
          desc: "Updated Tour Description",
          price: 200,
          maxGroupSize: 20,
          modeOfTransport: "Updated Transport",
        },
      };

      Tour.findOneAndUpdate = jest.fn().mockRejectedValue(new Error("Error"));

      await updatedTour(req, res);

      expect(res.send).toHaveBeenCalledWith({
        status: 500,
        tour: null,
      });
    });
  });

  describe("deleteTour", () => {
    it("should delete a tour", async () => {
      const req = {
        body: {
          id: "tour_id",
        },
      };

      Tour.findOneAndDelete = jest.fn().mockResolvedValue({ _id: req.body.id });

      await deleteTour(req, res);

      expect(Tour.findOneAndDelete).toHaveBeenCalledWith({ _id: req.body.id });
      expect(res.send).toHaveBeenCalledWith({ _id: req.body.id });
    });
  });

  describe("getSingleTour", () => {
    it("should get a single tour", async () => {
      const req = {
        params: {
          id: "tour_id",
        },
      };

      Tour.findById = jest.fn().mockResolvedValue({ _id: req.params.id });

      await getSingleTour(req, res);

      expect(Tour.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Successfully get tour",
        data: expect.any(Object),
      });
    });

    it("should handle error when getting a single tour", async () => {
      const req = {
        params: {
          id: "tour_id",
        },
      };

      Tour.findById = jest.fn().mockRejectedValue(new Error("Error"));

      await getSingleTour(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Unable to find tour",
      });
    });
  });

  describe("getAllTour", () => {
    it("should get all tours", async () => {
      const req = {
        query: {
          page: 1,
        },
      };

      Tour.find = jest.fn().mockResolvedValue([
        { _id: "tour_id1" },
        { _id: "tour_id2" },
      ]);

      await getAllTour(req, res);

      expect(Tour.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        message: "Successfully get tours",
        data: expect.any(Array),
      });
    });

    it("should handle error when getting all tours", async () => {
      const req = {
        query: {
          page: 1,
        },
      };

      Tour.find = jest.fn().mockRejectedValue(new Error("Error"));

      await getAllTour(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Unable to find tours",
      });
    });
  });
});
