import React from "react";
import FirebaseContext from "../components/Firebase/context";

export default function FirebaseTest() {
  return (
    <div>
      <FirebaseContext.Consumer>
        {(firebase) => {
          return <div>I have access to Firebase!!!111</div>;
        }}
      </FirebaseContext.Consumer>
    </div>
  );
}
