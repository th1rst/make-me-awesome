import React from "react";
import { withFirebase } from "./Firebase/context";
import { Link } from "react-router-dom";

const SignOutButton = ({ firebase }) => (
  <button
    className="text-sm font-medium text-gray-800 leading-none"
    type="button"
    onClick={firebase.doSignOut}
  >
    <Link to="/">Logout</Link>
  </button>
);

export default withFirebase(SignOutButton);
