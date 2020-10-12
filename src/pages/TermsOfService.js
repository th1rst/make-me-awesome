import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TermsOfService extends Component {
  render() {
    return (
      <div>
        <div className="flex justify-center">
          <div className="mt-4 w-2/3 h-auto text-justify">
            <h1 className="text-2xl text-center font-bold mb-10">
              Terms of Service
            </h1>

            <p>
              Please read these terms of service ("terms", "terms of service")
              carefully before using our website
            </p>
            <br />

            <h2 className="font-bold">Conditions of Use</h2>

            <p>
              We will provide their services to you, which are subject to the
              conditions stated below in this document. Every time you visit
              this website, use its services or make a purchase, you accept the
              following conditions. This is why we urge you to read them
              carefully.
            </p>

            <h2 className="font-bold mt-6">Privacy Policy</h2>

            <p>
              Before you continue using our website we advise you to read our{" "}
              <Link to="/privacypolicy">privacy policy</Link> regarding our user
              data collection. It will help you better understand our practices.
            </p>

            <h2 className="font-bold mt-6">Copyright</h2>

            <p>
              Content published on this website (digital downloads, images,
              texts, graphics, logos) is the property of MakeMeAwesome and/or
              its content creators and protected by international copyright
              laws.
            </p>

            <h2 className="font-bold mt-6">Communications</h2>

            <p>
              The entire communication with us is electronic. Every time you
              send us an email or visit our website, you are going to be
              communicating with us. You hereby consent to receive
              communications from us. If you subscribe to the news on our
              website, you are going to receive regular emails from us. We will
              continue to communicate with you by posting news and notices on
              our website and by sending you emails. You also agree that all
              notices, disclosures, agreements and other communications we
              provide to you electronically meet the legal requirements that
              such communications be in writing.
            </p>

            <h2 className="font-bold mt-6">Applicable Law</h2>

            <p>
              By visiting this website, you agree that the laws of the [your
              location], without regard to principles of conflict laws, will
              govern these terms of service, or any dispute of any sort that
              might come between MakeMeAwesome and you, or its business partners
              and associates.
            </p>

            <h2 className="font-bold mt-6">Disputes</h2>

            <p>
              Any dispute related in any way to your visit to this website or to
              products you purchase from us shall be arbitrated by state or
              federal court and you consent to exclusive jurisdiction and venue
              of such courts.
            </p>

            <h2 className="font-bold mt-6">Comments, Reviews, and Emails</h2>

            <p>
              Visitors may post content as long as it is not obscene, illegal,
              defamatory, threatening, infringing of intellectual property
              rights, invasive of privacy or injurious in any other way to third
              parties. Content has to be free of software viruses, political
              campaign, and commercial solicitation.
              <br />
              We reserve all rights (but not the obligation) to remove and/or
              edit such content. When you post your content, you grant
              MakeMeAwesome non-exclusive, royalty-free and irrevocable right to
              use, reproduce, publish, modify such content throughout the world
              in any media.
            </p>

            <h2 className="font-bold mt-6">License and Site Access</h2>

            <p>
              We grant you a limited license to access and make personal use of
              this website. You are not allowed to download or modify it. This
              may be done only with written consent from us.
            </p>

            <h2 className="font-bold mt-6">User Account</h2>
            <p className="mb-20">
              If you are an owner of an account on this website, you are solely
              responsible for maintaining the confidentiality of your private
              user details (username and password). You are responsible for all
              activities that occur under your account or password.
              <br />
              We reserve all rights to terminate accounts, edit or remove
              content and cancel orders in their sole discretion.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
