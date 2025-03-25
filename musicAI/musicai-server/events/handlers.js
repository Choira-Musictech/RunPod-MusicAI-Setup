const musicController = require('../controllers/music.controller');
const { socketManager } = require('../utils/socketManager');

function registerEventHandlers() {
    socketManager.on('complete_song', async ({ clientId, data, req }) => {
        try {
            const simplifiedReq = {
                body: data,
                clientId,
                protocol: req.protocol,
                get: (header) => req.headers[header.toLowerCase()],
            };

            await musicController.completeSong(simplifiedReq);
        } catch (error) {
            console.error("Error handling 'complete_song' event:", error);
            socketManager.broadcastToClient(clientId, { type: 'error', data: 'Failed to process complete song request.' });
            // Todo: updating request status in DB to 'failed' here as well.
        }
    });

    // TOdo: Add listeners for other events (e.g., 'background_song') here
    socketManager.on('background_song', async({clientId, data, req}) => {
      // Handle logic
    });
}

module.exports = {
    registerEventHandlers,
};