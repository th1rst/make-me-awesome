import React, { Component } from "react";
import withAuthorization from "../Session/withAuthorization";
import { Label, Input } from "@windmill/react-ui";
import ServerResponseModal from "../ServerResponseModal";

class BannerPictureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      bannerUrlInput: "",
      showServerResponseModal: false,
      errorMessage: "",
      successMessage: "",
    };
    this.updateBanner = this.updateBanner.bind(this);
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateBanner() {
    const userID = this.state.authUser.uid;
    // --- SEND DATA TO FIRESTORE ---
    this.props.firebase.db
      .collection("users")
      .doc(`${userID}`)
      .update({
        bannerURL: this.state.bannerUrlInput,
      })
      .then(() => {
        this.setState({
          successMessage: "Sucessfully updated your banner picture! It may take a while for changes to be in effect.",
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
      });
  }

  render() {
    return (
      <div>
        <Label className="my-5">
          <span className="font-bold">Update your Banner Picture</span>
          <Input
            name="bannerUrlInput"
            className="mb-5 mt-1"
            placeholder="Paste photo URL here"
            onChange={this.handleInput}
          />
        </Label>

        <button
          className="w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
          onClick={this.updateBanner}
        >
          <span className="mr-2">Apply</span>
        </button>

        {this.state.showServerResponseModal ? (
          <ServerResponseModal
            errorMessage={this.state.errorMessage}
            successMessage={this.state.successMessage}
          />
        ) : null}
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(BannerPictureForm);
