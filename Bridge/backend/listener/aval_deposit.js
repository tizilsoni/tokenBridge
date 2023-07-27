const config = require("../config");
const ethers = require("ethers");
const events = require("../events/widthdrawalEvent");
async function depositListener() {
  console.log("Avalanche Listener Stated....");
  config.avalWebsocketContract.on(
    "Deposit",
    async (sourceAddress, destinationAddress, amount, event) => {
      const decimalAmount = ethers.utils.formatUnits(amount, 18);
      config
        .poly_withdrawal(destinationAddress, decimalAmount)
        .then((status) => {
          console.log(status);
        })
        .catch((err) => {
          events.event.emit("failed");
        });
    }
  );
}

module.exports = depositListener;
