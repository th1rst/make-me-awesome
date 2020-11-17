import React, { useState } from "react";
import withAuthorization from "../Session/withAuthorization";
import { Label, Input, HelperText } from "@windmill/react-ui";
import ServerResponseModal from "../ServerResponseModal";

function ChangePasswordForm(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseModal, setShowServerResponseModal] = useState(false);

  const changePassword = async () => {
    await props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setSuccessMessage("Sucessfully updated your password.");
        setShowServerResponseModal(true);
      })
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000))
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseModal(true);
      })
      .then(() => setTimeout(() => setShowServerResponseModal(true), 5000));
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

  return (
    <div>
      {/* ------------- HELPER TEXT ON ACTIVE ------------- */}

      {isEditing ? (
        <Label>
          <span className="font-bold">Change your password</span>
          <Input
            type="password"
            className="mb-1 mt-2"
            placeholder="Please set a new password"
            value={passwordOne}
            onChange={(e) => setPasswordOne(e.target.value)}
            valid={!isInvalid}
          />
          {!isInvalid ? (
            <HelperText valid={true}>Passwords match.</HelperText>
          ) : (
            <HelperText valid={false}>Passwords do not match.</HelperText>
          )}

          <Input
            type="password"
            name="passwordTwo"
            className="mb-1 mt-1"
            placeholder="Repeat your new password"
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
            valid={!isInvalid}
          />
        </Label>
      ) : (
        <>
          {/* ------------- NO HELPER TEXT (INACTIVE) ------------- */}
          <Label>
            <span className="font-bold">Change your password</span>
            <Input
              className="mb-1 mt-2"
              placeholder="Please set a new password"
              onClick={() => setIsEditing(true)}
            />
            <br />
            <Input
              className="mb-1 mt-1"
              placeholder="Repeat your new password"
              onClick={() => setIsEditing(true)}
            />
            <br />
          </Label>
        </>
      )}

      <button
        className="w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
        onClick={changePassword}
      >
        <span className="mr-2">Apply</span>
      </button>

      {/* ------------- SERVER RESPONSE MODAL ------------- */}

      {showServerResponseModal ? (
        <ServerResponseModal
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      ) : null}
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ChangePasswordForm);
