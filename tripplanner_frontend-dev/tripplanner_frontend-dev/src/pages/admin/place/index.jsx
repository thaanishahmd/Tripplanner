/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Sidenav from "../../../components/admin/sidenav";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import AddPlaceModal from "../../../components/modals/Place/addPlaceModal";
import UpdatePlaceModal from "../../../components/modals/Place/updatePlaceModal";
import requestConfigJson from "../../../context/ConfigJson";

export default function Index() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios
      .get("https://tripplanner.up.railway.app/api/v1/blog")
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handledelete(id) {
    axios
      .delete(
        "https://tripplanner.up.railway.app/api/v1/blog/" + id,
        requestConfigJson
      )
      .then(function (response) {
        Swal.fire({
          title: "Success!",
          text: "Blog Deleted Successfully",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Sidenav />
      <br />
      <div className="text-center">
        <br />
        <h1>Culture and Heritage Tour Places</h1>
        <br />
        <AddPlaceModal />
        <br />
        <br />
        <Table striped>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blog.map((blog) => (
              <tr key={blog._id}>
                <td>
                  <img
                    src={blog.image}
                    style={{ width: "50px", height: "50px" }}
                    alt="picture"
                    href={blog.image}
                  />
                </td>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>{blog.city}</td>

                <td>
                  <UpdatePlaceModal
                    id={blog._id}
                    title={blog.title}
                    description={blog.description}
                    city={blog.city}
                    photo={blog.image}
                  />
                  <Button
                    className="btn btn-danger ms-1"
                    onClick={() => {
                      handledelete(blog._id);
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
    </div>
  );
}
