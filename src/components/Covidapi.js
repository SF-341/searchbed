import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";




const Covidapi = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://covid19.ddc.moph.go.th/api/Cases/today-cases-all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }).then((response) => response.json())
      .then(result => {
        setItems(result[0]);       
      })
  }, [])


  //const { currentUser } = useContext(AuthContext);

  // if (!currentUser) {
  //     return <Redirect to="/login" />;
  // }


  return (
    <div>
      <div class="container">
        <div class="col">
          <div class="p-3 border bg-light">{items.txn_date}</div>
        </div>
      </div>
      <div class="container">
        <div class="row g-3">
          <div class="col-6">
            <div class="p-3 border bg-light">New case {items.new_case}</div>
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
