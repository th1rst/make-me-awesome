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

const data = [
  [
    "1",
    "Sport",
    "01-01-2020",
    "120",
    "Productive",
    "Workout",
    "OMG SO AMAZING!",
  ],
  ["1", "Sport", "01-01-2020", "120", "Productive", "Workout"],
  ["1", "Sport", "01-01-2020", "120", "Productive", "Workout"],
  ["1", "Sport", "01-01-2020", "120", "Productive", "Workout"],
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
  };

  handleClick = () => {
    console.log(this.state.firestoreActivities);
  };

  render() {
    return (
      <div>
        <Navigation />
        {this.state.firestoreActivities ? (
          <div>
            <MUIDataTable
              title={"All Activities Overview"}
              data={data}
              columns={columns}
              options={options}
            />
            <button onClick={this.handleClick}>CLICKME</button>{" "}
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
