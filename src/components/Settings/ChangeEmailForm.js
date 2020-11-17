import React, { useState } from "react";
import ServerResponseModal from "../ServerResponseModal";
import { Label, Input, HelperText } from "@windmill/react-ui";
import withAuthorization from "../Session/withAuthorization";

function ChangeEmailForm(props) {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseModal, setShowServerResponseModal] = useState(false);

  const updateEmail = () => {
    const user = props.firebase.auth.currentUser;

    user
      .updateEmail(`${newEmail}`)
      .then(() => {
        setSuccessMessage("Sucessfully updated your email address.");
        setShowServerResponseModal(true);
        setCurrentEmail("");
        setNewEmail("");
        setIsEditing(false);
      })
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000))
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseModal(true);
      })
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000));
  };

  const checkCurrentEmailInput = (userInput) => {
    if (userInput === authUser.email) {
      return true;
    }
    return false;
  };

  const validateEmailFormat = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };

  return (
    <div>
      {/* ------------- HELPER TEXT ON ACTIVE ------------- */}

      {isEditing ? (
        <Label>
          <span className="font-bold">Change your email</span>
          <Input
            className="mb-1 mt-1"
            placeholder="Please enter your current email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            valid={checkCurrentEmailInput(currentEmail)}
          />
          {checkCurrentEmailInput(currentEmail) ? (
            <HelperText valid={true}>
              Your current email address is correct
            </HelperText>
          ) : (
            <HelperText valid={false}>
              This is not your current email address
            </HelperText>
          )}

          <Input
            className="mb-1 mt-1"
            placeholder="Please enter your new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            valid={validateEmailFormat(newEmail)}
          />
          {validateEmailFormat(newEmail) ? (
            <br />
          ) : (
            <HelperText valid={false}>
              Please provide an email in the following format: john@doe.com
            </HelperText>
          )}
        </Label>
      ) : (
        <>
          {/* ------------- NO HELPER TEXT (INACTIVE) ------------- */}
          <Label>
            <span className="font-bold">Change your email</span>
            <Input
              className="mb-1 mt-1"
              placeholder="Please enter current email"
              onClick={() => setIsEditing(true)}
            />
            <br />
            <Input
              className="mb-1 mt-1"
              placeholder="Please enter your new email"
              onClick={() => setIsEditing(true)}
            />
            <br />
          </Label>
        </>
      )}

      <button
        className="w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
        onClick={updateEmail}
      >
        <span className="mr-2">Apply</span>
      </button>

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

export default withAuthorization(condition)(ChangeEmailForm);
