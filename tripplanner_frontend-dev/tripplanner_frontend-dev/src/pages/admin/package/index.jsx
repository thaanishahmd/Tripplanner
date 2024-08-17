import React, { useEffect, useState } from "react";
import Sidenav from "../../../components/admin/sidenav";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import UpdUserModal from "../../../components/modals/User/UpdUserModal";
import Swal from "sweetalert2";
import AddTourModal from "../../../components/modals/Tour/addTourModal";
import UpdateTourModal from "../../../components/modals/Tour/updateTourModal";
import requestConfigJson from "../../../context/ConfigJson";

export default function Index() {
  const [tour, setTour] = useState([]);

  useEffect(() => {
    axios
      .get("https://tripplanner.up.railway.app/api/v1/tours")
      .then((res) => {
        setTour(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handledelete(id) {
    axios
      .delete(
        "https://tripplanner.up.railway.app/api/v1/tours/" + id,
        requestConfigJson
      )
      .then(function (response) {
        Swal.fire({
          title: "Success!",
          text: "Tour Package Deleted Successfully",
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
        <h1>Tour Packages</h1>
        <br />
        <AddTourModal />
        <br />
        <br />
        <Table striped>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>City</th>
              <th>Price Per Head</th>
              <th>Max Group Count</th>
              <th>Mode Of Transport</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tour.map((tour) => (
              <tr key={tour._id}>
                <td>
                  <img
                    src={tour.photo}
                    style={{ width: "50px", height: "50px" }}
                    alt="picture"
                    href={tour.photo}
                  />
                </td>
                <td>{tour.title}</td>
                <td>{tour.desc}</td>
                <td>{tour.city}</td>
                <td>{tour.pricePerHead}</td>
                <td>{tour.maxGroupSize}</td>
                <td>{tour.modeOfTransport}</td>
                <td>
                  <UpdateTourModal
                    id={tour._id}
                    title={tour.title}
                    desc={tour.desc}
                    city={tour.city}
                    pricePerHead={tour.pricePerHead}
                    maxGroupSize={tour.maxGroupSize}
                    modeOfTransport={tour.modeOfTransport}
                    photo={tour.photo}
                  />
                  <Button
                    className="btn btn-danger ms-1"
                    onClick={() => {
                      handledelete(tour._id);
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
