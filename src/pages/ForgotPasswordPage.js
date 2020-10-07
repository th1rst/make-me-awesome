import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Label, Input, HelperText } from "@windmill/react-ui";
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

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...defaultState });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const background =
      "https://images.unsplash.com/photo-1565902603417-1f523e0736fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80";
    const { email, error } = this.state;
    const isInvalid = email === "";

    return (
      <div>
        <div
          className="absolute"
          style={{
            backgroundImage: `url(${background})`,
            width: "100vw",
            height: "100vh",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            <h1 className="mt-20 font-bold text-center text-3xl">
              Recover Your Password
            </h1>
          </div>
          <div className="container mt-20 max-w-md mx-auto xl:max-w-3xl h-64 flex bg-white rounded-lg shadow-lg overflow-hidden border-4">
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
                  <Label>
                    <span className="font-bold">Email</span>
                    <Input
                      name="email"
                      className="my-1 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      placeholder="Your account's email address"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </Label>
                </div>
                <div className="flex w-full mt-6">
                  <button
                    disabled={isInvalid}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
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
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link
      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
      to="/forgot"
    >
      Forgot Password?
    </Link>
  </p>
);

export default ForgotPasswordPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
