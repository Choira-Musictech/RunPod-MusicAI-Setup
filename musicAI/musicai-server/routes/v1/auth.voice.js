const express = require('express')
const Controller = require("../../controllers/voice.controller")
const app = express.Router()

app.get("/voiceLink",Controller.voiceController)

module.exports = app