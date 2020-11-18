import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import MUIDataTable from "mui-datatables";
import withAuthorization from "../components/Session/withAuthorization";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import { Badge } from "@windmill/react-ui";
import { FaTrash } from "react-icons/fa";
import ServerResponseModal from "../components/ServerResponseModal";

function AllActivities(props) {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [loading, setLoading] = useState(true);
  const [firestoreActivities, setFirestoreActivities] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseModal, setShowServerResponseModal] = useState(false);

  const columns = [
    {
      name: "ID",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <>
              <div className="flex flex-row flex-wrap align-items">
                <p className="mt-2 italic">{value}</p>
                <button
                  type="button"
                  onClick={() => {
                    deleteActivity(value).then(() => {
                      const newData = firestoreActivities.filter((entry) =>
                        entry.id !== value ? value : null
                      );
                      setFirestoreActivities(newData);
                      formatData(newData);
                    });
                  }}
                >
                  <span className="text-red-500 md:text-red-100 hover:text-red-500 inline-flex">
                    <FaTrash className="mt-2 ml-4" />
                    <p className="mt-2 ml-1"> delete</p>
                  </span>
                </button>
              </div>
            </>
          );
        },
      },
    },
    {
      name: "Activity Name",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return <p className="font-bold text-base underline">{value}</p>;
        },
      },
    },
    "Date",
    {
      name: "Duration (min.)",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return <p className="font-bold">{value}</p>;
        },
      },
    },
    {
      name: "Productiveness",
      options: {
        filter: false,
        customBodyRender: (value) => {
          switch (value) {
            case "Productive":
              return (
                <Badge className="w-auto h-auto" type="success">
                  <p className="text-sm">{value}</p>
                </Badge>
              );
            case "Neutral / Necessary":
              return (
                <Badge className="w-auto h-auto" type="neutral">
                  <p className="text-sm">Neutral</p>
                </Badge>
              );
            case "Unproductive":
              return (
                <Badge className="w-auto h-auto" type="danger">
                  <p className="text-sm">{value}</p>
                </Badge>
              );
            default:
              break;
          }
        },
      },
    },
    "Category",
    {
      name: "Notes",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <p className="font-serif text-base text-center italic">{value}</p>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    filterType: "checkbox",
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 30, 100],
    customHeadRender: (value) => {
      return <h1 className="text-xl font-bold">{value}</h1>;
    },
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("activities")
      .get()
      .then((querySnapshot) => {
        const activityData = [];

        querySnapshot.forEach((doc) => {
          activityData.push({
            id: doc.id,
            name: doc.data().name,
            date: doc.data().date,
            duration: doc.data().duration,
            productiveness: doc.data().productiveness,
            category: doc.data().category,
            notes: doc.data().notes,
          });
        });
        return activityData;
      });
    setFirestoreActivities(response);
    formatData(response);
  };

  const formatData = async (data) => {
    const formattedData = [];
    /* 
                     format: [ ["ID", "Activity Name", "Date", "Duration", "Productiveness", "Category", "Notes",], [ ... ], [ ... ], ]
      example formattedData: [ ["1NKf8xy4k9dIU0bs5eKf", "Watching TV", "10/5/2020", "135", "Unproductive", "Leisure Time", "Was it too much?"], [ ... ], [ ... ], ]
    */
    data
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by newest to oldest
      .map((activity) => formattedData.push(Object.values(activity)));
    setData(formattedData);
    setLoading(false);
  };

  const deleteActivity = async (activityID) => {
    await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("activities")
      .doc(`${activityID}`)
      .delete()
      .then(() => {
        setSuccessMessage("Activity successfully deleted.");
        setShowServerResponseModal(true);
      })
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000))
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseModal(true);
      })
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000));
  };

  return (
    <div>
      <Navigation />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="w-auto min-h-screen">
            <div className="w-auto h-auto">
              <MUIDataTable
                title={"All Activities Overview"}
                data={data}
                columns={columns}
                options={options}
              />
            </div>
          </div>
          <Footer />
        </div>
      )}

      {/* ------------- SERVER RESPONSE MODAL ------------- */}

      {showServerResponseModal ? (
        <ServerResponseModal
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      ) : null}
    </div>
  );
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(AllActivities);
