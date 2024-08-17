import React from "react";
import Sidenav from "../../../components/admin/sidenav";
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";

export default function Dashboard() {
  return (
    <div>
      <Sidenav />
      <div className="container p-5 ">
        <div className="row flex-lg-nowrap">
          <div className="col">
            <div className="row">
              <div className="col mb-3">
                <div className="trow d-flex justify-content-center">
                  <div
                    className="card"
                    style={{ width: "40rem", height: "40rem" }}
                  >
                    <div className="card-body">
                      <br/>
                      <br/>
                      <br/>
                      <AnimateKeyframes
                        play
                        iterationCount="infinite"
                        keyframes={["opacity: 0", "opacity: 1"]}
                      >
                        <h1>Welcome</h1>
                      </AnimateKeyframes>
                      <br />
                      <br />

                      <AnimateKeyframes
                        play
                        iterationCount="infinite"
                        keyframes={["opacity: 0", "opacity: 1"]}
                      >
                        <h1>To</h1>
                      </AnimateKeyframes>
                      <br />
                      <br />
                      <AnimateKeyframes
                        play
                        iterationCount="infinite"
                        keyframes={["opacity: 0", "opacity: 1"]}
                      >
                        <h1>Admin</h1>
                      </AnimateKeyframes>
                      <br />
                      <br />
                      <AnimateKeyframes
                        play
                        iterationCount="infinite"
                        keyframes={["opacity: 0", "opacity: 1"]}
                      >
                        <h1>Dashboard</h1>
                      </AnimateKeyframes>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
