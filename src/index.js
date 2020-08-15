import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './assets/main.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ActivityProvider } from "./context";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <React.StrictMode>
    <ActivityProvider>
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </ActivityProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
