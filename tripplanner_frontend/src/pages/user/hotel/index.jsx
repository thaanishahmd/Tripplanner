/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Sidenav from "../../../components/admin/sidenav";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const hotel = () => {
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    axios
      .get("https://tripplanner.up.railway.app/api/v1/hotel")
      .then((res) => {
        setHotel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <div className="container mx-6 my-5">
          <nav
            className="navbar navbar-expand-lg navbar-dark mt-3 mb-5 shadow p-2"
            style={{ backgroundColor: "#689368" }}
          >
            <div className="container-fluid">
              <a className="navbar-brand" href="?">
                Hotels
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent2"
                aria-controls="navbarSupportedContent2"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fas fa-bars" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent2"
              ></div>
            </div>
          </nav>
          <section>
            <div className="text-center">
              <div className="row">
                {hotel.map((ht) => (
                  <div key={ht._id} className="col-lg-3 col-md-6 mb-4">
                    <div className="card">
                      <div
                        className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                        data-mdb-ripple-color="light"
                      >
                        <img alt="" src={ht.image} className="w-100" />
                        <a href={"hotelsingle/" + ht._id}>
                          {/* <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span className="badge bg-dark ms-2">NEW</span>
                            </h5>
                          </div>
                        </div> */}
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.15)",
                              }}
                            />
                          </div>
                        </a>
                      </div>
                      <div className="card-body">
                        <a href className="text-reset">
                          <h5 className="card-title mb-2">
                            <strong>{ht.name}</strong>
                          </h5>
                        </a>
                        <a href className="text-reset ">
                          <p>{ht.city}</p>
                        </a>
                        <h6 className="mb-3 price">Click Here For More Info</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <nav
            aria-label="Page navigation example"
            className="d-flex justify-content-center mt-3"
          >
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="?" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="?">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="?">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="?">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="?">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="?">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="?" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default hotel;
