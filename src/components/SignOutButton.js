import React from "react";
import { withFirebase } from "./Firebase/context";

const SignOutButton = ({ firebase }) => (
  <button
    className="text-sm font-medium text-gray-800 leading-none"
    type="button"
    onClick={firebase.doSignOut}
  >
    <p>Logout</p>
  </button>
);

export default withFirebase(SignOutButton);
