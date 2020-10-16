import React, { Component } from "react";
import Navigation from "../components/Navigation";
import MUIDataTable from "mui-datatables";
import withAuthorization from "../components/Session/withAuthorization";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import { Badge } from "@windmill/react-ui";
import { FaTrash } from "react-icons/fa";
import ServerResponseModal from "../components/ServerResponseModal";

class AllActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      firestoreActivities: undefined,
      data: undefined,
      errorMessage: "",
      successMessage: "",
      showServerResponseModal: false,
      columns: [
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
                        this.deleteActivity(value).then(() => {
                          const newData = [];
                          this.state.firestoreActivities.filter((entry) =>
                            entry.id !== value ? newData.push(entry) : null
                          );
                          this.setState({ firestoreActivities: newData });
                          this.formatData();
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
                <p className="font-serif text-base text-center italic">
                  {value}
                </p>
              );
            },
          },
        },
      ],
      options: {
        selectableRows: false,
        filterType: "checkbox",
        rowsPerPage: 15,
        rowsPerPageOptions: [15, 30, 100],
        customHeadRender: (value) => {
          return <h1 className="text-xl font-bold">{value}</h1>;
        },
      },
    };
    this.handleShowWarningModal = this.handleShowWarningModal.bind(this);
  }

  componentDidMount = async () => {
    await this.getData();
    this.formatData();
  };

  getData = async () => {
    const response = await this.props.firebase.db
      .collection("users")
      .doc(`${this.state.authUser.uid}`)
      .collection("activities")
      .get()
      .then(function (querySnapshot) {
        const activityData = [];

        querySnapshot.forEach(function (doc) {
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
    this.setState({ firestoreActivities: response });
  };

  formatData = () => {
    /* 
      -> map over each activity returned from firestore, push each value of key into a new subarray
      -> set newly sorted data in state to be displayed in table

                     format: [ ["ID", "Activity Name", "Date", "Duration", "Productiveness", "Category", "Notes",], [ ... ], [ ... ], ]
      example formattedData: [ ["1NKf8xy4k9dIU0bs5eKf", "Watching TV", "10/5/2020", "135", "Unproductive", "Leisure Time", "Was it too much?"], [ ... ], [ ... ], ]
    */
    const formattedData = [];
    this.state.firestoreActivities
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by date (newest to oldest)
      .map((activity) => formattedData.push(Object.values(activity)));
    this.setState({ data: formattedData });
  };

  handleShowWarningModal() {
    this.setState({ showWarningModal: !this.state.showWarningModal });
  }

  deleteActivity = async (activityID) => {
    await this.props.firebase.db
      .collection("users")
      .doc(`${this.state.authUser.uid}`)
      .collection("activities")
      .doc(`${activityID}`)
      .delete()
      .then(() => {
        this.setState({
          successMessage:
            "Activity successfully deleted. It may take a while for changes to be in effect.",
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
    const {
      firestoreActivities,
      data,
      showServerResponseModal,
      errorMessage,
      successMessage,
      columns,
      options,
    } = this.state;

    return (
      <div>
        <Navigation />
        {firestoreActivities ? (
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
        ) : (
          <LoadingSpinner />
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
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(AllActivities);
