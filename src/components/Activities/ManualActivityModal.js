import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { Link } from "react-router-dom";
import { Label, Select, Input, Button } from "@windmill/react-ui";
import { AiFillCloseCircle } from "react-icons/ai";

const defaultCategories = ["Work", "Leisure Time", "Workout"];
const defaultActivityTypes = ["Timer", "Counter"];
const defaultProductivityTypes = [
  "Productive",
  "Neutral / Necessary",
  "Unproductive",
];

const defaultState = {
  showModal: false,
  activityName: "",
  categoryName: defaultCategories[0],
  activityType: defaultActivityTypes[0],
  productivityType: defaultProductivityTypes[0],
};

class NewActivityModal extends Component {
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

  render() {
    const { activityName } = this.state;
    const isInvalid = activityName === "";

    return (
      <>
        <button
          className="mt-10 px-4 py-2 bg-blue-400 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition duration-100"
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
                        value={activityName}
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
                        <span className="font-bold">Duration (Minutes)</span>
                        <Input
                          name="activityDuration"
                          className="mb-5 mt-1"
                          placeholder={`How long did you do ${this.state.categoryName} ?`}
                          value={this.state.activityDuration}
                          onChange={this.handleInput}
                          valid={!isInvalid}
                        />
                      </Label>
                    ) : null}


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
                  </div>

                  {/*footer*/}
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
                      <span className="mr-2">Save Activity</span>
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
      </>
    );
  }
}

export default withFirebase(NewActivityModal);
