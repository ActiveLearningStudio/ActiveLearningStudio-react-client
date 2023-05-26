/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import logo from "assets/images/footerlogo.png";
import "./style.scss";

function Footer() {
  const organization = useSelector((state) => state.organization);
  const { currentOrganization } = organization;
  const [tosUrl, setTosUrl] = useState("");
  const [ppUrl, setPpUrl] = useState("");

  useEffect(() => {
    if (
      currentOrganization?.tos_type === "URL" ||
      currentOrganization?.tos_url != null
    ) {
      setTosUrl(currentOrganization?.tos_url);
    } else {
      setTosUrl(
        `/org/${currentOrganization?.domain}/terms-policy-content/tos_content`,
      );
    }
    if (
      currentOrganization?.privacy_policy_type === "URL" ||
      currentOrganization?.privacy_policy_url != null
    ) {
      setPpUrl(currentOrganization?.privacy_policy_url);
    } else {
      setPpUrl(
        `/org/${currentOrganization?.domain}/terms-policy-content/privacy_policy_content`,
      );
    }
  });

  return (
    <div className="footer-img-section">
      <footer className="footer-all">
        <a
          className="footer-link"
          onClick={() => {
            Swal.fire({
              customClass: "help-redirect-icon",
              text:
                "Curriki Terms of Use will open in a new tab in your browser. Click Open to proceed or Cancel to stay where you are.",
              showCancelButton: true,
              confirmButtonText: "Open",
            }).then((result) => {
              if (result.isConfirmed) {
                window.open(
                  // "https://www.currikistudio.org/org/currikistudio/terms-policy-content/tos_content/",
                  " https://www.curriki.org/terms-of-service/",
                  "_blank",
                );
              } else if (result.isDenied) {
                Swal.close();
              }
            });
          }}
        >
          Terms of Use
        </a>

        <a
          className="footer-link"
          onClick={() => {
            Swal.fire({
              customClass: "help-redirect-icon",
              text:
                "Curriki Privacy Policy will open in a new tab in your browser. Click Open to proceed or Cancel to stay where you are.",
              showCancelButton: true,
              confirmButtonText: "Open",
            }).then((result) => {
              if (result.isConfirmed) {
                window.open(
                  // "https://www.currikistudio.org/org/currikistudio/terms-policy-content/privacy_policy_content/",
                  "https://www.curriki.org/privacy-policy/",
                  "_blank",
                );
              } else if (result.isDenied) {
                Swal.close();
              }
            });
          }}
        >
          Privacy Policy
        </a>

        <a
          className="footer-link"
          onClick={() => {
            Swal.fire({
              customClass: "help-redirect-icon",
              text:
                "Curriki Help Center will open in a new tab in your browser. Click Open to proceed or Cancel to stay where you are.",
              showCancelButton: true,
              confirmButtonText: "Open",
            }).then((result) => {
              if (result.isConfirmed) {
                window.open(
                  "https://www.currikistudio.org/help/",
                  "_blank",
                );
              } else if (result.isDenied) {
                Swal.close();
              }
            });
          }}
        >
          Help Center
        </a>
      </footer>
      <div className="img-">
        <span>Powered by</span>
        <img src={logo} alt="" />
      </div>
    </div>
  );
}

export default Footer;
