import React, { useState, useEffect } from "react";
import logo from "../images/logo.svg";
import dotsloader from "../images/dotsloader.gif";
import { Link } from "react-router-dom";
import { registration_confirm } from "../actions/auth";
import Swal from "sweetalert2";
export default function Confirm(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const result = registration_confirm(props.match.params.confirmationid);
    if (!!result == "") {
      setLoading(true);
    } else {
      Swal.fire({
        text: "Invalid Confirmation Code",
        icon: "warning",
      }).then(() => {
        props.history.push("/");
      });
    }
  });
  return (
    <div className="newlogin confirm-page">
      <img className="headerlogologin" src={logo} alt="" />

      <div className="login-container">
        <div className="login-left">
          {loading ? (
            <img className="loader" src={dotsloader} alt="" />
          ) : (
            <>
              <h1>Welcome to CurrikiStudio</h1>
              <h2>
                Thanks for joining CurrikiStudio. Your Email has been Confirmed.
              </h2>
              <h3>
                CurrikiStudio is changing the way learning experiences are
                designed, created, and delivered to a new generation of
                learners.
              </h3>

              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
