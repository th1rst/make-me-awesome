import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/context";
import Navigation from "../components/Navigation";
import { Label, Input } from "@windmill/react-ui";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrlInput: "",
    };

    this.updatePhoto = this.updatePhoto.bind(this);
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state.photoUrlInput);
  };

  updatePhoto() {
    var user = this.props.firebase.auth.currentUser;

    user
      .updateProfile({
        photoURL: this.state.photoUrlInput,
      })
      .then(function () {
        console.log("SUCCESS");
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <Navigation />
        <h1>hello from Settings Page!</h1>

        <Label className="my-5">
          <span className="font-bold">Update your Profile Picture</span>
          <Input
            name="photoUrlInput"
            className="mb-5 mt-1"
            placeholder="Paste photo URL here"
            onChange={this.handleInput}
          />
        </Label>

        <button onClick={this.updatePhoto}>CLICKME</button>




      </div>
      
    );
  }
}

export default withFirebase(Settings)