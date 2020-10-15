import React, { Component } from "react";
import withAuthorization from "../Session/withAuthorization";
import ServerResponseModal from "../ServerResponseModal";
import { FilePicker } from "react-file-picker-preview";
import { BsImage } from "react-icons/bs";

class ChangeProfilePicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      photoUrlInput: "",
      showServerResponseModal: false,
      errorMessage: "",
      successMessage: "",
      file: "",
      reset: {},
    };
    this.updatePhoto = this.updatePhoto.bind(this);
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFileChange = (event) => {
    let file = event.target.files[0];
    this.setState({
      [event.target.name]: file,
    });
  };

  updatePhoto = async () => {
    if (this.state.file !== "") {
      const storageRef = this.props.firebase.storageRef;
      const userID = this.state.authUser.uid;
      const file = this.state.file;
      const metadata = {
        contentType: "image/jpeg",
        size: this.state.file.size,
      };

      // --- SEND DATA TO CLOUD STORAGE ---
      await storageRef
        //set reference and upload
        .child(`users/${userID}/images/profilePicture/${file.name}`)
        .put(file, metadata)
        //get download link + set profile picture url for authUser
        .then(() => {
          storageRef
            .child(`users/${userID}/images/profilePicture/${file.name}`)
            .getDownloadURL()
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              this.props.firebase.auth.currentUser.updateProfile({
                photoURL: downloadURL,
              });
            });
        })
        .then(() => {
          this.setState({
            successMessage:
              "Sucessfully updated profile picture. It may take a while for changes to be in effect.",
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
    }
  };

  render() {
    const {
      showServerResponseModal,
      errorMessage,
      successMessage,
      error,
      file,
    } = this.state;

    return (
      <div>
        <FilePicker
          className="mb-2 cursor-pointer border-2 border-dashed border-gray-200 rounded-r-full rounded-l-full flex justify-center items-center"
          buttonText={
            <div className="w-full h-16 flex justify-center items-center">
              <BsImage className="mr-4 text-2xl text-blue-400" />
              <p className="text-lg font-semibold">
                {file === "" ? "Upload your Profile Picture." : null}
              </p>
            </div>
          }
          extensions={["image/jpeg"]}
          onChange={(file) => this.setState({ file })}
          onError={(error) => this.setState({ error: error })}
          onClear={() => this.setState({ file: "" })}
          triggerReset={this.state.reset}
        >
          <div className="input-button" type="button">
            The file picker
          </div>
        </FilePicker>
        <div className="file-details">
          {error ? <h4>Error: {error}</h4> : null}
        </div>

        <button
          className="w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
          onClick={this.updatePhoto}
        >
          <span className="mr-2">Apply</span>
        </button>

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

export default withAuthorization(condition)(ChangeProfilePicForm);
