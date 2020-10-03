import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import SignOutButton from "../components/SignOutButton";
import { withFirebase } from "./Firebase/context";
import { AiOutlineLoading } from "react-icons/ai";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      isSidebarOpen: false,
      isUserMenuOpen: false,
      loading: true,
    };
  }

  componentDidMount() {
    if (this.state.authUser) {
      this.setState({ loading: false });
    }
  }

  handleSidebarExpand() {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
  }

  handleUserMenuExpand() {
    this.setState({ isUserMenuOpen: !this.state.isUserMenuOpen });
  }

  render() {
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
                {this.state.loading ? (
                  <AiOutlineLoading />
                ) : (
                  <img
                    className="h-full w-full rounded-full mx-auto object-cover"
                    src={
                      this.state.authUser.photoURL
                        ? `${this.state.authUser.photoURL}`
                        : `${defaultImage}`
                    }
                    alt="userImg"
                    onClick={() => this.handleUserMenuExpand()}
                  />
                )}
              </li>
            </ul>
          </nav>
        </div>

        {this.state.isSidebarOpen === true ? <Sidebar /> : null}
        {this.state.isUserMenuOpen === true ? (
          <div className="w-64 max-h-50 absolute right-0 mr-2">
            <div className="bg-white rounded overflow-hidden shadow-lg">
              <div className="text-center p-6 border-b">
                <img
                  className="h-24 w-24 rounded-full mx-auto object-cover"
                  src={
                    this.state.authUser.photoURL
                      ? `${this.state.authUser.photoURL}`
                      : `${defaultImage}`
                  }
                  alt="user placeholder"
                />
                <p className="pt-2 text-lg font-semibold">User XYZ</p>
                <p className="text-sm text-gray-600">
                  {this.state.authUser.email}
                </p>
                <div className="mt-5">
                  <Link
                    to="/settings"
                    className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-700 hover:bg-gray-200"
                  >
                    Settings
                  </Link>
                </div>
              </div>
              <div>
                <Link
                  to="/FAQ"
                  className="px-4 py-2 pb-4 hover:bg-gray-100 flex"
                >
                  <p className="text-sm font-medium text-gray-800 leading-none">
                    FAQ
                  </p>
                </Link>
                <div className="px-4 py-2 pb-4 hover:bg-gray-100 flex">
                  <SignOutButton />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withFirebase(Navigation);
