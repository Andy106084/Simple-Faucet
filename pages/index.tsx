import { useState } from "react";
import Web3 from "web3";

import Faucet from "../truffle/build/contracts/Faucet.json";


declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const [account, setAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Login, setLogin] = useState(false);
  // 初始化 web3、account、contract
  const connect = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setLogin(true);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };
  const takemoney = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const abi = Faucet.abi.map((item: any) => {
        return {
          inputs: item.inputs,
          name: item.name,
          outputs: item.outputs,
          stateMutability: item.stateMutability,
          type: item.type,
        };
      });
      if (web3) {
        const FaucetContract = new web3.eth.Contract(
          abi,
          process.env.NEXT_PUBLIC_FaucetContractAddress
        );
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.accounts.privateKeyToAccount(
          `${process.env.NEXT_PUBLIC_UserKey}`
        );
        web3.eth.accounts.wallet.add(accounts);
        console.log(accounts.address);
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = 3000000;
        const allTasks = await FaucetContract.methods
          .requestTokens(account)
          .send({
            from: accounts.address,
            gasPrice,
            gas: gasLimit,
          });
        console.log(allTasks);
      }
    } catch (error: any) {
      console.log("錯誤:", error);
    }
  };
  return (
    <div>
      <h1>Simple Faucet</h1>
      <p>Account: {account}</p>
      <button onClick={connect}>Connect Wallet</button>
      {Login ? <button onClick={takemoney}>Take Ethers</button> : null}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
