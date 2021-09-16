import { useEffect, useState } from "react";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { getContract, getContractWithWallet } from "../utils/web3helper";
import ERC20 from "../constants/abis/ERC20.json";
import GooseTokenAbi from "../constants/abis/GooseTokenAbi.json";
import MasterChefAbi from "../constants/abis/MasterChefAbi.json";
import multicall from "../utils/multicall";
import {
  GOOSE_COIN_ADDRESS,
  MASTER_CHEF_ADDRESS,
  FARMS,
} from "../constants/constants";

export const getGoosePriceUSD = () => {
  return new BigNumber(10);
};

export const getEggPerBlock = () => {
  const [eggPerBlock, setEggPerBlock] = useState(new BigNumber(0));

  useEffect(() => {
    const fetchEggPerBlock = async () => {
      const contract = getContract(MasterChefAbi, MASTER_CHEF_ADDRESS);
      let epb = await contract.methods.eggPerBlock().call();
      setEggPerBlock(new BigNumber(epb));
    };
    fetchEggPerBlock();
  }, []);

  return eggPerBlock;
};

export const getTokenBalance = (account) => {
  const [balance, setBalance] = useState(new BigNumber(0));

  useEffect(() => {
    const fetchBalance = async () => {
      let res;
      const contract = getContract(ERC20, GOOSE_COIN_ADDRESS);
      try {
        const balance = await contract.methods.balanceOf(account).call();
        res = balance;
      } catch (e) {
        res = "0";
      }
      setBalance(new BigNumber(res));
    };

    if (account) {
      fetchBalance();
    }
  }, [account]);

  return balance;
};

export const getTotalSupply = (tokenAddress) => {
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(GooseTokenAbi, GOOSE_COIN_ADDRESS);
      const supply = await cakeContract.methods.totalSupply().call();
      setTotalSupply(new BigNumber(supply));
    }

    fetchTotalSupply();
  }, [tokenAddress]);

  return totalSupply;
};

export const getBurnedBalance = (tokenAddress) => {
  const [balance, setBalance] = useState(new BigNumber(0));

  useEffect(() => {
    const fetchBalance = async () => {
      const cakeContract = getContract(GooseTokenAbi, GOOSE_COIN_ADDRESS);
      const bal = await cakeContract.methods
        .balanceOf("0x000000000000000000000000000000000000dEaD")
        .call();
      setBalance(new BigNumber(bal));
    };

    fetchBalance();
  }, [tokenAddress]);

  return balance;
};

export const getFarmsWithBalance = (account) => {
  const [farmsWithBalances, setFarmsWithBalances] = useState([]);
  useEffect(() => {
    const fetchBalances = async () => {
      const calls = FARMS.map((farm) => ({
        address: MASTER_CHEF_ADDRESS,
        name: "pendingEgg",
        params: [farm.pid, account],
      }));

      const rawResults = await multicall(MasterChefAbi, calls);
      const results = FARMS.map((farm, index) => ({
        ...farm,
        balance: new BigNumber(rawResults[index]),
      }));

      setFarmsWithBalances(results);
    };

    if (account) {
      fetchBalances();
    }
  }, [account]);

  return farmsWithBalances;
};

export const approve = async (lpAddress, wallet) => {
  var web3 = new Web3(wallet.ethereum);
  const lpContract = new web3.eth.Contract(ERC20, lpAddress);
  let result = await lpContract.methods
    .approve(MASTER_CHEF_ADDRESS, ethers.constants.MaxUint256)
    .send({ from: wallet.account });

  console.log({ result });
};

export const deposit = async (pid, amount, wallet) => {
  const web3 = new Web3(wallet.ethereum);
  const contract = new web3.eth.Contract(MasterChefAbi, MASTER_CHEF_ADDRESS);

  // TODO: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
  let result = await contract.methods
    .deposit(pid, "" + amount)
    .send({ from: wallet.account });

  console.log({ result });
};

export const harvest = async (farmPid, wallet) => {
  const web3 = new Web3(wallet.ethereum);
  const contract = new web3.eth.Contract(MasterChefAbi, MASTER_CHEF_ADDRESS);
  let result = await contract.methods
    .deposit(farmPid, "0")
    .send({ from: wallet.account });

  console.log({ result });
};