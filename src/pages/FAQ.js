import React, { Component } from "react";
import Navigation from "../components/Navigation";

export default class FAQ extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <section className="text-gray-700">
          <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                The most common questions about how to operate this WebApp
              </p>
            </div>
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              <div className="w-full lg:w-1/2 px-4 py-2">
                <details className="mb-4">
                  <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                    Question 1?
                  </summary>

                  <span>
                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                    minim velit nostrud pariatur culpa magna in aute.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                    Question 2?
                  </summary>

                  <span>
                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                    minim velit nostrud pariatur culpa magna in aute.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                    Question 3?
                  </summary>

                  <span>
                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                    minim velit nostrud pariatur culpa magna in aute.
                  </span>
                </details>
              </div>
              <div className="w-full lg:w-1/2 px-4 py-2">
                <details className="mb-4">
                  <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                    Question 4?
                  </summary>

                  <span>
                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                    minim velit nostrud pariatur culpa magna in aute.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                    Question 5?
                  </summary>

                  <span>
                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                    minim velit nostrud pariatur culpa magna in aute.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                    Question 6?
                  </summary>

                  <span>
                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                    minim velit nostrud pariatur culpa magna in aute.
                  </span>
                </details>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
