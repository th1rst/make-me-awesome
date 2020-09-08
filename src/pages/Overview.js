import React from "react";
import Navigation from "../components/Navigation";
import AuthUserContext from "../components/Session/Context";
import withAuthorization from "../components/Session/withAuthorization";

const Overview = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <Navigation />
        <h1>Account: {authUser.email}</h1>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Overview);
