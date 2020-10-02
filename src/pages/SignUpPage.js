import { auth } from "firebase";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../components/Firebase/context";

const defaultState = {
  username: "",
  email: "",
  firstPassword: "",
  secondPassword: "",
  error: null,
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  onSubmit = (event) => {
    const { username, email, firstPassword } = this.state;
    let tempUserID = null;

    //create FireBASE user
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, firstPassword)
      //await UserID from Firebase auth
      .then(async () => {
        tempUserID = await this.props.firebase.auth.currentUser.uid;
      })

      //create corresponding FireSTORE (database) entry with UserID
      .then(() => {
        this.props.firebase.db
          .collection("users")
          .doc(`${tempUserID}`)
          .set({
            userID: tempUserID,
            name: username,
            email: email,
            activities: null,
          })
          .catch((error) => {
            console.log(
              "Something went wrong with added user to firestore: ",
              error
            );
          });
      })
      .catch((error) => {
        this.setState({ error });
      });
    this.setState({ ...defaultState });

    event.preventDefault();
  };

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      username,
      email,
      firstPassword,
      secondPassword,
      error,
    } = this.state;

    const isInvalid =
      firstPassword !== secondPassword ||
      firstPassword === "" ||
      email === "" ||
      username === "";

    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>
              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline h-10"
                  name="username"
                  value={username}
                  onChange={this.handleInput}
                  placeholder="Username"
                />

                <input
                  type="email"
                  className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline h-10"
                  name="email"
                  value={email}
                  onChange={this.handleInput}
                  placeholder="Email"
                />

                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline h-10"
                  name="firstPassword"
                  value={firstPassword}
                  onChange={this.handleInput}
                  placeholder="Password"
                />
                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline h-10"
                  name="secondPassword"
                  value={secondPassword}
                  onChange={this.handleInput}
                  placeholder="Confirm Password"
                />

                <button
                  disabled={isInvalid}
                  type="submit"
                  className="w-full text-center py-3 rounded bg-gray-300 text-black hover:bg-gray-500 my-1"
                >
                  Create Account
                </button>
                {error && <p>{error.message}</p>}
              </form>

              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <Link
                  to="/termsofservice"
                  className="no-underline border-b border-grey-dark text-grey-dark"
                >
                  {" "}
                  Terms of Service
                </Link>{" "}
                and
                <Link
                  to="/privacypolicy"
                  className="no-underline border-b border-grey-dark text-grey-dark"
                >
                  {" "}
                  Privacy Policy
                </Link>
              </div>
            </div>

            <div className="text-grey-dark mt-6">
              Already have an account?
              <Link
                to="/"
                className="no-underline border-b border-blue text-blue"
              >
                {" "}
                Log in
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to="/signup">Sign Up</Link>
  </p>
);

export default withFirebase(SignUpPage);

export { SignUpPage, SignUpLink };
