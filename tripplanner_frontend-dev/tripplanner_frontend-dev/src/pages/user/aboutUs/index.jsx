import React from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const index = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <br />

        <h1 className="fst-itali text-start">
          <strong>WHO WE ARE</strong>
        </h1>
        <br />
        <h1 class>Welcome to Traveloo</h1>
        <section>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 d-flex justify-content-center">
              <div
                className=" bg-image hover-overlay ripple shadow-2-strong rounded-6 "
                data-mdb-ripple-color="light"
              >
                <img
                  src="https://images.unsplash.com/photo-1619120238346-978e07731e77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="img-fluid "
                />
              </div>
            </div>
            <div className="col-md-15 gx-5 mb-4 text-justify">
              <br />
            <h2> <strong>"Travel is the main thing you purchase that
                makes you more extravagant"</strong></h2>
              <h5>
                We at ‘Traveloo’, swear
                by this and put stock in satisfying travel dreams that make you
                perpetually rich constantly. We have been moving excellent
                encounters for a considerable length of time through our
                cutting-edge planned occasion bundles and other fundamental
                travel administrations. We rouse our clients to carry on with a
                rich life, brimming with extraordinary travel encounters.
                Through our exceptionally curated occasion bundles, we need to
                take you on an adventure where you personally enjoy the stunning
                magnificence of America and far-off terrains. We need you to
                observe sensational scenes that are a long way past your
                creative ability. The powerful inclination of American voyagers
                to travel more nowadays is something that keeps us inspired to
                satisfy our vacation necessities. Our vision to give you a
                consistent occasion encounter makes us one of the main visit
                administrators in the regularly extending travel industry. To
                guarantee that you have a satisfying occasion and healthy
                encounters, all our vacation administrations are available to
                your no matter what. On your universal occasion, we guarantee
                that you are very much outfitted with outside trade (Forex
                Cards, Currency Notes), visa, and travel protectio
              </h5>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default index;
