import React, { useState, useEffect } from "react";
import From from "./From";
import To from "./To";
import Reminder from "./Reminder";
import SwitchModel from "../../Model/SwitchModel";
import { AiOutlineArrowDown } from "react-icons/ai";
import swal from "sweetalert";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { network, getValue } from "../../assert/network";
import "./index.css";
import axios from "axios";
import { ethers } from "ethers";
export default function () {
  const { isConnected, address } = useAccount();
  const { chain, chains } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const [switchModel, setSwitchModel] = useState(false);
  const [switchModelValue, setSwitchModelValue] = useState("");
  const [btn, setBtn] = useState("Approve");
  const [isLoading, setLoading] = useState(false);

  async function handleTransfer() {
    console.log("Transfer button");
    if (tokenAmount == "") {
      swal("Oops!", "Please Enter Token Amount", "error");
      return;
    }

    if (!isConnected) {
      swal("Opps!", "Please Connect the Wallet", "error");
      return;
    }

    if (chain.id != selectedNetFrom?.chainId) {
      swal(
        "Opps!",
        `Please switch the network to ${
          selectedNetFrom.networkName != "Avalanche" ? "Polygon" : "Avalanche"
        }`,
        "error"
      ).then(async (value) => {
        const ChainId =
          selectedNetFrom.networkName != "Avalanche" ? "80001" : "43113";
        try {
          const hexChainId = "0x" + parseInt(ChainId).toString(16);
          setSwitchModelValue("Wait Network is Switching ....");
          setSwitchModel(true);
          switchNetworkAsync(hexChainId).then(() => {
            setSwitchModel(false);
          });
        } catch (err) {
          swal(
            "Opps!",
            "Something went wrong while switching network",
            "error"
          );
          return;
        }
      });
    } else {
      console.log("else");
      if (selectedNetFrom.networkName == "Avalanche") {
        if (btn == "Approve") {
          console.log("Avalange Approve");
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          };
          axios
            .post(
              "http://127.0.0.1:8000/approve/avalanche",
              {
                address: address,
                amount: tokenAmount,
              },
              config
            )
            .then(async (res) => {
              setLoading(true);
              setSwitchModelValue("Wait matamask is opening for approval");
              setSwitchModel(true);
              await window.ethereum.enable();
              const provider = new ethers.providers.Web3Provider(
                window.ethereum
              );

              const signer = provider.getSigner();
              signer
                .sendTransaction({
                  to: res.data.to,
                  data: res.data.approveData,
                })
                .then((transaction) => {
                  setSwitchModelValue("Wait for confirmation from metamask");
                  return transaction.wait();
                })
                .then((receipt) => {
                  if (receipt.status === 1) {
                    setBtn("Transfer");
                    setSwitchModel(false);
                    swal("", "Approval is successfull...", "success");
                  } else {
                    console.log("Approve failed.");
                    setBtn("Approve");
                    setSwitchModel(false);
                    swal("Opps!", "Transaction is Fail...", "error");
                    setBtn("Approve");
                  }
                })
                .catch((error) => {
                  console.log("Error occurred:", error.message);
                  setSwitchModel(false);
                  swal("Opps!", "Transaction is Fail...", "error");
                  setBtn("Approve");
                });
            });
        } else {
          console.log("Avalange Deposit");
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          };
          axios
            .post(
              "http://127.0.0.1:8000/avaltopoly",
              {
                address: address,
                amount: tokenAmount,
              },
              config
            )
            .then(async (res) => {
              setLoading(true);
              setSwitchModelValue("Metamask is opening for transaction...");
              setSwitchModel(true);
              await window.ethereum.enable();
              const provider = new ethers.providers.Web3Provider(
                window.ethereum
              );

              const signer = provider.getSigner();
              console.log(res.data.to, res.data.approveData);
              console.log(typeof tokenAmount);
              signer
                .sendTransaction({
                  to: res.data.to,
                  data: res.data.depositData,
                  gasLimit: 500000,
                })
                .then((transaction) => {
                  setSwitchModelValue("Wait for confirmation from metamask");
                  return transaction.wait();
                })
                .then((receipt) => {
                  if (receipt.status === 1) {
                    setBtn("Approve");
                    setSwitchModel(false);
                    swal(
                      "Transaction is successfull...",
                      "The token may reflact in your wallet after 10-20 sec",
                      "success"
                    );
                  } else {
                    console.log("Approve failed.");
                    setBtn("Approve");
                    setSwitchModel(false);
                    swal("Opps!", "Transaction is Fail...", "error");
                  }
                })
                .catch((error) => {
                  console.log("Error occurred:", error.message);
                  setSwitchModel(false);
                  swal("Opps!", "Transaction is Fail...", "error");
                  setBtn("Approve");
                });
            });
        }
      } else {
        if (btn == "Approve") {
          console.log("Avalange Approve");
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          };
          axios
            .post(
              "http://127.0.0.1:8000/approve/polygon",
              {
                address: address,
                amount: tokenAmount,
              },
              config
            )
            .then(async (res) => {
              setLoading(true);
              setSwitchModelValue("Metamask is opening for Approval...");
              setSwitchModel(true);
              await window.ethereum.enable();
              const provider = new ethers.providers.Web3Provider(
                window.ethereum
              );

              const signer = provider.getSigner();
              signer
                .sendTransaction({
                  to: res.data.to,
                  data: res.data.approveData,
                })
                .then((transaction) => {
                  setSwitchModelValue("Wait for confirmation from metamask");
                  return transaction.wait();
                })
                .then((receipt) => {
                  if (receipt.status === 1) {
                    setBtn("Transfer");
                    setSwitchModel(false);
                    swal("", "Approval is successfull...", "success");
                  } else {
                    console.log("Approve failed.");
                    setBtn("Approve");
                    setSwitchModel(false);
                    swal("Opps!", "Transaction is Fail...", "error");
                  }
                })
                .catch((error) => {
                  console.log("Error occurred:", error.message);
                  setSwitchModel(false);
                  swal("Opps!", "Transaction is Fail...", "error");
                  setBtn("Approve");
                });
            });
        } else {
          console.log("poly  Deposit");
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          };
          axios
            .post(
              "http://127.0.0.1:8000/polytoaval",
              {
                address: address,
                amount: tokenAmount,
              },
              config
            )
            .then(async (res) => {
              setLoading(true);
              setSwitchModelValue("Metamask is opening for transaction...");
              setSwitchModel(true);
              await window.ethereum.enable();
              const provider = new ethers.providers.Web3Provider(
                window.ethereum
              );

              const signer = provider.getSigner();
              signer
                .sendTransaction({
                  to: res.data.to,
                  data: res.data.depositData,
                  gasLimit: 5000000,
                })
                .then((transaction) => {
                  setSwitchModelValue("Wait for confirmation from metamask");
                  return transaction.wait();
                })
                .then((receipt) => {
                  if (receipt.status === 1) {
                    setBtn("Approve");
                    setSwitchModel(false);
                    swal(
                      "Transaction is successfull...",
                      "The token may reflact in your wallet after 10-20 sec",
                      "success"
                    );
                  } else {
                    console.log("Approve failed.");
                    setBtn("Approve");
                    setSwitchModel(false);
                    swal("Opps!", "Transaction is Fail...", "error");
                  }
                })
                .catch((error) => {
                  console.log("Error occurred:", error.message);
                  setSwitchModel(false);
                  swal("Opps!", "Transaction is Fail...", "error");
                  setBtn("Approve");
                });
            });
        }
      }
    }
  }

  const [selectedToken, setSelectedToken] = useState({
    tokenSymbol: "TTK1",
    tokenName: "TTKCoin1",
    tokeniconurl:
      "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    id: 0,
  });
  const [selectedNetFrom, setselectedTokenFrom] = useState({
    networkiconUrl:
      "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574",
    networkName: "Avalanche",
    networkType: "Testnet",
    chainId: "43113",
  });
  const [selectedNetTo, setSelectedNetTo] = useState({
    networkiconUrl:
      "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
    networkName: "Polygon",
    networkType: "Testnet",
    chainId: "80001",
  });
  const [tokenAmount, setTokenAmount] = useState("");
  //  useEffect(()=>{
  //     const walletDefaultNetwork=getValue(chain);
  //     console.log(walletDefaultNetwork)
  //     setselectedTokenFrom(walletDefaultNetwork)
  //  },[])
  return (
    <div>
      <h1 className="font-medium text-2xl m-3">EVM</h1>
      <div className="m-3">
        <From
          setselectedTokenFrom={setselectedTokenFrom}
          selectedNetFrom={selectedNetFrom}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          setSelectedNetTo={setSelectedNetTo}
          tokenAmount={tokenAmount}
          setTokenAmount={setTokenAmount}
        />
        <div className="my-5 flex justify-center">
          <AiOutlineArrowDown size={30} />
        </div>
        <To
          selectedNetTo={selectedNetTo}
          setSelectedNetTo={setSelectedNetTo}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          setselectedTokenFrom={setselectedTokenFrom}
          tokenAmount={(tokenAmount / 100) * 99}
        />
      </div>
      <Reminder />
      <div className="flex justify-center">
        <button
          className="py-4 px-36  text-white bg-[#3b80ee] rounded-lg hover:bg-violet-600"
          onClick={handleTransfer}
        >
          {btn}
        </button>
      </div>
      <SwitchModel show={switchModel} value={switchModelValue} />
    </div>
  );
}
