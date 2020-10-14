import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { withFirebase } from "../components/Firebase/context";
import BackgroundSlider from "./BackgroundSlider";

const defaultState = {
  email: "",
  password: "",
  error: null,
  isLoggedIn: false,
};

class Login extends Component {
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

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { email, password, error, isLoggedIn } = this.state;

    const isInvalid = password === "" || email === "";

    return isLoggedIn ? (
      <Redirect to="/overview" />
    ) : (
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex border-2 rounded-lg border-gray-200">
            <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
              <BackgroundSlider />
            </div>

            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={this.onSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="email"
                    value={email}
                    onChange={this.handleInput}
                    type="text"
                    placeholder="Email Address"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="password"
                    value={password}
                    onChange={this.handleInput}
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    id="checkbox_id"
                  />
                  <label className="text-sm" htmlFor="checkbox_id">
                    Remember Me
                  </label>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    disabled={isInvalid}
                    type="submit"
                  >
                    Sign In
                  </button>
                  {error ? (
                    <p className="mt-2 text-red-500">{error.message}</p>
                  ) : null}
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/signup"
                  >
                    Create an Account
                  </Link>
                </div>
                <div className="text-center">
                  <p>
                    <Link
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      to="/forgot"
                    >
                      Forgot Password?
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Login)