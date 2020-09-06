import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../components/Firebase/context";

const ForgotPasswordPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const defaultState = {
  email: "",
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }
 
  onSubmit = event => {
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...defaultState });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';

    return (
      <div>
        <div>
          <h1 className="mt-20 font-bold text-center text-3xl">
            Recover Your Password
          </h1>
        </div>
        <div className="container mt-20 max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow-lg overflow-hidden border-4">
          <div className="mt-1 ml-1 relative hidden xl:block xl:w-1/2 h-full">
            <img
              className="absolute h-auto w-full object-cover"
              src="https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              alt="laptop"
            />
          </div>
          <div className="w-full xl:w-1/2 p-8">
            <form onSubmit={this.onSubmit}>
              <h1 className=" text-2xl font-bold">Just one more step.</h1>
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
                  value={this.state.email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Your account's email address"
                />
              </div>
              <div className="flex w-full mt-8">
                <button
                  disabled={isInvalid}
                  className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                  type="submit"
                >
                  Submit
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

const PasswordForgetLink = () => (
  <p>
    <Link to="/forgot">Forgot Password?</Link>
  </p>
);

export default ForgotPasswordPage;
 
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };
