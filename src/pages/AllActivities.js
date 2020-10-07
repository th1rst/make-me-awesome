import React, { Component } from "react";
import Navigation from "../components/Navigation";
import MUIDataTable from "mui-datatables";
import withAuthorization from "../components/Session/withAuthorization";

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
  ["1", "Sport", "01-01-2020", "120", "Productive", "Workout", "OMG SO AMAZING!"],
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

  componentDidMount() {
    this.listener = this.props.firebase
      .user(this.state.authUser.uid)
      .onSnapshot((snapshot) => {
        this.setState({
          firestoreActivities: snapshot.data().activities,
        });
      });
  }

  render() {
    return (
      <div>
        <Navigation />

        <MUIDataTable
          title={"All Activities Overview"}
          data={data}
          columns={columns}
          options={options}
        />
        <button onClick={() => console.log(this.state.firestoreActivities)}>
          CLICKME
        </button>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(AllActivities);
