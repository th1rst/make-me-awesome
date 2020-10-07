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
    this.implementData();
  };

  implementData = () => {
    const newData = [];
    //map over each activity returned from firestore
    this.state.firestoreActivities.map((activity) =>
      //push each value of into a new subarray
      newData.push(Object.values(activity))
    );

    //set newly sorted data in state
    this.setState({ data: newData });
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
