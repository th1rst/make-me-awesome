import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserOverview extends Component {
  render() {
    return (
      <div className="w-64 max-h-50 absolute right-0 mr-2">
        <div className="bg-white rounded overflow-hidden shadow-lg">
          <div className="text-center p-6 border-b">
            <img
              className="h-24 w-24 rounded-full mx-auto object-cover"
              src="https://images.unsplash.com/photo-1592439120548-78ea7b42398e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
              alt="user placeholder"
            />
            <p className="pt-2 text-lg font-semibold">User XYZ</p>
            <p className="text-sm text-gray-600">userxyz@gmail.com</p>
            <div className="mt-5">
              <Link
                to="/settings"
                className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-700 hover:bg-gray-100"
              >
                Manage Account
              </Link>
            </div>
          </div>
          <div>
            <Link to="/FAQ" className="px-4 py-2 pb-4 hover:bg-gray-100 flex">
              <p className="text-sm font-medium text-gray-800 leading-none">
                FAQ
              </p>
            </Link>
            <a href="#" className="px-4 py-2 pb-4 hover:bg-gray-100 flex">
              <p className="text-sm font-medium text-gray-800 leading-none">
                Logout
              </p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
