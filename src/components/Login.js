import React, { Component } from "react";
import { Link}  from "react-router-dom"

export default class Login extends Component {
  render() {
    return (
      <div>
        <div class="container mt-20 max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow-lg overflow-hidden border-4">
          <div class="relative hidden xl:block xl:w-1/2 h-full">
            <img
              class="absolute h-auto w-full object-cover"
              src="https://images.unsplash.com/photo-1504432842672-1a79f78e4084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
              alt="my zomato"
            />
          </div>
          <div class="w-full xl:w-1/2 p-8">
            <form method="post" action="#" onSubmit="return false">
              <h1 class=" text-2xl font-bold">Sign in to your account</h1>
              <div>
                <span class="text-gray-600 text-sm">
                  Don't have an account?
                </span>
                <span class="text-gray-700 text-sm font-semibold"><Link to="/signup"> Sign up</Link></span>
              </div>
              <div class="mb-4 mt-6">
                <label
                  class="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="email"
                  type="text"
                  placeholder="Your email address"
                />
              </div>
              <div class="mb-6 mt-6">
                <label
                  class="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  class="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="password"
                  type="password"
                  placeholder="Your password"
                />
                <a
                  class="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
                  href="/forgot"
                >
                  Forgot Password?
                </a>
              </div>
              <div class="flex w-full mt-8">
                <button
                  class="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                  type="button"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
