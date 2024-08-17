import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";

export default function UpdFeedbackModal(props) {
  const [show, setShow] = useState(false);

  const [feedbackId, setFeedbackId] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");

  const FbData = {
    rating,
    reviewText,
  };

  const UpdateShow = () => {
    console.log(props.fbid);
    setFeedbackId(props.fbid);
    axios
      .get(
        "https://tripplanner.up.railway.app/api/v1/review/getone/" + props.fbid
      )
      .then(function (response) {
        setRating(response.data["rating"]);
        setReviewText(response.data["reviewText"]);
        setShow(true);
      })
      .catch(function (error) {
        console.log(error);
        alert("invalid");
      });
  };

  function submitForm(e) {
    e.preventDefault();
    axios
      .put(
        "https://tripplanner.up.railway.app/api/v1/review/update/" + props.fbid,
        FbData
      )
      .then(function (response) {
        setRating("");
        setReviewText("");
        setShow(false);
        Swal.fire({
          title: "Success!",
          text: "Review updated Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(function () {
          window.location.reload();
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn btn-success ms-1" onClick={UpdateShow}>
        Edit
      </Button>

      <Modal show={show} size="lg" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Review
          </Modal.Title>
        </Modal.Header>

        <Form>
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
                  value={rating}
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
                  value={reviewText}
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
            <Button variant="primary" type="submit" onClick={submitForm}>
              Update Review
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
