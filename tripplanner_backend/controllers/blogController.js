import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    console.log(newBlog);
    const savedBlog = await newBlog.save();

    res.status(200).json({
      success: true,
      message: "Successfully created a new Blog",
      data: savedBlog,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes

    res.status(500).json({
      success: false,
      message: "Unable to create Blog",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        city: req.body.city,
        image: req.body.image,
      },
      {
        new: true,
      }
    );

    if (blog) {
      res.send({
        status: 200,
        blog: blog,
      });
    } else {
      res.send({
        status: 500,
        blog: blog,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      await Blog.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Successfully Deleted Blog",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to delete Blog",
    });
  }
};

export const getSingleBlog = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  res.send(blog);
};

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
};

export const getlatest = async (req, res) => {
  // Get the latest 5 blogs from the database.
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

  // Send the blogs back to the client.
  res.send(blogs);
};
