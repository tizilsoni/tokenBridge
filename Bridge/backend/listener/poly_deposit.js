const config = require("../config");
const ethers = require("ethers");
const events = require("../events/widthdrawalEvent");
async function depositListener() {
  console.log("Polygon  Listener Stated....");
  config.polyWebsocketContract.on(
    "Deposit",
    async (sourceAddress, destinationAddress, amount, event) => {
      try {
        // console.log("Transaction Hash : "+event.log.transactionHash)
        const decimalAmount = ethers.utils.formatUnits(amount, 18);
        config
          .aval_withdrawal(destinationAddress, decimalAmount)
          .then((status) => {
            console.log(status);
          })
          .catch((err) => {
            events.event.emit("failed");
          });
      } catch (err) {
        console.log(err);
      }
    }
  );
}

module.exports = depositListener;
