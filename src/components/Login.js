import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { compose } from "recompose";
import FirebaseContext, { withFirebase } from "../components/Firebase/context";
import { PasswordForgetLink } from "../pages/ForgotPasswordPage";

const SignInPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {(firebase) => <SignInFormBase firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

const defaultState = {
  email: "",
  password: "",
  error: null,
  isLoggedIn: false,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          email: email,
          password: password,
          error: null,
          isLoggedIn: true,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  handleEmailInput = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordInput = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return this.state.isLoggedIn ? (
      <Redirect to="/overview" />
    ) : (
      <div>
        <div className="container mt-10 max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow-lg overflow-hidden border-4">
          <div className="relative hidden xl:block xl:w-1/2 h-full">
            <img
              className="absolute h-auto w-full object-cover"
              src="https://images.unsplash.com/photo-1504432842672-1a79f78e4084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
              alt="motivational"
            />
          </div>
          <div className="w-full xl:w-1/2 p-8">
            <form onSubmit={this.onSubmit}>
              <h1 className=" text-2xl font-bold">Sign in to your account</h1>
              <div>
                <span className="text-gray-600 text-sm">
                  Don't have an account?
                </span>
                <span className="text-gray-700 text-sm font-semibold">
                  <Link to="/signup"> Sign up</Link>
                </span>
              </div>
              <div className="mb-4 mt-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                  name="email"
                  value={email}
                  onChange={this.handleEmailInput}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-6 mt-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  name="password"
                  value={password}
                  onChange={this.handlePasswordInput}
                  type="password"
                  placeholder="Password"
                />
                <PasswordForgetLink className="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800">
                  Forgot Password?
                </PasswordForgetLink>
              </div>
              <div className="flex w-full mt-8">
                <button
                  disabled={isInvalid}
                  type="submit"
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                >
                  Sign in
                </button>
                {error && <p>{error.message}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
