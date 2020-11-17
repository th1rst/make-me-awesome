import React, { useState } from "react";
import { withFirebase } from "../Firebase/context";
import { Label, Select, Input, HelperText } from "@windmill/react-ui";
import { Modal, DatePicker } from "react-rainbow-components";
import ServerResponseModal from "../ServerResponseModal";

const defaultCategories = ["Work", "Leisure Time", "Workout"];
const defaultActivityTypes = ["Timer", "Counter"];
const defaultProductivityTypes = [
  "Productive",
  "Neutral / Necessary",
  "Unproductive",
];

function ManualActivityModal(props) {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [showModal, setShowModal] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [categoryName, setCategoryName] = useState("Work");
  const [activityType, setActivityType] = useState("Timer");
  const [productivityType, setProductivityType] = useState("Productive");
  const [activityDuration, setActivityDuration] = useState("");
  const [howOftenCount, setHowOftenCount] = useState("");
  const [howLongPerCount, setHowLongPerCount] = useState("");
  const [notes, setNotes] = useState(" ");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseModal, setShowServerResponseModal] = useState(false);
  const [date, setDate] = useState(new Date());

  const checkProductivityType = (type) => {
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
  };

  const validateNumbersOnly = (input) => {
    const regexp = /^[0-9\b]+$/;
    return regexp.test(input);
  };

  const calculateActivityTime = () => {
    //only return value if there is something to calculate, otherwise return/display 0
    if (howOftenCount * howLongPerCount) {
      return howOftenCount * howLongPerCount;
    }
    return 0;
  };

  const sendActivity = () => {
    // --- PREPARE AND FORMAT DATA ---
    const userID = authUser.uid;
    const userDate = date.toLocaleDateString("en-US");

    let duration;
    //if user inputs the duration in minutes, take this value
    if (activityType === "Timer") {
      duration = activityDuration;
    }
    //otherwise, calculate it from HowOften + HowLong
    else {
      duration = calculateActivityTime().toString();
    }

    // --- SEND DATA TO FIRESTORE ---
    props.firebase.db
      .collection("users")
      .doc(`${userID}`)
      .collection("activities")
      .add({
        name: activityName,
        date: userDate,
        duration: duration,
        category: categoryName,
        productiveness: productivityType,
        notes: notes,
      })
      .then(() => {
        setSuccessMessage("Sucessfully saved activity!");
        setShowModal(false);
        setShowServerResponseModal(true);
        setActivityName("");
        setCategoryName("Work");
        setActivityType("Timer");
        setProductivityType("Productive");
        setActivityDuration("");
        setNotes("");
      })
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000))
      .catch((error) => {
        setErrorMessage(error.message);
        setShowModal(false);
        setShowServerResponseModal(true);
      })
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000));
  };

  const isInvalid = activityName === "";

  return (
    <>
      <button
        className="w-48 m-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150"
        type="button"
        onClick={() => setShowModal(!showModal)}
      >
        Manual Entry
      </button>

      {showModal ? (
        <>
          <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            title="Manually Enter An Activity"
            footer={
              <>
                {activityType === "Timer" ? null : (
                  /* Returns i.e.: "Total time spent on unproductive activity Watching TV: 210 Minutes.*/

                  <HelperText
                    //switch text colors based on ProductivityType
                    className={`font-bold ${checkProductivityType(
                      productivityType
                    )} italic`}
                  >
                    Total time spent on {productivityType.toLowerCase()}{" "}
                    activity {activityName ? activityName : "(Activity Name)"}:{" "}
                    {calculateActivityTime()} Minutes.
                  </HelperText>
                )}
                <div className="flex items-center justify-end p-6">
                  <button
                    className="text-red-500 hover:text-red-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 transition duration-100"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                  <button
                    className={
                      isInvalid
                        ? "cursor-not-allowed w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition duration-100"
                        : "w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition duration-100"
                    }
                    disabled={isInvalid}
                    onClick={sendActivity}
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
              </>
            }
          >
            {" "}
            <div className="relative p-6 flex-auto">
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

              {/* ------------- TIMER VARIANT ------------- */}

              {activityType === "Timer" ? (
                <Label>
                  <span className="font-bold">
                    Duration (minutes) <span className="text-red-500">*</span>
                  </span>
                  <Input
                    className="mb-5 mt-1"
                    placeholder={`How long did you do ${
                      activityName ? activityName : "(Name)"
                    } for (in minutes)?`}
                    value={activityDuration}
                    onChange={(e) => setActivityDuration(e.target.value)}
                    valid={validateNumbersOnly(activityDuration)}
                  />
                </Label>
              ) : (
                <>
                  {/* ------------- COUNTER VARIANT ------------- */}

                  <Label>
                    <span className="font-bold">
                      How many times did you do{" "}
                      {activityName ? activityName : <i>(Activity Name)</i>}?
                    </span>
                    <Input
                      className="mb-5 mt-1"
                      placeholder="Only numbers allowed"
                      value={howOftenCount}
                      onChange={(e) => setHowOftenCount(e.target.value)}
                      valid={validateNumbersOnly(howOftenCount)}
                    />
                  </Label>
                  <Label>
                    <span className="font-bold">
                      How long each time (in minutes)?
                    </span>
                    <Input
                      className="mb-5 mt-1"
                      placeholder="Only numbers allowed"
                      value={howLongPerCount}
                      onChange={(e) => setHowLongPerCount(e.target.value)}
                      valid={validateNumbersOnly(howLongPerCount)}
                    />
                  </Label>
                </>
              )}

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

              <Label>
                <span className="font-bold">When?</span>
                <DatePicker
                  className="mb-5"
                  value={date}
                  onChange={(value) => setDate(value)}
                />
              </Label>

              <Label>
                <span className="font-bold">Any Notes?</span>
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <textarea
                    className="mt-1 rounded border border-gray-200 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    placeholder="Share your thoughts."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
              </Label>
            </div>
          </Modal>
        </>
      ) : null}

      {/* ------------- SERVER RESPONSE MODAL ------------- */}

      {showServerResponseModal ? (
        <ServerResponseModal
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      ) : null}
    </>
  );
}

export default withFirebase(ManualActivityModal);
