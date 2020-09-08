import React from "react";
import Navigation from "../components/Navigation";
import AuthUserContext from "../components/Session/Context";
import withAuthorization from "../components/Session/withAuthorization";
import { AiFillPlusCircle } from "react-icons/ai";

const Overview = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <div>
          <Navigation />
          <h1 className="font-serif text-xl font-bold text-center my-2">Hello, {authUser.email}</h1>
        </div>

        <div className="flex flex-col border-2 border-red-600">
          <div className="flex flex-row border-2 justify-center border-green-600">
            <AiFillPlusCircle className="text-5xl text-green-500 hover:text-green-700 cursor-pointer" />
            <p className="font-serif text-2xl font-bold mx-2 my-auto">New Activity</p>
          </div>
          <h1>ASDASDASD</h1>
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>

  /* Possible future Banner picture: https://images.unsplash.com/photo-1525706732602-52592370085e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80   */
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Overview);
