import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";

const Covidapi = () => {
  // const { currentUser } = useContext(AuthContext);

  // if (!currentUser) {
  //     return <Redirect to="/login" />;
  // }
  

  return (
    <div>
      <div class="container">
        <div class="col">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
      </div>
      <div class="container">
        <div class="row g-3">
          <div class="col-6">
            <div class="p-3 border bg-light">Custom column padding</div>
          </div>
          <div class="col-6">
            <div class="p-3 border bg-light">Custom column padding</div>
          </div>
          <div class="col-6">
            <div class="p-3 border bg-light">Custom column padding</div>
          </div>
          <div class="col-6">
            <div class="p-3 border bg-light">Custom column padding</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Covidapi;
