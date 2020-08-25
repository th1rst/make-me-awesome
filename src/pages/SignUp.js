import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    state = {
      username: "",
      email: "",
      firstPassword: "",
      secondPassword: "",
      error: null,
    }
  }

  onSubmit = (event) => {};

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, firstPassword, secondPassword, error } = this.state;

    const isInvalid =
      firstPassword !== secondPassword ||
      firstPassword === "" ||
      email === "" ||
      username === "";

    return (
      <div>
        <div className="bg-gray-100 min-h-screen">
          <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                <form onSubmit={this.onSubmit}>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline h-10"
                    name="fullname"
                    value={username}
                    onChange={this.onChange}
                    placeholder="Full Name"
                  />

                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline h-10"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    placeholder="Email"
                  />

                  <input
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline h-10"
                    name="password"
                    value={firstPassword}
                    onChange={this.onChange}
                    placeholder="Password"
                  />
                  <input
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline h-10"
                    name="confirm_password"
                    value={secondPassword}
                    onChange={this.onChange}
                    placeholder="Confirm Password"
                  />

                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                  >
                    Create Account
                  </button>
                  {error && <p>{error.message}</p>}
                </form>

                <div className="text-center text-sm text-grey-dark mt-4">
                  By signing up, you agree to the
                  <a
                    className="no-underline border-b border-grey-dark text-grey-dark"
                    href="#"
                  >
                    {" "}
                    Terms of Service
                  </a>{" "}
                  and
                  <a
                    className="no-underline border-b border-grey-dark text-grey-dark"
                    href="#"
                  >
                    {" "}
                    Privacy Policy
                  </a>
                </div>
              </div>

              <div className="text-grey-dark mt-6">
                Already have an account?
                <a
                  className="no-underline border-b border-blue text-blue"
                  href="../login/"
                >
                  {" "}
                  Log in
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
