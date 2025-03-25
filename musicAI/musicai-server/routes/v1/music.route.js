// server/routes/v1/music.route.js

const express = require('express');
const musicController = require('../../controllers/music.controller');
const webhookService = require('../../services/webhook.service'); // Import webhook service
const config = require('../../config/config'); // Import config

const router = express.Router();


// (initiated via WebSocket)
// router.post('/complete-song', clientIdMiddleware, musicController.completeSong);

// Webhook 
router.post(config.webhookEndpoint, async (req, res) => {
    try {
        // VERIFY SIGNATURE
        if (!webhookService.verifySignature(req)) {
            return res.status(401).send('Unauthorized');
        }

        const { songData, status } = req.body || req.query || req.params;
        const {requestId} = req.query
        // console.log({requestId, songData, status})
        await webhookService.handleCompleteSongWebhook(requestId, songData, status);
        res.status(200).send('OK');

    } catch (error) {
        console.error("Error in webhook handler:", error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/background', (req, res) => {
    res.status(400).send("Background music requests should be sent via WebSocket.");
});

module.exports = router;