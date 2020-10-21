import React, { Component } from "react";
import { FaGithubSquare, FaHeart, FaReact } from "react-icons/fa";
import { GrMail } from "react-icons/gr";

const EMAIL = process.env.REACT_APP_MAIL_ADDRESS;

export default class Footer extends Component {
  render() {
    return (
      <div className="relative left-0 right-0 bottom-0">
        <footer className="w-full">
          <div className="px-4 pt-3 pb-4 border-b mx-4 border-gray-300" />
          <div className="flex items-center flex-wrap justify-around mx-10">
            <p className="my-2 m1-1 px-4 text-blue-500">
              &copy; All rights reserved.
            </p>
            <p className="my-2 inline-flex text-blue-500">
              Built with
              <FaHeart className="w-4 h-4 mx-1 mt-1 text-red-600" />
              with
              <a href="https://reactjs.org">
                <FaReact
                  className="w-4 h-4 mx-1 mt-1"
                  style={{ color: "#00b7ff" }}
                />
              </a>
              by th1rst.
            </p>
            <div className="my-2 flex">
              <a className="mx-auto" href="https://github.com/th1rst">
                <FaGithubSquare className="mx-2 h-6 w-6 text-blue-600" />
              </a>
              <a
                href={`mailto:${EMAIL}?subject=Hey,%20I%20like%20your%20page,%20let's%20get%20in%20touch!`}
              >
                <GrMail className="mx-2 h-6 w-6 text-blue-600" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
