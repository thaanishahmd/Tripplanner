/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function index() {
  const params = useParams();
  const [blog, setBlog] = useState([]);
  const blogId = params.id;

  useEffect(() => {
    console.log(params.id);
    axios
      .get("https://tripplanner.up.railway.app/api/v1/blog/single/" + blogId)
      .then((res) => {
        console.log(res);
        setBlog(res.data);
        //console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        {/*Grid row*/}
        <div className="row">
          {/*Grid column*/}
          <div className="col-md-6 mb-4">
            <img
              src={blog.image}
              className="img-fluid"
              alt=""
              style={{ width: "250px", height: "250px" }}
            />
          </div>
          {/*Grid column*/}
          {/*Grid column*/}
          <div className="col-md-6 mb-4">
            {/*Content*/}
            <div className="p-4">
              <a href className="text-reset">
                <h2 className="card-title">{blog.title}</h2>
              </a>
              <div className="mb-3">
                <a href>
                  <span className="badge bg-dark">{blog.city}</span>
                </a>
              </div>

              <p>{blog.description}</p>
              {/* <h4 className="price">{blog.roomCount} Rooms</h4> */}
            </div>
            {/*Content*/}
          </div>
          {/*Grid column*/}
        </div>
        {/*Grid row*/}
        <hr />
        {/*Grid row*/}
        {/* <div className="row d-flex justify-content-center">
          <div className="col-md-6 text-center">
            <AddFeedbackModal
              prodid={productId}
              prodname={product.name}
              prodimage={product.image}
            />
          </div>
        </div> */}
        <br />
        {/* <div className="">
          <h4>Reviews</h4>
          {feedback.map((fb) => (
          <MDBCard className="mb-3 border border-success" >
            <MDBCardBody key={fb.feedbackId} > 
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-row">
                  <div className="">
                    <MDBTypography tag="h6" className="font-italic"><i class="fa fa-share" aria-hidden="true"></i> {fb.userEmail}</MDBTypography>
                    <p className="large mb-0 font-weight-bold"><i class="fa fa-star" aria-hidden="true"></i> {fb.satisfaction_rate}/10</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div style={{ width: "900px" }}>
                    <MDBTypography tag="h6" className="fw-normal mb-0">
                    <i class="fa fa-comments" aria-hidden="true"></i> {fb.message}
                    </MDBTypography>
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
          ))}
        </div> */}
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
}
