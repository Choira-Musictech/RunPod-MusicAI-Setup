const { v4: uuidv4 } = require('uuid');
const musicService = require('../services/music.service');
const Request = require('../models/Request');
const config = require('../config/config');

const completeSong = async (req) => {

    const requestId = uuidv4();

    try {
        const { prompt } = req.body;
        const clientId = req.clientId

        

        const requestRecord = new Request({
            requestId,
            clientId,
            status: 'pending',
            prompt,
        });
        
        await requestRecord.save();
        console.log("Saved requestRecord:", requestRecord); 

        const webhookUrl = `${req.protocol}://${req.get('host')}${config.webhookEndpoint}?requestId=${requestId}`;
        console.log("Generated webhookUrl", webhookUrl) 
        await musicService.generateCompleteSong(prompt, requestId, webhookUrl);

        // res.status(202).json({ message: 'Request received, processing', requestId });

    } catch (error) {
        console.error("Error in completeSong controller:", error);
        const requestRecord = await Request.findById(requestId);
        if(requestRecord){
            await requestRecord.update({ status: 'failed' });
        }
        
        // Todo: Emit an event (using an EventEmitter) that other parts of the application can listen for (e.g., to send an error message to the client via WebSocket).

        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    completeSong,
};