import React, { useEffect } from "react";
import "../../App.css";

const FarmCard = () => {
  return (
    <div class="farm-flex-item">
      <div class="farm-info-container ">
        <div class="farm-info-item" style={{ width: "33%", height: "100px" }}>
          <img
            style={{ width: "70px", height: "70px", margin: "auto" }}
            src="/bitcorn.png"
          ></img>
        </div>
        <div class="farm-info-item" style={{ width: "65%", height: "100px" }}>
          <div style={{ margin: "auto" }}>
            <p style={{ fontSize: "20px" }}>CORN-BUSD LP</p>
          </div>
        </div>

        <div class="farm-info-item" style={{ width: "49%", height: "30px" }}>
          <p style={{ marginLeft: "25px" }}>APR:</p>
        </div>
        <div class="farm-info-item" style={{ width: "49%", height: "30px" }}>
          <p style={{ marginRight: "25px" }}>133%</p>
        </div>
        <div class="farm-info-item" style={{ width: "49%", height: "30px" }}>
          <p style={{ marginLeft: "25px" }}>Stake:</p>
        </div>
        <div class="farm-info-item" style={{ width: "49%", height: "30px" }}>
          <p style={{ marginRight: "25px", fontSize: "14px" }}>CORN-BUSD LP</p>
        </div>
        <div class="farm-info-item" style={{ width: "49%", height: "30px" }}>
          <p style={{ marginLeft: "25px" }}>Earn:</p>
        </div>
        <div class="farm-info-item" style={{ width: "49%", height: "30px" }}>
          <p style={{ marginRight: "25px" }}>CORN</p>
        </div>
        <div class="farm-info-item" style={{ width: "49%", height: "30px" }}>
          <p style={{ marginLeft: "25px" }}>Deposit Fee:</p>
        </div>
        <div class="farm-info-item" style={{ width: "49%", height: "30px" }}>
          <p style={{ marginRight: "25px" }}>0%</p>
        </div>

        {/* <div class="farm-info-item" style={{ width: "49%", height: "50px" }}>
          <p>BITCORN Earned:</p>
        </div> */}

        <div
          class="farm-info-item"
          style={{ paddingTop: "30px", width: "49%", height: "65px" }}
        >
          <button class="button button1">Harvest</button>
        </div>
      </div>
    </div>
  );
};

export default FarmCard;
