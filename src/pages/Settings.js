import React, { Component } from "react";
import withAuthorization from "../components/Session/withAuthorization";
import Navigation from "../components/Navigation";
import { Label, Input, Button, HelperText } from "@windmill/react-ui";
import SettingsModal from "../components/Settings/SettingsModal";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      photoUrlInput: "",
      newEmailInput: "",
      currentEmailInput: "",
      showModal: false,
      hasPhotoChanges: false,
      hasEmailChanges: false,
      errorMessage: "",
      successMessage: "",
    };

    this.updatePhoto = this.updatePhoto.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updatePhoto() {
    if (this.state.photoUrlInput !== "") {
      var user = this.props.firebase.auth.currentUser;

      user
        .updateProfile({
          photoURL: this.state.photoUrlInput,
        })
        .then(() => {
          this.setState({
            successMessage:
              "Sucessfully updated profile picture. It may take a while for changes to be in effect.",
            showModal: true,
          });
        })
        .catch((error) => {
          this.setState({ hasError: true, errorMessage: error });
        });
    }
  }

  updateEmail() {
    var user = this.props.firebase.auth.currentUser;

    user
      .updateEmail(`${this.state.newEmailInput}`)
      .then(() => {
        this.setState({
          successMessage: "Sucessfully updated your email address.",
          showModal: true,
          currentEmailInput: "",
          newEmailInput: "",
          isEditingEmail: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errorMessage: error.message,
          showModal: true,
        });
      });
  }

  checkCurrentEmailInput(userInput) {
    if (userInput === this.state.authUser.email) {
      return true;
    }
    return false;
  }

  validateEmailFormat(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  render() {
    return (
      <div>
        <Navigation />
        <h1 className="mt-3 text-4xl md:text-3xl underline font-semibold uppercase text-center">
          Settings
        </h1>

        <Label className="my-5">
          <span className="font-bold">Update your Profile Picture</span>
          <Input
            name="photoUrlInput"
            className="mb-5 mt-1"
            placeholder="Paste photo URL here"
            onChange={this.handleInput}
          />
        </Label>

        <Button
          className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          onClick={this.updatePhoto}
        >
          Apply
        </Button>

        {this.state.isEditingEmail ? (
          <Label>
            <span className="font-bold">Change your email</span>
            <Input
              name="currentEmailInput"
              className="mb-1 mt-1"
              placeholder="Please enter current email"
              value={this.state.currentEmailInput}
              onChange={this.handleInput}
              valid={this.checkCurrentEmailInput(this.state.currentEmailInput)}
            />
            {this.checkCurrentEmailInput(this.state.currentEmailInput) ? (
              <HelperText valid={true}>
                Your current email address is correct
              </HelperText>
            ) : (
              <HelperText valid={false}>
                This is not your current email address
              </HelperText>
            )}

            <Input
              name="newEmailInput"
              className="mb-1 mt-1"
              placeholder="Please enter your new email"
              value={this.state.newEmailInput}
              onChange={this.handleInput}
              valid={this.validateEmailFormat(this.state.newEmailInput)}
            />
            {this.validateEmailFormat(this.state.newEmailInput) ? (
              <br />
            ) : (
              <HelperText valid={false}>
                Please provide an email in the following format: john@doe.com
              </HelperText>
            )}
          </Label>
        ) : (
          <Label>
            <span className="font-bold">Change your email</span>
            <Input
              className="mb-1 mt-1"
              placeholder="Please enter current email"
              onClick={() => this.setState({ isEditingEmail: true })}
            />
            <br />
            <Input
              className="mb-1 mt-1"
              placeholder="Please enter your new email"
              onClick={() => this.setState({ isEditingEmail: true })}
            />
            <br />
          </Label>
        )}

        <Button
          className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          onClick={this.updateEmail}
        >
          Apply
        </Button>

        {this.state.showModal ? (
          <SettingsModal
            error={this.state.hasError}
            errorMessage={this.state.errorMessage}
            successMessage={this.state.successMessage}
          />
        ) : null}
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Settings);