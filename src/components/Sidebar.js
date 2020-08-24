import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <div className="min-h-50 flex w-full max-w-xs p-4 bg-white absolute">
          <ul className="flex flex-col w-full">
            <li className="my-px">
              <a
                href="#"
                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 bg-gray-100"
              >
                <span className="flex items-center justify-center text-lg text-gray-400">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </span>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li className="my-px">
              <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">
                Projects
              </span>
            </li>
            <li className="my-px">
              <a
                href="#"
                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <span className="flex items-center justify-center text-lg text-gray-400">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </span>
                <span className="ml-3">Activities</span>
              </a>
            </li>
            <li className="my-px">
              <a
                href="#"
                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <span className="flex items-center justify-center text-lg text-green-400">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </span>
                <span className="ml-3">Add new</span>
              </a>
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
              <a
                href="#"
                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <span className="flex items-center justify-center text-lg text-red-400">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                  </svg>
                </span>
                <span className="ml-3">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
