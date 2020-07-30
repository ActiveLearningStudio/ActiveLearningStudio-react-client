import React, { useState, useEffect } from "react";
import logo from "../images/logo.svg";
import dotsloader from "../images/dotsloader.gif";
import { Link } from "react-router-dom";
import { registration_confirm, hubspotconformation } from "../actions/auth";
import Swal from "sweetalert2";
export default function Confirm(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = registration_confirm(props.match.params.confirmationid);
    result
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.status == "success") {
          const result_hub = hubspotconformation(
            res.data.data.email,
            res.data.data.name,
            res.data.dataschool_district_organization,
            res.data.data.phone
          );
          result_hub.then((res) => {
            console.log(res);
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          icon: "warning",
        }).then(() => {
          props.history.push("/");
        });
      });
  }, []);

  return (
    <div className="newlogin confirm-page">
      <img className="headerlogologin" src={logo} alt="" />

      <div className="login-container">
        <div className="login-left">
          {loading ? (
            <img className="loader" src={dotsloader} alt="" />
          ) : (
            <>
              <h2>Thanks for joining. Your Email has been Confirmed!</h2>
              <h3>
                Please check your mail. We just sent you a CurrikiStudio
                password.
              </h3>
              <Link to="/login">
                Please click here when you are ready to Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
