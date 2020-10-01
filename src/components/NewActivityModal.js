import React, { Component } from "react";
import { withFirebase } from "./Firebase/context";
import { Link } from "react-router-dom";
import { Label, Select, Input, Button } from "@windmill/react-ui";

const defaultCategories = ["Work", "Leisure Time", "Workout"];

const defaultActivityTypes = ["Timer", "Counter"];

const defaultState = {
  showModal: false,
  activityName: "",
  categoryName: defaultCategories[0],
  activityType: defaultActivityTypes[0],
  error: null,
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

  handleActivityNameInput = (event) => {
    this.setState({ activityName: event.target.value });
  };

  handleCategoryInput = (event) => {
    this.setState({ categoryName: event.target.value });
  };

  handleTypeInput = (event) => {
    this.setState({ activityType: event.target.value });
  };

  render() {
    const { activityName } = this.state;
    const isInvalid = activityName === "";

    return (
      <>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          type="button"
          style={{ transition: "all .15s ease" }}
          onClick={() => this.handleShowModal()}
        >
          Start Activity
        </button>
        {this.state.showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Start a new activity
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => this.handleShowModal()}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>

                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <Label>
                      <span className="font-bold">Name</span>
                      <Input
                        className="mb-5 mt-1"
                        placeholder="Activity Name"
                        value={activityName}
                        onChange={this.handleActivityNameInput}
                      />
                    </Label>

                    <Label>
                      <span className="font-bold">Category</span>
                      <Select
                        className="mb-5 mt-1"
                        onChange={this.handleCategoryInput}
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
                        className="mb-5 mt-1"
                        onChange={this.handleTypeInput}
                      >
                        {defaultActivityTypes.map((type) => (
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
                      className="text-red-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => this.handleCloseModal()}
                    >
                      Close
                    </button>
                    <Link
                      to={{
                        pathname: "/activity",
                        state: {
                          activityName: this.state.activityName,
                          categoryName: this.state.categoryName,
                          activityType: this.state.activityType,
                        },
                      }}
                    >
                      <Button
                        className="bg-green-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        disabled={isInvalid}
                      >
                        Start
                      </Button>
                    </Link>
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
