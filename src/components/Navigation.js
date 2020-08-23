import React, { Component } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import UserOverview from "./UserOverview";

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      isSidebarOpen: false,
      isUserMenuOpen: false,
    };
  }

  handleSidebarExpand() {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
  }

  handleUserMenuExpand() {
    this.setState({ isUserMenuOpen: !this.state.isUserMenuOpen });
  }

  render() {
    return (
      <div>
        <div className="flex-1 flex flex-col">
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
                <h1 className="pl-8 lg:pl-0 font-bold text-gray-700">
                  Make Me Awesome
                </h1>
              </li>
            </ul>

            <ul className="flex items-center">
              <li className="h-10 w-10 cursor-pointer">
                <img
                  className="h-full w-full rounded-full mx-auto object-cover"
                  src="https://images.unsplash.com/photo-1592439120548-78ea7b42398e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                  alt="robot placeholder"
                  onClick={() => this.handleUserMenuExpand()}
                />
              </li>
            </ul>
          </nav>
        </div>

        {this.state.isSidebarOpen === true ? <Sidebar /> : null}
        {this.state.isUserMenuOpen === true ? <UserOverview /> : null}
      </div>
    );
  }
}
