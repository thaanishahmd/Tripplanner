import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validate = () => {
    let isValidate = true;
    const regexemail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (!formData.email || !regexemail.test(formData.email)) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    return isValidate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .post("https://tripplanner.up.railway.app/api/v1/auth/login", formData)
        .then((res) => {
          console.log(res.data.data);
          localStorage.setItem("_id", res.data.data._id);
          localStorage.setItem("username", res.data.data.username);
          localStorage.setItem("email", res.data.data.email);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("photo", res.data.data.photo);
          localStorage.setItem("token", res.data.token);
          Swal.fire({
            title: "Success!",
            text: "Login Successful",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            if (res.data.role === "admin") {
              window.location.href = "/admin";
            } else {
              window.location.href = "/home";
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Login Failed!",
            icon: "error",
            text: err.response.data.message,
            confirmButtonText: "Ok",
          });
        });
    }
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmit}>
            Login
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
