import React from "react";
import Navigation from "../components/Navigation";
import AuthUserContext from "../components/Session/Context";
import withAuthorization from "../components/Session/withAuthorization";
import NewActivityModalButton from "../components/NewActivityModalButton";

const Overview = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <Navigation />

        <div
          className="w-full bg-cover bg-center shadow-xl"
          style={{
            height: "32rem",
            backgroundImage: `url("https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80")`,
          }}
        >
          <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div className="text-center">
              <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">
                Welcome back,{" "}
                <span className="underline text-blue-400">
                  {authUser.email}
                </span>
              </h1>

              <NewActivityModalButton />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="my-4 font-bold text-4xl md:text-5xl max-w-xl text-gray-900">
              Overview
            </h1>
            <span className=" w-24 h-1 bg-blue-400 rounded-full" />
          </div>
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Overview);
