import React from "react";
const Footer = () => {
  return (
    <div>
      <footer
        className="text-center text-white mt-4"
        style={{ backgroundColor: "#689368" }}
      >
        <hr className="text-dark" />
        <div className="container ">
          <section className="mb-3">
            <a
              className="btn-link btn-floating btn-lg text-white"
              href="https://web.facebook.com"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              className="btn-link btn-floating btn-lg text-white"
              href="https://www.twitter.com"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              className="btn-link btn-floating btn-lg text-white"
              href="https://www.google.com"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-google" />
            </a>
            <a
              className="btn-link btn-floating btn-lg text-white"
              href="https://www.instagram.com"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              className="btn-link btn-floating btn-lg text-white"
              href="https://www.linkedin.com"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-youtube" />
            </a>
            <a
              className="btn-link btn-floating btn-lg text-white"
              href="https://www.github.com"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-github" />
            </a>
          </section>
        </div>
        <div
          className="text-center p-3"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            textColor: "#E0E0E0",
          }}
        >
          <div className="text-white">© 2023 Copyright:Traveloo</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
