const express = require("express")
const bridgeController = require("../controllers/bridgeController")
const route = express.Router()

route.post("/avaltopoly",bridgeController.avaltopoly_controller)
route.post("/polytoaval",bridgeController.polytoaval_controller)
route.post("/approve/:type",bridgeController.approve_controller)

module.exports= route;