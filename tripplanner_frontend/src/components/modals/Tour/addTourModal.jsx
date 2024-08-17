import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { LoadingOverlay } from "@mantine/core";
import { useForm } from "react-hook-form";
import requestConfigJson from "../../../context/ConfigJson";

export default function AddTourModal() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const userId = localStorage.getItem("_id");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      const tourData = {
        userId: userId,
        title: data.title,
        desc: data.desc,
        city: data.city,
        pricePerHead: parseInt(data.pricePerHead),
        maxGroupSize: parseInt(data.maxGroupSize),
        modeOfTransport: data.modeOfTransport,
        image: image,
      };

      setLoading(true);
      const res = await axios.post(
        "https://tripplanner.up.railway.app/api/v1/tours/",
        tourData,
        requestConfigJson
      );
      setLoading(false);

      Swal.fire({
        title: "Success!",
        text: "Tour added successfully",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        reset();
        setShow(false);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "carengo");
      formData.append("cloud_name", "itp2022");

      setLoading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/itp2022/image/upload",
        formData,
        {
          method: "post",
          body: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(res.data.url);
      await setImage(res.data.url);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn btn-primary ms-1" onClick={handleShow}>
        Add Tour
      </Button>

      <Modal show={show} size="lg" centered>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a Tour
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Modal.Body>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Col sm={3}>
                <Form.Label>Title:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                {errors.title && (
                  <span className="text-danger">{errors.title.message}</span>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="desc">
              <Col sm={3}>
                <Form.Label>Description:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  {...register("desc", {
                    required: "Description is required",
                  })}
                />
                {errors.desc && (
                  <span className="text-danger">{errors.desc.message}</span>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="city">
              <Col sm={3}>
                <Form.Label>City:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  {...register("city", {
                    required: "City is required",
                  })}
                />
                {errors.city && (
                  <span className="text-danger">{errors.city.message}</span>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="pricePerHead">
              <Col sm={3}>
                <Form.Label>Price Per Head:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  {...register("pricePerHead", {
                    required: "Price per head is required",
                    min: {
                      value: 0,
                      message:
                        "Price per head must be greater than or equal to 0",
                    },
                  })}
                />
                {errors.pricePerHead && (
                  <span className="text-danger">
                    {errors.pricePerHead.message}
                  </span>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="maxGroupSize">
              <Col sm={3}>
                <Form.Label>Max Group Count:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  {...register("maxGroupSize", {
                    required: "Max group size is required",
                    min: {
                      value: 0,
                      message:
                        "Max group size must be greater than or equal to 0",
                    },
                  })}
                />
                {errors.maxGroupSize && (
                  <span className="text-danger">
                    {errors.maxGroupSize.message}
                  </span>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="modeOfTransport">
              <Col sm={3}>
                <Form.Label>Mode Of Transport:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  {...register("modeOfTransport", {
                    required: "Mode of transport is required",
                  })}
                />
                {errors.modeOfTransport && (
                  <span className="text-danger">
                    {errors.modeOfTransport.message}
                  </span>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="image">
              <Col sm={3}>
                <Form.Label>Image:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Group controlId="formFile">
                  <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Exit
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
