/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Navbar from "../../../components/navbar";
import UpdFeedbackModal from "../../../components/modals/Feedback/UpdFeedbackModal";
import Swal from "sweetalert2";

export default function index() {
  const [feedback, setFeedback] = useState([]);

  const userId = localStorage.getItem("_id");

  useEffect(() => {
    axios
      .get(`https://tripplanner.up.railway.app/api/v1/review/getuse/${userId}`)
      .then((res) => {
        console.log(res);
        setFeedback(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handledelete(id) {
    axios
      .delete("https://tripplanner.up.railway.app/api/v1/review/delete/" + id)
      .then(function (response) {
        Swal.fire({
          title: "Success!",
          text: "Review Deleted Successfully",
          icon: "success",
        }).then(function (response) {
          window.location.reload();
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Navbar />

      <div className="text-center">
        <br />
        <h1>Reviews</h1>
        <br />
        <br />
        <br />
        <br />
        <Table striped>
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Email</th>
              <th>Satisfaction Rate</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {feedback.feedbackId} */}
            {feedback.map((fb) => (
              <tr key={fb.feedbackId}>
                <td>
                  <img
                    src={fb.hotelImage}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{fb.hotelName}</td>
                <td>{fb.username}</td>
                <td>{fb.rating}</td>
                <td>{fb.reviewText}</td>
                <td>
                  <UpdFeedbackModal fbid={fb.feedbackId} />
                  <Button
                    className="btn btn-danger ms-1"
                    onClick={() => {
                      handledelete(fb.feedbackId);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
}
