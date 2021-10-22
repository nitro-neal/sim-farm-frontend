import React from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
import "./App.css";
import Home from "./views/Home";

// TODO: Add SVG Plugin for moving sun
// import KUTE from "kute.js";
// require("kute.js/kute-svg");

import { getBalanceNumber } from "./utils/util";
import BigNumber from "bignumber.js";

import {
  getBurnedBalance,
  getTotalSupply,
  getTokenBalance,
  getGoosePriceUSD,
  getEggPerBlock,
  getFarmsWithBalance,
  harvest,
  approve,
  deposit,
  withdraw,
} from "./hooks/coininfo";
import { GOOSE_COIN_ADDRESS, FARMS } from "./constants/constants";

const App = () => {
  const wallet = useWallet();

  const blockNumber = wallet.getBlockNumber();
  const eggPerBlock = getEggPerBlock();
  const totalSupply = getTotalSupply(GOOSE_COIN_ADDRESS);
  const burnedBalance = getBurnedBalance(GOOSE_COIN_ADDRESS);
  const eggPrice = getGoosePriceUSD();
  const tokenBalance = getTokenBalance(wallet.account);
  const farmBalances = getFarmsWithBalance(wallet.account);

  const eggSupply = totalSupply
    ? totalSupply.minus(burnedBalance)
    : new BigNumber(0);

  const marketCap = eggPrice.times(eggSupply);

  const farmBalancesHtml = farmBalances.map((farm, index) => (
    <div>
      <li>
        {farm.lpSymbol} - {getBalanceNumber(farm.balance)} -
      </li>
      <li>
        <button onClick={() => approve(farm.lpAddress, wallet)}>approve</button>
        <button onClick={() => deposit(farm.pid, 1, wallet)}>deposit</button>
        <button onClick={() => harvest(farm.pid, wallet)}>harvest</button>
      </li>
    </div>
  ));

  let farm = {};
  farm.blockNumber = blockNumber;
  farm.eggPerBlock = eggPerBlock;
  farm.totalSupply = totalSupply;
  farm.burnedBalance = burnedBalance;
  farm.eggPrice = eggPrice;
  farm.tokenBalance = tokenBalance;
  farm.farmBalances = farmBalances;
  farm.eggSupply = eggSupply;
  farm.marketCap = marketCap;
  farm.approve = approve;
  farm.deposit = deposit;
  farm.withdraw = withdraw;
  farm.harvest = harvest;

  if (!farm.farmBalances || farm.farmBalances.length === 0) {
    farm.farmBalances = FARMS;
  }

  return (
    <>
      <div class="bg"></div>
      <Home wallet={wallet} farm={farm}></Home>

      {/* <div class="bg">
        <div>
          <img
            class="sun"
            src="./sun1.svg"
            alt="triangle with all three sides equal"
            height="500"
            width="500"
          />
        </div>
        <div class="section">
          <h1>Wallet</h1>
          {wallet.status === "connected" ? (
            <div>
              <h2>Goose Details</h2>

              <div>Total Supply: {getBalanceNumber(eggSupply)}</div>
              <div>MarketCap: {getBalanceNumber(marketCap)} </div>
              <div>Total Burned: {getBalanceNumber(burnedBalance)}</div>
              <div>Egg Per Block: {getBalanceNumber(eggPerBlock)}</div>

              <h2>User Details</h2>
              <div>Account: {wallet.account}</div>
              <div>Matic Balance: {getBalanceNumber(wallet.balance)}</div>
              <div>Goose Coin Balance: {getBalanceNumber(tokenBalance)}</div>

              <h2>Farm Details</h2>
              <div>{farmBalancesHtml}</div>

              <hr />

              <button onClick={() => wallet.reset()}>disconnect</button>
            </div>
          ) : (
            <div>
              Connect:
              <button onClick={() => wallet.connect()}>MetaMask</button>
              <button onClick={() => wallet.connect("frame")}>Frame</button>
              <button onClick={() => wallet.connect("portis")}>Portis</button>
            </div>
          )}
        </div>
      </div> */}
    </>
  );
};

export default App;
