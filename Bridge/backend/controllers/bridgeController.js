const config = require("../config");
const dotenv = require("dotenv");
const events = require("../events/widthdrawalEvent");
const { param } = require("../routes/bridgeRoute");
dotenv.config();
async function avaltopoly_controller(req, res) {
  const { address, amount } = req.body;
  if (address && amount) {
    const depositData = await config.aval_deposit(address, amount);
    res.status(200).json({
      from: address,
      to: process.env.BRIDEADDRESS_AVAL,
      depositData: depositData,
    });
  } else {
    res
      .status(400)
      .json({ message: "All Field Address and Amount is required" });
  }
}

async function polytoaval_controller(req, res) {
  const { address, amount } = req.body;
  if (address && amount) {
    const depositData = await config.poly_deposit(address, amount);
    res.status(200).json({
      from: address,
      to: process.env.BRIDEADDRESS_POLY,
      depositData: depositData,
    });
  } else {
    res
      .status(400)
      .json({ message: "All Field Address and Amount is required" });
  }
}

async function approve_controller(req, res) {
  const { address, amount } = req.body;
  if (req.params.type == "avalanche") {
    const approveData = await config.aval_appprove(amount);
    console.log(approveData);
    res.status(200).json({
      from: address,
      to: process.env.AVAL_TOKEN_ADDRESS,
      approveData: approveData,
    });
  } else if (req.params.type == "polygon") {
    const approveData = await config.poly_approve(amount);
    console.log(approveData);
    res.status(200).json({
      from: address,
      to: process.env.POLY_TOKEN_ADDRESS,
      approveData: approveData,
    });
  } else {
    res.status(404).json({
      message: "Not valid request",
      validUrl: "/approve/avalanche  or /approve/polygon",
    });
  }
}

module.exports = {
  avaltopoly_controller,
  polytoaval_controller,
  approve_controller,
};
