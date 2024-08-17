/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Sidenav from "../../../components/admin/sidenav";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import UpdUserModal from "../../../components/modals/User/UpdUserModal";
import Swal from "sweetalert2";

export default function index() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`https://tripplanner.up.railway.app/api/v1/users/`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handledelete(id) {
    axios
      .delete("https://tripplanner.up.railway.app/api/v1/users/" + id)
      .then(function (response) {
        Swal.fire({
          title: "Success!",
          text: "User Deleted Successfully",
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
      <Sidenav />
      <div className="text-center">
        <br />
        <h1>Users</h1>
        <br />
        <br />
        <Table striped>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Image</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((us) => (
              <tr key={us._id}>
                <td>{us.username}</td>
                <td>{us.email}</td>
                <td>
                  <img
                    src={us.photo}
                    style={{ width: "50px", height: "50px" }}
                    alt="pic"
                  />
                </td>
                <td>{us.role}</td>
                <td>
                  <UpdUserModal usid={us._id} />
                  <Button
                    className="btn btn-danger ms-1"
                    onClick={() => {
                      handledelete(us._id);
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
