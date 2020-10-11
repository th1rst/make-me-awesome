import React, { Component } from "react";
import { FaGithubSquare, FaHeart, FaReact, FaLinkedin } from "react-icons/fa";
import { GrMail } from "react-icons/gr";

export default class Footer extends Component {
  render() {
    const EMAIL = process.env.REACT_APP_MAIL_ADDRESS;
    return (
      <div className="relative left-0 right-0 bottom-0">
        <footer className="w-full">
          <div className="px-4 pt-3 pb-4 border-b mx-4 border-gray-300"></div>
          <div className="flex items-center justify-between my-4">
            <p className="px-4 text-blue-500">All rights reserved</p>
            <p className="inline-flex text-blue-500">
              Built with
              <FaHeart className="w-4 h-4 mx-1 mt-1 text-red-600" />
              with
              <FaReact className="w-4 h-4 mx-1 mt-1 text-blue-400" />
              by th1rst.
            </p>
            <div className="flex items-center">
              <a href="https://github.com/th1rst">
                <FaGithubSquare className="h-6 w-6 text-blue-600 mr-6" />
              </a>

              <a
                href={`mailto:${EMAIL}?subject=Hey,%20I%20like%20your%20page,%20let's%20get%20in%20touch!`}
              >
                <GrMail className="h-6 w-6 text-blue-600 mr-6" />
              </a>
              <a>
                <FaLinkedin className="h-6 w-6 fill-current text-blue-600 mr-6" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
