import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";

export default function AddFeedbackModal(props) {
  const [show, setShow] = useState(false);

  const userId = localStorage.getItem("_id");
  const username = localStorage.getItem("username");
  const hotelId = props.hotid;
  const hotelName = props.hotname;
  const hotelImage = props.hotimage;

  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");

  const FbData = {
    userId,
    username,
    hotelId,
    hotelName,
    hotelImage,
    rating,
    reviewText,
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (rating.length === 0 || reviewText.length === 0) {
      swal(" Fields Cannot be empty !", "Please enter all data !", "error");
    } else {
      console.log(FbData);
      axios
        .post("https://tripplanner.up.railway.app/api/v1/review/add", FbData)
        .then(function (res) {
          // alert("Added Successfully");
          console.log(res);
          setRating("");
          setReviewText("");
          Swal.fire({
            title: "Success!",
            text: "Review added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn btn-dark ms-1" onClick={handleShow}>
        Leave a Review
        <i className="fa fa-commenting ms-1" />
      </Button>

      <Modal show={show} size="lg" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Leave a Review
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
                <Form.Label>Satisfactory Rate(0-5):</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="number"
                  defaultValue={0}
                  className="form-control"
                  max={5}
                  onChange={(e) => {
                    setRating(e.target.value);
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
                <Form.Label>Message:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setReviewText(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Exit
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Submit Review
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
