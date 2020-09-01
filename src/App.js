import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withFirebase } from "./components/Firebase/context";
import Home from "./pages/Home";
import Activity from "./pages/Activity";
import Settings from "./pages/Settings";
import Overview from "./pages/Overview";
import Error404 from "./pages/Error404";
import Personal from "./pages/Personal";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FirebaseTest from "./pages/FirebaseTest";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/personal" component={Personal} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/forgot" component={ForgotPasswordPage} />
        <Route exact path="/activity" component={Activity} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/overview" component={Overview} />
        <Route exact path="/FAQ" component={FAQ} />
        <Route exact path="/termsofservice" component={TermsOfService} />
        <Route exact path="/privacypolicy" component={PrivacyPolicy} />
        <Route exact path="/firebasetest" component={FirebaseTest} />
        <Route component={Error404} />
      </Switch>
    );
  }
}

export default withFirebase(App);
