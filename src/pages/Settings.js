import React from "react";
import withAuthorization from "../components/Session/withAuthorization";
import Navigation from "../components/Navigation";
import ChangeEmailForm from "../components/Settings/ChangeEmailForm";
import ChangeProfilePicForm from "../components/Settings/ChangeProfilePicForm";
import QuickActivitySettings from "../components/Settings/QuickActivitySettings";
import { Card, Accordion, AccordionSection } from "react-rainbow-components";
import { FaRegUser, FaStar, FaKey } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { AiOutlinePicture } from "react-icons/ai";
import ChangeBannerPictureForm from "../components/Settings/ChangeBannerPictureForm";
import ChangePasswordForm from "../components/Settings/ChangePasswordForm";
import Footer from "../components/Footer";

function Settings() {
  return (
    <div>
      <div className="w-auto min-h-screen">
        <Navigation />
        <div className="my-8 flex justify-center items-center">
          <h1 className="text-center font-bold text-4xl md:text-5xl max-w-xl text-gray-900">
            Settings
          </h1>
        </div>
        <div className="rainbow-m-around_xx-large px-2">
          <Card className="w-full md:w-3/4 mx-auto">
            <Accordion>
              <AccordionSection
                icon={<FaStar className="inline-flex text-blue-400" />}
                label="Edit QuickActivities"
              >
                <QuickActivitySettings />
              </AccordionSection>
              <AccordionSection
                icon={<FaRegUser className="inline-flex text-blue-400" />}
                label="Change Profile Picture"
              >
                <ChangeProfilePicForm />
              </AccordionSection>
              <AccordionSection
                icon={
                  <AiOutlinePicture className="inline-flex text-blue-400" />
                }
                label="Change Banner Picture"
              >
                <ChangeBannerPictureForm />
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
            </Accordion>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Settings);
