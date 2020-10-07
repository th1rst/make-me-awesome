import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LiveActivity from "./pages/LiveActivity";
import AllActivities from "./pages/AllActivities";
import Settings from "./pages/Settings";
import Overview from "./pages/Overview";
import Error404 from "./pages/Error404";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import withAuthentication from "./components/Session/withAuthentication";

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={SignUpPage} />
    <Route exact path="/forgot" component={ForgotPasswordPage} />
    <Route exact path="/activity" component={LiveActivity} />
    <Route exact path="/all-activities" component={AllActivities} />
    <Route exact path="/settings" component={Settings} />
    <Route exact path="/overview" component={Overview} />
    <Route exact path="/FAQ" component={FAQ} />
    <Route exact path="/termsofservice" component={TermsOfService} />
    <Route exact path="/privacypolicy" component={PrivacyPolicy} />
    <Route component={Error404} />
  </Switch>
);

export default withAuthentication(App);
