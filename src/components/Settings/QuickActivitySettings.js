import React, { useEffect, useState } from "react";
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

function QuickActivitySettings(props) {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [quickActivities, setQuickActivities] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [productivityType, setProductivityType] = useState("Productive");
  const [categoryName, setCategoryName] = useState("Work");
  const [activityPictureURL, setActivityPictureURL] = useState("");
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseModal, setShowServerResponseModal] = useState(false);
  const date = new Date();

  useEffect(() => {
    getQuickActivities();
  }, []);

  const getQuickActivities = async () => {
    const response = await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
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
    setQuickActivities(response);
  };

  const applyQuickActivity = () => {
    // --- PREPARE AND FORMAT DATA ---
    const defaultPictureUrl =
      "https://images.unsplash.com/photo-1535981767287-35259dbf7d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80";

    const userDefinedPictureURL =
      activityPictureURL !== "" ? activityPictureURL : defaultPictureUrl;

    // --- SEND DATA TO FIRESTORE ---
    props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("quickActivities")
      .add({
        name: activityName,
        date: date.toLocaleDateString("en-US"),
        duration: activityDuration,
        category: categoryName,
        productiveness: productivityType,
        notes: " ",
        activityPictureURL: userDefinedPictureURL,
      })
      .then(() => {
        setSuccessMessage("Sucessfully saved QuickActivity!");
        setShowServerResponseModal(true);
        setActivityName("");
        setCategoryName("Work");
        setActivityPictureURL("");
        setActivityDuration("");
      })
      .then(() => getQuickActivities())
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000))
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseModal(true);
      });
  };

  const deleteQuickActivity = async (id) => {
    await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("quickActivities")
      .doc(`${id}`)
      .delete()
      .then(() => {
        setSuccessMessage("Activity successfully deleted.");
        setShowServerResponseModal(true);
      })
      .then(() => getQuickActivities())
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000))
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseModal(true);
      });
  };

  const validateNumbersOnly = (input) => {
    const regexp = /^[0-9\b]+$/;
    return regexp.test(input);
  };

  const isInvalid = activityName === "" || activityDuration === "";

  return (
    <>
      {!quickActivities ? (
        <LoadingSpinner />
      ) : (
        <div>
          {quickActivities.length === 0 ? (
            <p className="font-bold text-lg text-center">
              You have not set up QuickActivities yet.
            </p>
          ) : (
            <div>
              <h1 className="my-2 text-lg font-bold uppercase text-center">
                Current QuickActivities:
              </h1>
              <div className="w-full h-auto border border-gray-100 rounded-lg">
                <div className="flex flex-row flex-wrap justify-around">
                  {quickActivities.map((quickActivity) => (
                    <div
                      className="flex flex-col w-auto mb-4"
                      key={quickActivity.id}
                    >
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
                              <button className="bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700 p-4 shadow-xl rounded-full focus:outline-none">
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
                        onClick={() => deleteQuickActivity(quickActivity.id)}
                      >
                        <span className="text-red-500 md:text-red-100 hover:text-red-500 inline-flex">
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

          <h1 className="mt-8 mb-2 text-lg font-bold uppercase text-center">
            Add QuickActivity
          </h1>
          <div className="w-full h-auto border border-gray-100 rounded-lg">
            <div className="mx-auto">
              <div className="relative p-6 flex-auto">
                <Label>
                  <span className="font-bold">
                    Name <span className="text-red-500">*</span>
                  </span>
                  <Input
                    className="mb-5 mt-1"
                    placeholder="Please name your Activity"
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
                {isEditingDuration ? (
                  <Label>
                    <span className="font-bold">
                      Duration (minutes) <span className="text-red-500">*</span>
                    </span>
                    <Input
                      className="mb-5 mt-1"
                      placeholder={`How long do you usually do ${
                        activityName ? activityName : "(Name)"
                      } for (in minutes)?`}
                      value={activityDuration}
                      onChange={(e) => setActivityDuration(e.target.value)}
                      valid={validateNumbersOnly(activityDuration)}
                    />
                  </Label>
                ) : (
                  <Label>
                    <span className="font-bold">
                      Duration (minutes) <span className="text-red-500">*</span>
                    </span>
                    <Input
                      className="mb-5 mt-1"
                      placeholder="How long do you usually do (Name) for (in minutes)?"
                      onClick={() => setIsEditingDuration(true)}
                    />
                  </Label>
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
                  <span className="font-bold">Activity Picture URL</span>
                  <Input
                    className="mb-5 mt-1"
                    placeholder="Please paste a URL of your desired Activity Picture"
                    value={activityPictureURL}
                    onChange={(e) => setActivityPictureURL(e.target.value)}
                  />
                </Label>

                <button
                  className={
                    isInvalid
                      ? "cursor-not-allowed w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                      : "w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  }
                  onClick={applyQuickActivity}
                  disabled={isInvalid}
                >
                  <span className="mr-2">Apply</span>
                </button>
              </div>
            </div>
          </div>

          {/* ------------- SERVER RESPONSE MODAL ------------- */}

          {showServerResponseModal ? (
            <ServerResponseModal
              errorMessage={errorMessage}
              successMessage={successMessage}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(QuickActivitySettings);
