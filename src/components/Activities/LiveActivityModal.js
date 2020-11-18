import React, { useState } from "react";
import { withFirebase } from "../Firebase/context";
import { Link } from "react-router-dom";
import { Label, Select, Input, Button } from "@windmill/react-ui";
import { Modal } from "react-rainbow-components";

const defaultCategories = ["Work", "Leisure Time", "Workout"];
const defaultActivityTypes = ["Timer", "Counter"];
const defaultProductivityTypes = [
  "Productive",
  "Neutral / Necessary",
  "Unproductive",
];

function NewActivityModal() {
  const [showModal, setShowModal] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [categoryName, setCategoryName] = useState("Work");
  const [activityType, setActivityType] = useState("Timer");
  const [productivityType, setProductivityType] = useState("Productive");

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryName("");
    setCategoryName("Work");
    setActivityType("Timer");
    setProductivityType("Productive");
  };

  const isInvalid = activityName === "";

  return (
    <>
      <button
        className="w-48 m-4 px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150"
        type="button"
        onClick={() => setShowModal(!showModal)}
      >
        Start Live Activity
      </button>
      {showModal ? (
        <>
          <Modal
            isOpen={showModal}
            onRequestClose={() => handleCloseModal()}
            title="Start Live Activity"
            footer={
              <div className="flex flex-row justify-end">
                <button
                  className="text-red-500 hover:text-red-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 transition duration-100"
                  type="button"
                  onClick={() => handleCloseModal()}
                >
                  Close
                </button>
                <Link
                  to={{
                    pathname: "/activity",
                    state: {
                      showModal,
                      activityName,
                      categoryName,
                      activityType,
                      productivityType,
                    },
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
            }
          >
            <div className="relative px-4 pb-6 flex-auto">
              <Label>
                <span className="font-bold">
                  Name <span className="text-red-500">*</span>
                </span>
                <Input
                  className="mb-5 mt-1"
                  placeholder={
                    isInvalid ? "Please name your Activity" : `${activityName}`
                  }
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
              </Label>

              <Label>
                <span className="font-bold">Category</span>
                <Select
                  className="mb-5 mt-1"
                  onChange={(e) => setCategoryName(e.target.value)}
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
                  onChange={(e) => setActivityType(e.target.value)}
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
                  className="mb-5 mt-1"
                  onChange={(e) => setProductivityType(e.target.value)}
                >
                  {defaultProductivityTypes.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </Label>
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
}

export default withFirebase(NewActivityModal);
