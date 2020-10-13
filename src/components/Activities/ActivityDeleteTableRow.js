import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { FaTrash } from "react-icons/fa";
import ServerResponseModal from "../ServerResponseModal";

class ActivityDeleteTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      errorMessage: "",
      successMessage: "",
      showServerResponseModal: false,
    };
  }

  deleteActivity = async () => {
    await this.props.firebase.db
      .collection("users")
      .doc(`${this.state.authUser.uid}`)
      .collection("activities")
      .doc(`${this.props.activityId}`)
      .delete()
      .then(() => {
        this.setState({
          successMessage: "Activity successfully deleted.",
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
  };

  render() {
    return (
      <>
        <div className="flex flex-row align-items">
          <p className="italic">{this.props.activityId}</p>
          <button type="button" onClick={this.deleteActivity}>
            <span className="text-red-100 hover:text-red-500 inline-flex">
              <FaTrash className="ml-4" />
              <p className="ml-1"> delete</p>
            </span>
          </button>
        </div>

        {this.state.showServerResponseModal ? (
          <ServerResponseModal
            errorMessage={this.state.errorMessage}
            successMessage={this.state.successMessage}
          />
        ) : null}
      </>
    );
  }
}

export default withFirebase(ActivityDeleteTableRow);
