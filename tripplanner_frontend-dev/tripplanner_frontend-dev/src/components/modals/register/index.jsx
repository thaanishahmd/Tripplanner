import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { LoadingOverlay } from "@mantine/core";

export default function Register() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
    role: "user",
  });

  const validate = () => {
    let isValidate = true;
    const regexname = /^[a-zA-Z ]*$/;
    const regexemail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (!formData.username || !regexname.test(formData.username)) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid name.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (!formData.email || !regexemail.test(formData.email)) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (!formData.password || !regexpassword.test(formData.password)) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid password. Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.",
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
        .post(
          "https://tripplanner.up.railway.app/api/v1/auth/register",
          formData
        )
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Success!",
            text: "Registration Successful",
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Registration Failed!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
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
      await setFormData({ ...formData, photo: res.data.url });
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="light" onClick={handleShow}>
        Register
      </Button>

      <Modal size="m" show={show} onHide={handleClose}>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label for="inputEmail4">Upload Profile Picture</label>
                <Form.Group controlId="formFile">
                  <Form.Control onChange={handleImageChange} type="file" />
                </Form.Group>
              </div>
              <div className="form-group col-md-12">
                <label for="inputEmail4">Enter Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                ></input>
              </div>
              <div className="form-group col-md-12">
                <label for="inputEmail4">Enter Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                ></input>
              </div>
              <div className="form-group col-md-12">
                <label for="inputPassword4">Enter Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                ></input>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmit}>
            Register
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
