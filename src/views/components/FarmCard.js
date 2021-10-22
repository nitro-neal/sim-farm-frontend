import React, { useEffect } from "react";
import "../../App.css";
import { harvest } from "../../hooks/coininfo";
import { getBalanceNumber } from "../../utils/util";

const FarmCard = (props) => {
  let value = 0;
  function handleChange(event) {
    value = parseInt(event.target.value);
  }

  let button;

  if (props.wallet.status === "disconnected") {
    // buttonText = "Approve";
    button = (
      <div
        class="farm-info-item"
        style={{ paddingTop: "30px", width: "49%", height: "65px" }}
      >
        <button class="button button1" onClick={() => props.wallet.connect()}>
          Unlock Wallet
        </button>
      </div>
    );
  } else if (props.wallet.status === "connected") {
    if (getBalanceNumber(props.farm.needsApproval) === 0) {
      button = (
        <div
          class="farm-info-item"
          style={{ paddingTop: "30px", width: "49%", height: "65px" }}
        >
          <button
            class="button button1"
            onClick={() =>
              props.parentFarm.approve(props.farm.lpAddress, props.wallet)
            }
          >
            Approve
          </button>
        </div>
      );
    } else {
      button = (
        <>
          <div class="farm-info-item" style={{ width: "98%", height: "60px" }}>
            <p style={{ marginLeft: "25px" }}>CORN Earned:</p>
            <p style={{ marginLeft: "25px" }}>
              {getBalanceNumber(props.farm.balance)}
            </p>
          </div>

          <div
            class="farm-info-item"
            style={{
              width: "98%",
              height: "60px",
            }}
          >
            <button
              class="button button1"
              style={{ marginLeft: "auto", marginRight: "auto" }}
              onClick={() =>
                props.parentFarm.harvest(props.farm.pid, props.wallet)
              }
            >
              Harvest
            </button>
          </div>

          <div
            class="farm-info-item"
            style={{ width: "98%", height: "35px", paddingTop: "20px" }}
          >
            <input
              style={{ marginLeft: "auto", marginRight: "auto" }}
              type="text"
              placeholder="Amount (in gwei)"
              onChange={handleChange}
            />
          </div>

          <div class="farm-info-item" style={{ width: "45%", height: "45px" }}>
            <button
              style={{ fontSize: "12px" }}
              class="button button1"
              onClick={() =>
                props.parentFarm.deposit(props.farm.pid, value, props.wallet)
              }
            >
              Deposit
            </button>
          </div>

          <div class="farm-info-item" style={{ width: "45%", height: "45px" }}>
            <button
              style={{ fontSize: "12px" }}
              class="button button1"
              onClick={() =>
                props.parentFarm.withdraw(props.farm.pid, value, props.wallet)
              }
            >
              Withdraw
            </button>
          </div>
        </>
      );
    }
  }

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
            <p style={{ fontSize: "20px", marginRight: "25px" }}>
              {props.farm.lpSymbol} LP
            </p>
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

        {button}
      </div>
    </div>
  );
};

export default FarmCard;
