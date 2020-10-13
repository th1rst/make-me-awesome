import React, { Component } from "react";
import withAuthorization from "../components/Session/withAuthorization";
import Navigation from "../components/Navigation";
import ChangeEmailForm from "../components/Settings/ChangeEmailForm";
import ChangeProfilePicForm from "../components/Settings/ChangeProfilePicForm";
import QuickActivitySettings from "../components/Settings/QuickActivitySettings";
import { Card, Accordion, AccordionSection } from "react-rainbow-components";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      photoUrlInput: "",
      newEmailInput: "",
      currentEmailInput: "",
      showModal: false,
      errorMessage: "",
      successMessage: "",
    };
  }

  render() {
    return (
      <div>
        <div className="w-auto h-screen">
          <Navigation />
          <h1 className="mt-4 mb-8 text-4xl md:text-3xl underline font-semibold uppercase text-center">
            Settings
          </h1>
          <div className="rainbow-m-around_xx-large">
            <Card className="w-3/4 mx-auto">
              <Accordion>
                <AccordionSection label="Profile Picture">
                  <ChangeProfilePicForm />
                </AccordionSection>
                <AccordionSection label="Email Address">
                  <ChangeEmailForm />
                </AccordionSection>
                <AccordionSection label="QuickActivities">
                  <QuickActivitySettings />
                </AccordionSection>
              </Accordion>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Settings);
