import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { AiFillCloseCircle } from "react-icons/ai";
import { GiStrong } from "react-icons/gi";
import ServerResponseModal from "../ServerResponseModal";

class QuickActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      addActivityModal: false,
      date: new Date(),
      errorMessage: "",
      successMessage: "",
      showServerResponseModal: false,
    };
    this.handleAddActivityModal = this.handleAddActivityModal.bind(this);
  }

  handleAddActivityModal() {
    this.setState({ addActivityModal: !this.state.addActivityModal });
  }

  sendActivity = () => {
    // --- PREPARE AND FORMAT DATA ---
    const userID = this.state.authUser.uid;
    const name = this.props.name;
    const date = this.state.date.toLocaleDateString("en-US");
    const duration = this.props.duration;
    const category = this.props.category;
    const productiveness = this.props.productiveness;
    const notes = " ";

    // --- SEND DATA TO FIRESTORE ---
    this.props.firebase.db
      .collection("users")
      .doc(`${userID}`)
      .collection("activities")
      .add({
        name: name,
        date: date,
        duration: duration,
        category: category,
        productiveness: productiveness,
        notes: notes,
      })
      .then(() => {
        this.setState({
          successMessage: "Sucessfully saved activity!",
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
    const { name, category, picture, duration, productiveness } = this.props;

    return (
      <div className="flex flex-col items-center justify-evenly">
        <div className="w-64 h-full flex justify-center items-center mx-12 my-4">
          <div className="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white">
            <div className="relative mb-6">
              <img
                className="h-64 w-64 object-cover"
                src={`${picture}`}
                alt="user specified activity"
              />
              <div
                className="text-center absolute w-full"
                style={{ bottom: "-30px" }}
              >
                <div className="mb-12">
                  <p className="text-white tracking-wide uppercase text-2xl font-bold">
                    {name}
                  </p>
                  <p className="text-gray-400 text-md">{productiveness}</p>
                </div>
                <button
                  className="bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700 p-4 shadow-xl rounded-full focus:outline-none"
                  onClick={this.handleAddActivityModal}
                >
                  <svg
                    viewBox="0 0 20 20"
                    enableBackground="new 0 0 20 20"
                    className="w-6 h-6"
                  >
                    <path
                      fill="#FFFFFF"
                      d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                     C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                     C15.952,9,16,9.447,16,10z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="py-10 px-6 text-center tracking-wide grid grid-cols-2 gap-6">
              <div className="posts">
                <p className="text-gray-400 text-sm">Duration</p>
                <p className="text-md">{duration}</p>
              </div>
              <div className="followers">
                <p className="text-gray-400 text-sm">Category</p>
                <p className="text-md">{category}</p>
              </div>
            </div>
          </div>
        </div>

        {this.state.addActivityModal ? (
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={this.handleAddActivityModal}
          >
            <div className="relative z-50 md:w-1/3 sm:w-full rounded-lg shadow-lg bg-white border-2 border-green-200">
              <div className="flex justify-between border-b border-gray-100 px-5 py-4">
                <div className="inline-flex">
                  <GiStrong className="mt-1 mr-1 text-lg text-green-500" />
                  <span className="ml-1 font-bold text-gray-700 text-lg">
                    Quick Activity
                  </span>
                </div>
                <div>
                  <button onClick={this.handleAddActivityModal}>
                    <AiFillCloseCircle className="text-red-500 hover:text-red-600 transition duration-150" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-evenly align-items px-10 py-5">
                <div className="mb-4">
                  <h3 className="text-center text-gray-600">
                    Are you sure you want to add the following activity:
                  </h3>
                </div>

                <div>
                  <div className="flex flex-row flex-wrap justify-evenly mx-4">
                    <div>
                      <div className="text-center">
                        <p className="font-bold">Name:</p>
                        <p className="mb-4">{name}</p>
                      </div>

                      <div className="text-center">
                        <p className="font-bold">Productivity:</p>
                        <p className="mb-4">{productiveness}</p>
                      </div>
                    </div>

                    <div>
                      <div className="text-center">
                        <p className="font-bold">Duration:</p>
                        <p className="mb-4">{duration}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">Category:</p>
                        <p className="mb-4">{category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 flex justify-end">
                <button
                  type="button"
                  className="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150"
                  onClick={this.handleAddActivityModal}
                >
                  No, close
                </button>

                <button
                  className="bg-green-500 mr-1 rounded text-sm py-2 px-3 text-white hover:bg-green-600 transition duration-150"
                  type="button"
                  onClick={this.sendActivity}
                >
                  Yes, make me awesome!
                </button>
              </div>
            </div>
          </div>
        ) : null}
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

export default withFirebase(QuickActivity);
