import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { LoadingOverlay } from "@mantine/core";
import requestConfigJson from "../../../context/ConfigJson";

export default function AddHotelModal() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("_id");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [roomCount, setRoomcount] = useState("");
  const [image, setImage] = useState("");
  const [revid, setRevid] = useState("");

  const HotData = {
    userId,
    name,
    description,
    city,
    roomCount,
    image,
    // revid,
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (
      name.length === 0 ||
      description.length === 0 ||
      city.length === 0 ||
      roomCount.length === 0
      // ||  image.length === 0
    ) {
      swal(" Fields Cannot be empty !", "Please enter all data !", "error");
    } else {
      console.log(HotData);
      axios
        .post(
          "https://tripplanner.up.railway.app/api/v1/hotel/",
          HotData,
          requestConfigJson
        )
        .then(function (res) {
          // alert("Added Successfully");
          console.log(res);
          setName("");
          setDescription("");
          setCity("");
          setRoomcount("");
          setImage("");
          Swal.fire({
            title: "Success!",
            text: "Hotel added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            setShow(false);
            window.location.reload();
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

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
        Add Hotel
      </Button>

      <Modal show={show} size="lg" centered>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a hotel
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Col sm={3}>
                <Form.Label>Name:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Col sm={3}>
                <Form.Label>Description:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Col sm={3}>
                <Form.Label>City:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Col sm={3}>
                <Form.Label>Room Count:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setRoomcount(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Col sm={3}>
                <Form.Label>Image:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Group controlId="formFile">
                  <Form.Control onChange={handleImageChange} type="file" />
                </Form.Group>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Exit
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
