import React, { Component } from "react";
import withAuthorization from "../Session/withAuthorization";
import { Label, Input, HelperText } from "@windmill/react-ui";
import ServerResponseModal from "../ServerResponseModal";

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      passwordOne: "",
      passwordTwo: "",
      showServerResponseModal: false,
      errorMessage: "",
      successMessage: "",
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  changePassword = async () => {
    await this.props.firebase
      .doPasswordUpdate(this.state.passwordOne)
      .then(() => {
        this.setState({
          successMessage: "Sucessfully updated your password.",
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
  };

  render() {
    const isInvalid =
      this.state.passwordOne !== this.state.passwordTwo ||
      this.state.passwordOne === "";

    return (
      <div>
        <Label>
          <span className="font-bold">Change your password</span>
          <Input
            type="password"
            name="passwordOne"
            className="mb-1 mt-1"
            placeholder="Please set a new password"
            value={this.state.passwordOne}
            onChange={this.handleInput}
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
            value={this.state.passwordTwo}
            onChange={this.handleInput}
            valid={!isInvalid}
          />
        </Label>
        <button
          className="w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
          onClick={this.changePassword}
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

export default withAuthorization(condition)(ChangePasswordForm);
