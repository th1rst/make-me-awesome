import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ScrollToTop from "./components/ScrollToTop";
import Firebase from "./components/Firebase/Firebase";
import FirebaseContext from "./components/Firebase/context";
import { Windmill } from "@windmill/react-ui";
import customTheme from "./customWindmillTheme";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <Router>
        <ScrollToTop>
          <Windmill theme={customTheme}>
            <App />
          </Windmill>
        </ScrollToTop>
      </Router>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
