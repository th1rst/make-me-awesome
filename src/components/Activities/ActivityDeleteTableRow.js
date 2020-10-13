import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import ServerResponseModal from "../ServerResponseModal";

class ActivityDeleteTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      errorMessage: "",
      successMessage: "",
      showServerResponseModal: false,
      showWarningModal: false,
    };
    this.handleShowWarningModal = this.handleShowWarningModal.bind(this);
  }

  handleShowWarningModal() {
    this.setState({ showWarningModal: !this.state.showWarningModal });
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
      <div>
        {this.state.showWarningModal ? (
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={this.handleShowWarningModal}
          >
            <div className="relative z-50 md:w-1/3 sm:w-full rounded-lg shadow-lg bg-white border-2 border-red-300">
              <div className="flex justify-between border-b border-gray-100 px-5 py-4">
                <div className="inline-flex">
                  <FaExclamationTriangle className="mt-1 text-orange-500" />
                  <span className="ml-1 font-bold text-gray-700 text-lg">
                    Warning
                  </span>
                </div>
                <div>
                  <button onClick={this.handleShowWarningModal}>
                    <AiFillCloseCircle className="text-red-500 hover:text-red-600 transition duration-150" />
                  </button>
                </div>
              </div>

              <div className="px-10 py-5 text-gray-600">
                Are you sure you want to delete the selected activity?
              </div>

              <div className="px-5 py-4 flex justify-end">
                <button
                  type="button"
                  className="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150"
                  onClick={this.handleShowWarningModal}
                >
                  Don't delete
                </button>

                <button
                  className="bg-red-500 mr-1 rounded text-sm py-2 px-3 text-white hover:bg-red-600 transition duration-150"
                  type="button"
                  onClick={this.deleteActivity}
                >
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex flex-row align-items">
          <p className="italic">{this.props.activityId}</p>
          <button type="button" onClick={() => this.handleShowWarningModal()}>
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
      </div>
    );
  }
}

export default withFirebase(ActivityDeleteTableRow);
