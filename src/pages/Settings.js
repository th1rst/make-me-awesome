import React, { Component } from "react";
import withAuthorization from "../components/Session/withAuthorization";
import Navigation from "../components/Navigation";
import ChangeEmailForm from "../components/Settings/ChangeEmailForm";
import ChangeProfilePicForm from "../components/Settings/ChangeProfilePicForm";
import QuickActivitySettings from "../components/Settings/QuickActivitySettings";
import { Card, Accordion, AccordionSection } from "react-rainbow-components";
import { FaRegUser, FaStar, FaKey } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { AiOutlinePicture } from "react-icons/ai"
import BannerPictureForm from "../components/Settings/BannerPictureForm";
import ChangePasswordForm from "../components/Settings/ChangePasswordForm";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
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
                <AccordionSection
                  icon={<FaRegUser className="inline-flex text-blue-400" />}
                  label="Profile Picture"
                >
                  <ChangeProfilePicForm />
                </AccordionSection>
                <AccordionSection
                  icon={<AiOutlinePicture className="inline-flex text-blue-400" />}
                  label="Banner Picture"
                >
                  <BannerPictureForm />
                </AccordionSection>
                <AccordionSection
                  icon={<GrMail className="inline-flex text-blue-400" />}
                  label="Change Your Email Address"
                >
                  <ChangeEmailForm />
                </AccordionSection>
                <AccordionSection
                  icon={<FaKey className="inline-flex text-blue-400" />}
                  label="Change Your Password"
                >
                  <ChangePasswordForm />
                </AccordionSection>
                <AccordionSection
                  icon={<FaStar className="inline-flex text-blue-400" />}
                  label="QuickActivities"
                >
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
