const express = require("express");
const bridgeRoute = require("./routes/bridgeRoute");
const config = require("./config");
const polygonListener = require("./listener/poly_deposit");
const avalancheListener = require("./listener/aval_deposit");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const app = express();

//Global middleware
app.use(cors());
app.use(express.json());

//initialize the config file
config.initialize();

//polygon listener
polygonListener();

//Avalanche listener
avalancheListener();

//route middleware
app.use("/", bridgeRoute);

app.listen(PORT, () => {
  console.log(`Server running port number ${PORT}`);
});
