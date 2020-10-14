import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { Label, Select, Input, HelperText } from "@windmill/react-ui";
import { AiFillCloseCircle } from "react-icons/ai";
import { DatePicker } from "react-rainbow-components";
import ServerResponseModal from "../ServerResponseModal";

const defaultCategories = ["Work", "Leisure Time", "Workout"];
const defaultActivityTypes = ["Timer", "Counter"];
const defaultProductivityTypes = [
  "Productive",
  "Neutral / Necessary",
  "Unproductive",
];

const defaultState = {
  authUser: JSON.parse(localStorage.getItem("authUser")),
  showModal: false,
  activityName: "",
  categoryName: defaultCategories[0],
  activityType: defaultActivityTypes[0],
  productivityType: defaultProductivityTypes[0],
  activityDuration: "",
  howOftenCount: undefined,
  howLongPerCount: undefined,
  date: new Date(),
  notes: "",
  errorMessage: "",
  successMessage: "",
  showServerResponseModal: false,
};

class ManualActivityModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  handleShowModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleCloseModal() {
    this.setState({ ...defaultState });
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  checkProductivity(type) {
    switch (type) {
      case "Productive":
        return "text-green-500";
      case "Neutral / Necessary":
        return "text-yellow-400";
      case "Unproductive":
        return "text-red-500";
      default:
        break;
    }
  }

  validateNumbersOnly(input) {
    const regexp = /^[0-9\b]+$/;
    return regexp.test(input);
  }

  calculateActivityTime() {
    //only return value if there is something to calculate, otherwise return/display 0
    if (this.state.howOftenCount * this.state.howLongPerCount) {
      return this.state.howOftenCount * this.state.howLongPerCount;
    }
    return 0;
  }

  sendActivity = () => {
    // --- PREPARE AND FORMAT DATA ---
    const userID = this.state.authUser.uid;
    const name = this.state.activityName;
    const date = this.state.date.toLocaleDateString("en-US");
    const productiveness = this.state.productivityType;
    const category = this.state.categoryName;
    let notes;

    this.state.notes ? (notes = this.state.notes) : (notes = " ");

    let duration;
    //if user inputs the duration in minutes, take this value
    if (this.state.activityType === "Timer") {
      duration = this.state.activityDuration;
    }
    //otherwise, calculate it from HowOften + HowLong
    else {
      duration = this.calculateActivityTime().toString();
    }

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
          showModal: false,
          showServerResponseModal: true,
        });
      })
      .then(() =>
        setTimeout(
          function () {
            this.setState({ ...defaultState });
          }.bind(this),
          5000
        )
      )
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
          showModal: false,
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
    const isInvalid = this.state.activityName === "";

    return (
      <>
        <button
          className="w-48 m-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150"
          type="button"
          onClick={() => this.handleShowModal()}
        >
          Manual Entry
        </button>
        {this.state.showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-4/5 my-6 mx-auto max-w-xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-2xl md:text-3xl uppercase font-semibold">
                      Manually enter an activity
                    </h3>
                    <button onClick={() => this.handleShowModal()}>
                      <AiFillCloseCircle className="h-6 w-6 block outline-none text-red-500 hover:text-red-600 transition duration-150" />
                    </button>
                  </div>

                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <Label>
                      <span className="font-bold">Name</span>
                      <Input
                        name="activityName"
                        className="mb-5 mt-1"
                        placeholder={
                          isInvalid
                            ? "Please name your Activity"
                            : `${this.state.activityName}`
                        }
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
                      <span className="font-bold">Type</span>
                      <Select
                        name="activityType"
                        className="mb-5 mt-1"
                        onChange={this.handleInput}
                      >
                        {defaultActivityTypes.map((type) => (
                          <option value={type} key={type}>
                            {type}
                          </option>
                        ))}
                      </Select>
                    </Label>

                    {this.state.activityType === "Timer" ? (
                      <Label>
                        <span className="font-bold">Duration (minutes)</span>
                        <Input
                          name="activityDuration"
                          className="mb-5 mt-1"
                          placeholder={`How long did you do ${
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
                    ) : (
                      <>
                        <Label>
                          <span className="font-bold">
                            How many times did you do{" "}
                            {this.state.activityName ? (
                              this.state.activityName
                            ) : (
                              <i>(Activity Name)</i>
                            )}
                            ?
                          </span>
                          <Input
                            name="howOftenCount"
                            className="mb-5 mt-1"
                            placeholder="Only numbers allowed"
                            value={this.state.howOftenCount}
                            onChange={this.handleInput}
                            valid={this.validateNumbersOnly(
                              this.state.howOftenCount
                            )}
                          />
                        </Label>
                        <Label>
                          <span className="font-bold">
                            How long each time (in minutes)?
                          </span>
                          <Input
                            name="howLongPerCount"
                            className="mb-5 mt-1"
                            placeholder="Only numbers allowed"
                            value={this.state.howLongPerCount}
                            onChange={this.handleInput}
                            valid={this.validateNumbersOnly(
                              this.state.howLongPerCount
                            )}
                          />
                        </Label>
                      </>
                    )}

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
                      <span className="font-bold">When?</span>
                      <DatePicker
                        className="mb-5"
                        value={this.state.date}
                        onChange={(value) => this.setState({ date: value })}
                      />
                    </Label>

                    <Label>
                      <span className="font-bold">Any Notes?</span>
                      <div className="w-full md:w-full px-3 mb-2 mt-2">
                        <textarea
                          className="mt-1 rounded border border-gray-200 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                          placeholder="Share your thoughts."
                          name="notes"
                          value={this.state.notes}
                          onChange={this.handleInput}
                        ></textarea>
                      </div>
                    </Label>
                  </div>

                  {/*footer*/}
                  {this.state.activityType === "Timer" ? null : (
                    /* Returns i.e.: "Total time spent on unproductive activity Watching TV: 210 Minutes.*/

                    <HelperText
                      //switch text colors based on ProductivityType
                      className={`font-bold ${this.checkProductivity(
                        this.state.productivityType
                      )} italic mb-2`}
                    >
                      Total time spent on{" "}
                      {this.state.productivityType.toLowerCase()} activity{" "}
                      {this.state.activityName
                        ? this.state.activityName
                        : "(Activity Name)"}
                      : {this.calculateActivityTime()} Minutes.
                    </HelperText>
                  )}

                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="text-red-500 hover:text-red-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 transition duration-100"
                      type="button"
                      onClick={() => this.handleCloseModal()}
                    >
                      Close
                    </button>

                    <button
                      className="w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition duration-100"
                      disabled={isInvalid}
                      onClick={this.sendActivity}
                    >
                      <span className="mr-2 text-sm sm:text-md">
                        Save Activity
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentcolor"
                          d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

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

export default withFirebase(ManualActivityModal);
