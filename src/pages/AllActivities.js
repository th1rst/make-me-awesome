import React, { Component } from "react";
import Navigation from "../components/Navigation";
import MUIDataTable from "mui-datatables";
import withAuthorization from "../components/Session/withAuthorization";
import LoadingSpinner from "../components/LoadingSpinner";

const columns = [
  "ID",
  "Activity Name",
  "Date",
  "Duration",
  "Productiveness",
  "Category",
  "Notes",
];

const options = {
  filterType: "checkbox",
  rowsPerPage: 15,
  rowsPerPageOptions: [15, 30, 100],
};

class AllActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      firestoreActivities: undefined,
      data: undefined,
    };
  }

  componentDidMount = async () => {
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
    this.formatData();
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

  render() {
    return (
      <div>
        <Navigation />
        {this.state.firestoreActivities ? (
          <div>
            <MUIDataTable
              title={"All Activities Overview"}
              data={this.state.data}
              columns={columns}
              options={options}
            />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(AllActivities);
