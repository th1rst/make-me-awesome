import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPowerOff, FaQuestion } from "react-icons/fa";
import { MdSettings } from "react-icons/md";

import withAuthorization from "./Session/withAuthorization";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      username: undefined,
      isSidebarOpen: false,
      isUserMenuOpen: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    await this.props.firebase.db
      .collection("users")
      .doc(`${this.state.authUser.uid}`)
      .get()
      .then((response) => {
        this.setState({ username: response.data().name, loading: false });
      });
  };

  handleSidebarExpand() {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
  }

  handleUserMenuExpand() {
    this.setState({ isUserMenuOpen: !this.state.isUserMenuOpen });
  }

  render() {
    const { photoURL, email } = this.state.authUser;
    const { username, loading, isSidebarOpen, isUserMenuOpen } = this.state;

    const defaultImage =
      "https://images.unsplash.com/photo-1592439120548-78ea7b42398e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

    return (
      <div>
        <div className="flex-1 flex flex-col shadow-xl">
          <nav className="px-4 flex justify-between bg-white h-16 border-b-2">
            <ul className="flex items-center">
              <li className="h-6 w-6 cursor-pointer">
                <GiHamburgerMenu
                  className="h-6 w-6"
                  onClick={() => this.handleSidebarExpand()}
                />
              </li>
            </ul>

            <ul className="flex items-center">
              <li>
                <Link to="/overview">
                  <h1 className="pl-8 lg:pl-0 font-bold text-gray-700">
                    Make Me Awesome
                  </h1>
                </Link>
              </li>
            </ul>

            <ul className="flex items-center">
              <li className="h-10 w-10 cursor-pointer">
                <img
                  className="h-full w-full rounded-full mx-auto object-cover"
                  src={photoURL ? `${photoURL}` : `${defaultImage}`}
                  alt="userImg"
                  onClick={() => this.handleUserMenuExpand()}
                />
              </li>
            </ul>
          </nav>
        </div>

        {/* 
            --------------> SIDEBAR (HAMBURGER MENU) 
        */}
        {isSidebarOpen === true ? (
          <div>
            <div
              className="z-10 min-h-50 flex w-full max-w-xs p-4 bg-white absolute"
              style={{ zIndex: "9999" }}
            >
              <ul className="flex flex-col w-full">
                <li className="my-px">
                  <div className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <span className="flex items-center justify-center text-lg text-gray-400">
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                    </span>
                    <Link to={"/overview"}>
                      <span className="ml-3">Home</span>
                    </Link>
                  </div>
                </li>
                <li className="my-px">
                  <Link
                    to="/all-activities"
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    <span className="flex items-center justify-center text-lg text-gray-400">
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                    </span>
                    <span className="ml-3">All Activities</span>
                  </Link>
                </li>
                <li className="my-px">
                  <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">
                    Account
                  </span>
                </li>
                <li className="my-px">
                  <Link
                    to="/settings"
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    <span className="flex items-center justify-center text-lg text-gray-400">
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </span>
                    <span className="ml-3">Settings</span>
                  </Link>
                </li>
                <li className="my-px">
                  <Link
                    to="/"
                    onClick={this.props.firebase.doSignOut}
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    <span className="flex items-center justify-center text-lg text-red-400">
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                      </svg>
                    </span>
                    <span className="ml-3">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : null}

        {/* 
            --------------> USER MENU (PROFILE PICTURE CLICK) 
        */}
        {isUserMenuOpen ? (
          <div
            className="w-64 max-h-50 absolute rounded-xl right-0"
            style={{ zIndex: "9999" }}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-xl border">
              <div className="text-center p-6 border-b">
                <img
                  className="h-32 w-32 rounded-full mx-auto object-cover"
                  src={photoURL ? `${photoURL}` : `${defaultImage}`}
                  alt="user placeholder"
                />
                <p className="pt-2 text-lg font-semibold">
                  {loading ? "Username" : username}
                </p>
                <p className="text-sm text-gray-600">{email}</p>
              </div>
              <div>
                <Link
                  to="/settings"
                  className="px-4 py-2 pb-4 mt-2 hover:bg-gray-100 flex"
                >
                  <MdSettings className="mr-2 text-blue-500" />
                  <p className="text-sm my-auto font-medium text-gray-800 leading-none">
                    Settings
                  </p>
                </Link>
                <Link
                  to="/FAQ"
                  className="px-4 py-2 pb-4 hover:bg-gray-100 flex"
                >
                  <FaQuestion className="mr-2 text-blue-500" />
                  <p className="text-sm my-auto font-medium text-gray-800 leading-none">
                    FAQ
                  </p>
                </Link>
                <Link
                  to="/"
                  onClick={this.props.firebase.doSignOut}
                  className="px-4 py-2 pb-4 hover:bg-gray-100 flex"
                >
                  <FaPowerOff className="mr-2 text-blue-500" />
                  <p className="text-sm my-auto font-medium text-gray-800 leading-none">
                    Logout
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Navigation);
