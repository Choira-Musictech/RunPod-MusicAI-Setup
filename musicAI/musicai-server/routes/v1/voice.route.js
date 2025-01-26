const express = require('express')
const Controller = require("../../controllers/voice.controller")
const app = express.Router()

app.post("/complete",Controller.voiceController)

module.exports = app