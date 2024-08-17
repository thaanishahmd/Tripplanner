/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Sidenav from "../../../components/admin/sidenav";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import AddHotelModal from "../../../components/modals/Hotel/AddHotelModal";
import UpdHotelModal from "../../../components/modals/Hotel/UpdHotelModal";
import requestConfigJson from "../../../context/ConfigJson";

export default function Index() {
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

  function handledelete(id) {
    axios
      .delete(
        "https://tripplanner.up.railway.app/api/v1/hotel/" + id,
        requestConfigJson
      )
      .then(function (response) {
        Swal.fire({
          title: "Success!",
          text: "Hotel Deleted Successfully",
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
      <br />
      <div className="text-center">
        <br />
        <h1>Hotels</h1>
        <br />
        <AddHotelModal />
        <br />
        <br />
        <Table striped>
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Description</th>
              <th>City</th>
              <th>Image</th>
              <th>Room Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hotel.map((ht) => (
              <tr key={ht._id}>
                <td>{ht.name}</td>
                <td>{ht.description}</td>
                <td>{ht.city}</td>
                <td>
                  <img
                    src={ht.image}
                    style={{ width: "50px", height: "50px" }}
                    alt="pic"
                  />
                </td>
                <td>{ht.roomCount}</td>
                <td>
                  <UpdHotelModal hsid={ht._id} />
                  <Button
                    className="btn btn-danger ms-1"
                    onClick={() => {
                      handledelete(ht._id);
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
