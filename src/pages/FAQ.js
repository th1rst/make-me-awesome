import React, { Component } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default class FAQ extends Component {
  render() {
    return (
      <>
        <div className="w-full min-h-screen">
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
                      What is this?
                    </summary>

                    <span className="text-justify text-center">
                      <p>
                        <b>Make Me Awesome </b> is a personal activity and
                        productivity tracker.
                      </p>
                    </span>
                  </details>
                  <details className="mb-4">
                    <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                      How can i use it?
                    </summary>

                    <span className="text-justify text-center">
                      There are two ways to input your daily activities:
                      <ul>
                        <li>
                          <br />
                          <b>Live Activity:</b>
                          <br />
                          First, you have to label your activity into a
                          category: <br />
                          Productive / Neutral / Unproductive
                          <br />
                          <br />
                          There's a Stopwatch for you to track your current
                          activity. When you're done, just press save and send
                          the activity data to our Server.
                          <br />
                          Alternatively, you can youse a Counter.
                          <br />
                          Just specify how long <i>ActivityName</i> took and how
                          often you've done it. The total duration gets
                          calculated for you. When you're done, just send the
                          activity data to our Server.
                        </li>
                        <li>
                          <br />
                          <b>Manual Activity:</b>
                          <br />
                          Here you can add activities that have already taken
                          place and you have full control over what data is
                          being used (e.g. date / total duration)
                        </li>
                      </ul>
                    </span>
                  </details>
                  <details className="mb-4">
                    <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                      Why should I use it?
                    </summary>

                    <span className="text-justify text-center">
                      <p>
                        At first, it might not seem very useful, but think of it
                        like a fine wine: the more it matures, the more awesome
                        it gets. In other words: the more activitíes you enter,
                        the better the overview about your productiveness will
                        get.
                        <br />
                        <br />
                        Over time, you'll have an amazing overview about your
                        productive strengths and weaknesses.
                        <br />
                        <br />
                        To get a good idea about how an account filled with
                        activity data can look like, login with the following
                        credentials:
                        <br />
                        <br />
                        <b>Username: </b> <i>john@doe.com</i>
                        <br />
                        <b>Password: </b> <i>testuser123</i>
                      </p>
                    </span>
                  </details>
                </div>
                <div className="w-full lg:w-1/2 px-4 py-2">
                  <details className="mb-4">
                    <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                      Why did my activities not count as one?
                    </summary>

                    <span className="text-justify text-center">
                      <p>
                        While case doesn't matter (e.g. <i>"Watching TV") </i>
                        and <i>"WaTcHiNG tV"</i> get counted as one activity,
                        "Browsing the web" and "Browsing" will get counted as
                        seperate activities. <br />
                        <br />
                        It's best practice to keep the names the same.
                      </p>
                    </span>
                  </details>
                  <details className="mb-4">
                    <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                      What are QuickActivities?
                    </summary>

                    <span className="text-justify text-center">
                      <p>
                        <b>They are pre-defined activities.</b>
                        <br />
                        <br />
                        Everyone has certain activities that are being done
                        everyday (for example{" "}
                        <i>"Cooking Dinner for 30 minutes"</i> or{" "}
                        <i>"Workout for 60 minutes"</i>).
                        <br />
                        You can define them once and they get added to your
                        personal Overview. Once set up, you just have to click
                        on the plus-icon and they automatically get tracked.
                      </p>
                    </span>
                  </details>
                  <details className="mb-4">
                    <summary className="cursor-pointer bg-blue-600 text-white font-semibold text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500 rounded-md py-2 px-4">
                      Will there be more features in the future?
                    </summary>

                    <span className="text-justify text-center">
                      <p>
                        <b>Absolutely!</b>
                        <br />
                        <br />
                        We are always looking to improve this site.
                        <br />
                        If you have any criticism or suggestions, just click on
                        the little email icon on the bottom of the page and send
                        us an email. Don't be shy! We have cookies.
                      </p>
                    </span>
                  </details>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  }
}
