import React, { Component } from "react";
import withAuthorization from "../Session/withAuthorization";
import { Label, Input } from "@windmill/react-ui";
import ServerResponseModal from "../ServerResponseModal";

class ChangeProfilePicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      photoUrlInput: "",
      showServerResponseModal: false,
      errorMessage: "",
      successMessage: "",
    };
    this.updatePhoto = this.updatePhoto.bind(this);
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
            showServerResponseModal: true,
          });
        })
        .then(() =>
          setTimeout(
            function () {
              this.setState({ showServerResponseModal: false });
            }.bind(this),
            5000
          )
        )
        .catch((error) => {
          this.setState({
            errorMessage: error.message,
            showServerResponseModal: true,
          });
        })
        .then(() =>
          setTimeout(
            function () {
              this.setState({ showServerResponseModal: false });
            }.bind(this),
            5000
          )
        );
    }
  }

  render() {
    return (
      <div>
        <Label className="my-5">
          <span className="font-bold">Update your Profile Picture</span>
          <Input
            name="photoUrlInput"
            className="mb-5 mt-1"
            placeholder="Paste photo URL here"
            onChange={this.handleInput}
          />
        </Label>

        <button
          className="w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
          onClick={this.updatePhoto}
        >
          <span className="mr-2">Apply</span>
        </button>

        {this.state.showServerResponseModal ? (
          <ServerResponseModal
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

export default withAuthorization(condition)(ChangeProfilePicForm);
