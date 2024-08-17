import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import axios from "axios";
import UpdateProfile from "./editProfile/updateProfile";
import Swal from "sweetalert2";

export default function Profile() {
  const [show, setShow] = useState(false);
  const [user] = useState(localStorage.getItem("_id"));
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    axios
      .get("https://tripplanner.up.railway.app/api/v1/users/" + user)
      .then(function (response) {
        setUsername(response.data.data["username"]);
        setEmail(response.data.data["email"]);
        setPhoto(response.data.data["photo"]);
        setRole(response.data.data["role"]);
        setShow(true);
      })
      .catch(function (error) {
        console.log(error);
        alert("invalid");
      });
  });

  function handledelete(id) {
    axios
      .delete("https://tripplanner.up.railway.app/api/v1/users/" + user)
      .then(function (response) {
        Swal.fire({
          title: "Success!",
          text: "Account Deleted Successfully",
          icon: "success",
        }).then(function (response) {
          localStorage.clear();
          window.location = "/home";
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Navbar />
      <div>
        <div className="container p-5 ">
          <div className="row flex-lg-nowrap">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="trow d-flex justify-content-center">
                    <div className="card" style={{ width: "40rem" }}>
                      <div className="card-body">
                        <div className="e-profile">
                          <div className="row">
                            <div className="col-12 col-sm-auto mb-3">
                              <div
                                className="mx-auto"
                                style={{ width: "140px" }}
                              >
                                <div
                                  className="d-flex justify-content-center align-items-center rounded"
                                  style={{
                                    height: "140px",
                                    backgroundColor: "rgb(233, 236, 239)",
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "rgb(166, 168, 170)",
                                      font: "bold 8pt Arial",
                                    }}
                                  >
                                    140x140
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                              <div className="text-center text-sm-left mb-2 mb-sm-0">
                                <h3 className="pt-sm-3 pb-1 mb-0 text-nowrap">
                                  Welcome! {username} @{role}
                                </h3>
                                <h4 className="mb-0">
                                  A Destination For The New Millennium Begins
                                  Here.
                                </h4>
                              </div>
                            </div>
                          </div>
                          <ul className="nav nav-tabs">
                            <li className="nav-item">
                              <div className="active nav-link">
                                User Details
                              </div>
                            </li>
                          </ul>
                          <div className="tab-content pt-3">
                            <div className="tab-pane active">
                              <form className="form" noValidate>
                                <div className="row">
                                  <div className="col- col-sm-12 mb-3">
                                    <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                          <label>Username</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="username"
                                            value={username}
                                            readonly
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col- col-sm-12 mb-3">
                                    <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                          <label>Email</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            value={email}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col d-flex justify-content-end">
                                    <UpdateProfile usid={user} />
                                    <Button
                                      className="btn btn-danger ms-1"
                                      onClick={() => {
                                        handledelete(user);
                                      }}
                                    >
                                      Delete Account
                                    </Button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
}
