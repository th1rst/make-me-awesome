import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
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
          })
          .catch((error) => {
            this.setState({ error });
          });
      })
      .catch((error) => {
        this.setState({ error });
      })
      //if resolved -> Redirect to overview via setState isLoggedIn
      .then(() => this.setState({ isLoggedIn: true }));

    event.preventDefault();
  };

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const background =
      "https://images.unsplash.com/photo-1565902603417-1f523e0736fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80";

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

    return this.state.isLoggedIn ? (
      <Redirect to="/overview" />
    ) : (
      <div
        className="absolute"
        style={{
          backgroundImage: `url(${background})`,
          width: "100vw",
          height: "100vh",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full border-2 rounded-lg border-gray-200">
              <h3 className="mb-4 pt-4 text-2xl text-center">Sign Up</h3>
              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  className="my-2 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="username"
                  value={username}
                  onChange={this.handleInput}
                  placeholder="Full Name"
                />

                <input
                  type="email"
                  className="my-2 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="email"
                  value={email}
                  onChange={this.handleInput}
                  placeholder="Email"
                />

                <input
                  type="password"
                  className="my-2 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="firstPassword"
                  value={firstPassword}
                  onChange={this.handleInput}
                  placeholder="Password"
                />
                <input
                  type="password"
                  className="my-2 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="secondPassword"
                  value={secondPassword}
                  onChange={this.handleInput}
                  placeholder="Confirm Password"
                />

                <button
                  disabled={isInvalid}
                  type="submit"
                  className="my-6 w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
                  Create Account
                </button>
                {error ? (
                  <p className="mt-2 text-red-500">{error.message}</p>
                ) : null}
              </form>

              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the {"  "}
                <Link
                  to="/termsofservice"
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Terms of Service
                </Link>
                and {"  "}
                <Link
                  to="/privacypolicy"
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Privacy Policy
                </Link>
                <div className="text-center text-sm text-grey-dark mt-4">
                  Already have an account? {"  "}
                  <Link
                    to="/"
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  >
                    Log in
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(SignUpPage);
