/* eslint-disable */
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import EmailCheckForm from "containers/Admin/CreateUser/EmailCheckForm";
import CreateUserForm from "containers/Admin/formik/createuser";
import { removeActiveAdminForm } from "store/actions/admin";
import "./style.scss";

const CreateUser = (props) => {
  const { mode } = props;
  const dispatch = useDispatch();
  const [step, setStep] = useState("emailCheck");
  const [checkedEmail, setCheckedEmail] = useState(null);
  const [existingUser, setExistingUser] = useState(false);
  const handleEmailChecked = (result, email) => {
    alert(result);
    if (result === "new-user") {
      setCheckedEmail(email);
      setStep("createUser");
      return;
    }
    if (result === "existing-user") {
      setCheckedEmail(email);
      setExistingUser(true);
      setStep("createUser");
      return;
    }

    if (result === "added-to-org") setStep("done");
  };

  return (
    <>
      {mode === "create_user" && step === "emailCheck" && (
        <Modal
          className="create-user-modal"
          show
          onHide={() => dispatch(removeActiveAdminForm())}
        >
          <Modal.Header
            className="create-user-modal-header"
            closeButton
          >
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EmailCheckForm handleEmailChecked={handleEmailChecked} />
          </Modal.Body>
        </Modal>
      )}
      {mode === "create_user" &&
        step === "createUser" &&
        checkedEmail && (
          <div className="form-new-popup-admin">
            <div className="inner-form-content">
              <CreateUserForm
                checkedEmail={checkedEmail}
                existingUser={existingUser}
              />
            </div>
          </div>
        )}
      {mode === "create_user" && step === "done" && (
        <Modal
          className="create-user-done"
          show
          onHide={() => dispatch(removeActiveAdminForm())}
        >
          <Modal.Header closeButton />
          <Modal.Body className="text-center">
            <FontAwesomeIcon icon="check-circle" className="mr-2" />
            <h1>User added successfully</h1>
            <Button
              variant="primary"
              onClick={() => dispatch(removeActiveAdminForm())}
            >
              Close
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

CreateUser.propTypes = {
  mode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentOrg: state.organization.currentOrganization,
});

export default withRouter(connect(mapStateToProps)(CreateUser));
