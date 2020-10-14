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
  categoryName: "Work",
  activityType: "Timer",
  productivityType: "Productive",
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
    const { activityName, showModal } = this.state;
    const isInvalid = activityName === "";

    return (
      <>
        <button
          className="w-48 m-4 px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150"
          type="button"
          onClick={() => this.handleShowModal()}
        >
          Start Live Activity
        </button>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-4/5 my-6 mx-auto max-w-xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-2xl md:text-3xl uppercase font-semibold">
                      Start a new activity
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
                            : `${activityName}`
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
                    <Link
                      to={{
                        pathname: "/activity",
                        state: { ...this.state },
                      }}
                    >
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1"
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
