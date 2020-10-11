import React, { Component } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default class PrivacyPolicy extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="flex justify-center">
          <div className="mt-4 w-2/3 h-auto text-justify">
            <h1 className="text-2xl text-center font-bold mb-2">
              Privacy Policy for MakeMeAwesome
            </h1>

            <p>
              At MakeMeAwesome, one of our main priorities is the privacy of our
              visitors. This Privacy Policy document contains types of
              information that is collected and recorded by MakeMeAwesome and
              how we use it.
            </p>
            <br />
            <p>
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to contact us.
            </p>

            <p>
              This Privacy Policy applies only to our online activities and is
              valid for visitors to our website with regards to the information
              that they shared and/or collect in MakeMeAwesome. This policy is
              not applicable to any information collected offline or via
              channels other than this website.
            </p>

            <h2 className="mt-4 text-xl text-center font-bold">Consent</h2>

            <h2 className="font-bold">Information we collect</h2>

            <p>
              The personal information that you are asked to provide, and the
              reasons why you are asked to provide it, will be made clear to you
              at the point we ask you to provide your personal information.
              <br />
              If you contact us directly, we may receive additional information
              about you such as your name, email address, phone number, the
              contents of the message and/or attachments you may send us, and
              any other information you may choose to provide.
              <br />
              When you register for an Account, we may ask for your contact
              information, including items such as name, company name, address,
              email address, and telephone number.
            </p>

            <h2 className="font-bold mt-6">Log Files</h2>

            <p>
              MakeMeAwesome follows a standard procedure of using log files.
              These files log visitors when they visit websites. All hosting
              companies do this and a part of hosting services' analytics. The
              information collected by log files include internet protocol (IP)
              addresses, browser type, Internet Service Provider (ISP), date and
              time stamp, referring/exit pages, and possibly the number of
              clicks. These are not linked to any information that is personally
              identifiable. The purpose of the information is for analyzing
              trends, administering the site, tracking users' movement on the
              website, and gathering demographic information.
            </p>

            <h2 className="font-bold mt-6">
              Advertising Partners Privacy Policies
            </h2>

            <p>
              You may consult this list to find the Privacy Policy for each of
              the advertising partners of MakeMeAwesome.
              <br />
              Third-party ad servers or ad networks uses technologies like
              cookies, JavaScript, or Web Beacons that are used in their
              respective advertisements and links that appear on MakeMeAwesome,
              which are sent directly to users' browser. They automatically
              receive your IP address when this occurs. These technologies are
              used to measure the effectiveness of their advertising campaigns
              and/or to personalize the advertising content that you see on
              websites that you visit.
              <br />
              Note that MakeMeAwesome has no access to or control over these
              cookies that are used by third-party advertisers.
            </p>

            <h2 className="font-bold mt-6">Third Party Privacy Policies</h2>

            <p>
              MakeMeAwesome's Privacy Policy does not apply to other advertisers
              or websites. Thus, we are advising you to consult the respective
              Privacy Policies of these third-party ad servers for more detailed
              information. It may include their practices and instructions about
              how to opt-out of certain options. <br />
              You can choose to disable cookies through your individual browser
              options. To know more detailed information about cookie management
              with specific web browsers, it can be found at the browsers'
              respective websites.
            </p>

            <h2 className="font-bold mt-6">
              CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>

            <p>
              Under the CCPA, among other rights, California consumers have the
              right to:
              <br />
              Request that a business that collects a consumer's personal data
              disclose the categories and specific pieces of personal data that
              a business has collected about consumers.
              <br />
              Request that a business delete any personal data about the
              consumer that a business has collected.
              <br />
              Request that a business that sells a consumer's personal data, not
              sell the consumer's personal data.
              <br />
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us.
            </p>

            <h2 className="font-bold mt-6">GDPR Data Protection Rights</h2>

            <p>
              We would like to make sure you are fully aware of all of your data
              protection rights. Every user is entitled to the following:
              <br />
              The right to access – You have the right to request copies of your
              personal data. We may charge you a small fee for this service.
              <br />
              The right to rectification – You have the right to request that we
              correct any information you believe is inaccurate. You also have
              the right to request that we complete the information you believe
              is incomplete.
              <br />
              The right to erasure – You have the right to request that we erase
              your personal data, under certain conditions.
              <br />
              The right to restrict processing – You have the right to request
              that we restrict the processing of your personal data, under
              certain conditions.
              <br />
              The right to object to processing – You have the right to object
              to our processing of your personal data, under certain conditions.
              <br />
              The right to data portability – You have the right to request that
              we transfer the data that we have collected to another
              organization, or directly to you, under certain conditions.
              <br />
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us.
            </p>

            <h2 className="font-bold mt-6">Children's Information</h2>

            <p>
              Another part of our priority is adding protection for children
              while using the internet. We encourage parents and guardians to
              observe, participate in, and/or monitor and guide their online
              activity.
              <br />
              MakeMeAwesome does not knowingly collect any Personal Identifiable
              Information from children under the age of 13. If you think that
              your child provided this kind of information on our website, we
              strongly encourage you to contact us immediately and we will do
              our best efforts to promptly remove such information from our
              records.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
