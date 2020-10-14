import React, { Component } from "react";
import withAuthorization from "../Session/withAuthorization";
import { Label, Select, Input } from "@windmill/react-ui";
import { FaTrash } from "react-icons/fa";
import ServerResponseModal from "../ServerResponseModal";
import LoadingSpinner from "../LoadingSpinner";

const defaultCategories = ["Work", "Leisure Time", "Workout"];
const defaultProductivityTypes = [
  "Productive",
  "Neutral / Necessary",
  "Unproductive",
];

class QuickActivitySettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      showServerResponseModal: false,
      activityName: "",
      date: new Date(),
      errorMessage: "",
      successMessage: "",
      productivityType: defaultProductivityTypes[0],
      categoryName: defaultCategories[0],
      activityPictureURL: "",
    };
  }

  componentDidMount() {
    this.getUserData();
    this.getQuickActivities();
  }

  getUserData = async () => {
    await this.props.firebase.db
      .collection("users")
      .doc(`${this.state.authUser.uid}`)
      .get()
      .then((response) => {
        this.setState({
          username: response.data().name,
          loading: false,
        });
      });
  };

  getQuickActivities = async () => {
    const response = await this.props.firebase.db
      .collection("users")
      .doc(`${this.state.authUser.uid}`)
      .collection("quickActivities")
      .get()
      .then(function (querySnapshot) {
        const quickActivityData = [];

        querySnapshot.forEach(function (doc) {
          quickActivityData.push({
            id: doc.id,
            name: doc.data().name,
            date: doc.data().date,
            duration: doc.data().duration,
            productiveness: doc.data().productiveness,
            category: doc.data().category,
            activityPictureURL: doc.data().activityPictureURL,
          });
        });
        return quickActivityData;
      });
    this.setState({ quickActivities: response });
  };

  applyQuickActivity = () => {
    // --- PREPARE AND FORMAT DATA ---
    const defaultPictureUrl =
      "https://images.unsplash.com/photo-1535981767287-35259dbf7d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80";

    const userID = this.state.authUser.uid;
    const name = this.state.activityName;
    const date = this.state.date.toLocaleDateString("en-US");
    const productiveness = this.state.productivityType;
    const category = this.state.categoryName;
    const duration = this.state.activityDuration;
    const notes = " ";
    const activityPictureURL =
      this.state.activityPictureURL !== ""
        ? this.state.activityPictureURL
        : defaultPictureUrl;

    // --- SEND DATA TO FIRESTORE ---
    this.props.firebase.db
      .collection("users")
      .doc(`${userID}`)
      .collection("quickActivities")
      .add({
        name: name,
        date: date,
        duration: duration,
        category: category,
        productiveness: productiveness,
        notes: notes,
        activityPictureURL: activityPictureURL,
      })
      .then(() => {
        this.setState({
          successMessage: "Sucessfully saved QuickActivity!",
          showServerResponseModal: true,
          activityName: "",
          categoryName: defaultCategories[0],
          activityPictureURL: "",
          activityDuration: "",
        });
      })
      .then(() => {
        this.getQuickActivities();
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

  deleteQuickActivity = async (id) => {
    await this.props.firebase.db
      .collection("users")
      .doc(`${this.state.authUser.uid}`)
      .collection("quickActivities")
      .doc(`${id}`)
      .delete()
      .then(() => {
        this.setState({
          successMessage: "Activity successfully deleted.",
          showServerResponseModal: true,
        });
      })
      .then(() => {
        this.getQuickActivities();
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

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validateNumbersOnly(input) {
    const regexp = /^[0-9\b]+$/;
    return regexp.test(input);
  }

  render() {
    const isInvalid =
      this.state.activityName === "" || this.state.activityDuration === "";
    return (
      <>
        {!this.state.quickActivities ? (
          <LoadingSpinner />
        ) : (
          <div>
            {this.state.quickActivities.length === 0 ? (
              <p className="font-bold text-lg text-center">
                You have not set up QuickActivities yet.
              </p>
            ) : (
              <div>
                <h1 className="my-2 text-lg font-bold uppercase text-center">
                  Current QuickActivities:
                </h1>
                <div className="w-full h-auto border border-blue-100 rounded-lg">
                  <div className="flex flex-row flex-wrap justify-around">
                    {this.state.quickActivities.map((quickActivity) => (
                      <div className="flex flex-col w-auto mb-4">
                        <div className="w-64 h-auto flex justify-center items-center mx-4 my-2">
                          <div className="container mx-auto w-48 h-48 rounded-lg overflow-hidden shadow-lg my-2 bg-white hover:shadow-xl hover:border-gray-300">
                            <div className="relative mb-6">
                              <img
                                className="h-64 w-64 object-cover"
                                src={`${quickActivity.activityPictureURL}`}
                                alt="user specified activity"
                              />
                              <div
                                className="text-center absolute w-full"
                                style={{ bottom: "-30px" }}
                              >
                                <div className="mb-12">
                                  <p className="text-white tracking-wide uppercase text-2xl font-bold">
                                    {quickActivity.name}
                                  </p>
                                  <p className="text-gray-400 text-md">
                                    {quickActivity.productiveness}
                                  </p>
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
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            this.deleteQuickActivity(quickActivity.id)
                          }
                        >
                          <span className="text-red-100 hover:text-red-500 inline-flex">
                            <FaTrash />
                            <p className="ml-1"> delete</p>
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <h1 className="mt-8 mb-2 text-xl font-bold text-center">
              Add QuickActivities
            </h1>
            <div className="w-full h-auto border border-blue-100 rounded-lg">
              <div className="mx-auto">
                <div className="relative p-6 flex-auto">
                  <Label>
                    <span className="font-bold">Name</span>
                    <Input
                      name="activityName"
                      className="mb-5 mt-1"
                      placeholder="Please name your Activity"
                      value={this.state.activityName}
                      onChange={this.handleInput}
                      valid={!isInvalid}
                    />
                  </Label>

                  <Label>
                    <span className="font-bold">Category</span>
                    <Select
                      name="categoryName"
                      className="mb-5 mt-1"
                      onChange={this.handleInput}
                    >
                      {defaultCategories.map((entry) => (
                        <option value={entry} key={entry}>
                          {entry}
                        </option>
                      ))}
                    </Select>
                  </Label>

                  <Label>
                    <span className="font-bold">Duration (minutes)</span>
                    <Input
                      name="activityDuration"
                      className="mb-5 mt-1"
                      placeholder={`How long do you usually do ${
                        this.state.activityName
                          ? this.state.activityName
                          : "(Name)"
                      } for (in minutes)?`}
                      value={this.state.activityDuration}
                      onChange={this.handleInput}
                      valid={this.validateNumbersOnly(
                        this.state.activityDuration
                      )}
                    />
                  </Label>

                  <Label>
                    <span className="font-bold">Productivity</span>
                    <Select
                      name="productivityType"
                      className="mb-5 mt-1"
                      onChange={this.handleInput}
                    >
                      {defaultProductivityTypes.map((type) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </Label>
                  <Label>
                    <span className="font-bold">Activity Picture URL</span>
                    <Input
                      name="activityPictureURL"
                      className="mb-5 mt-1"
                      placeholder="Please paste a URL of your desired Activity Picture"
                      value={this.state.activityPictureURL}
                      onChange={this.handleInput}
                    />
                  </Label>

                  <button
                    className={
                      isInvalid
                        ? "cursor-not-allowed w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        : "w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    }
                    onClick={this.applyQuickActivity}
                    disabled={isInvalid}
                  >
                    <span className="mr-2">Apply</span>
                  </button>
                </div>
              </div>
            </div>
            {this.state.showServerResponseModal ? (
              <ServerResponseModal
                errorMessage={this.state.errorMessage}
                successMessage={this.state.successMessage}
              />
            ) : null}
          </div>
        )}
      </>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(QuickActivitySettings);
