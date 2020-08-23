import React, { Component } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      isSidebarOpen: false,
    };
  }

  handleSidebarExpand() {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
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
                <h1 className="pl-8 lg:pl-0 text-gray-700">Make Me Awesome</h1>
              </li>
            </ul>

            <ul className="flex items-center">
              <li className="pr-6 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-bell"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </li>
              <li className="h-10 w-10 cursor-pointer">
                <img
                  className="h-full w-full rounded-full mx-auto object-cover"
                  src="https://images.unsplash.com/photo-1592439120548-78ea7b42398e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                  alt="robot placeholder"
                />
              </li>
            </ul>
          </nav>
        </div>

        {this.state.isSidebarOpen === true ? <Sidebar /> : null}
      </div>
    );
  }
}
