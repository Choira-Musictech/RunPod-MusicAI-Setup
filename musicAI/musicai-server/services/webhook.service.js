const crypto = require('crypto');
const config = require('../config/config');
const Request = require('../models/Request');
const { broadcastToClient } = require('../utils/socketManager');

function verifySignature(req) {

  // Todo: Implement signature verification

  // Example code
  // const signature = req.headers['x-other-api-signature'];
  // if (!signature) {
  //   return false; 
  // }
  // const hmac = crypto.createHmac('sha256', config.webhookSecret);
  // hmac.update(JSON.stringify(req.body));
  // const expectedSignature = hmac.digest('hex');
  // return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));

  console.warn("Webhook signature verification is NOT implemented.  This is a security risk.");
  return true

}


// Todo: instead of using direct link of riffusion downloaded the song and then share from locally
async function handleCompleteSongWebhook(requestId, songData, status) {
  try {
    const requestRecord = await Request.findById(requestId);

    if (!requestRecord) {
      console.warn(`Webhook received for unknown request ID: ${requestId}`);
      return;
    }

    if (status === 'completed') {

      const { audio_url, lyrics, title, audio_b64 } = songData; 


      await requestRecord.update({
        status: 'completed',
        songData: {
          audioUrl: audio_url,
          lyrics,
          title,
          // audioBase64: audio_b64 
        },
      });

      // Notify the client via WebSocket
      broadcastToClient(requestRecord.clientId, {
        type: 'complete_song_result',
        data: {
            song: {  
                audioUrl: audio_url,
                lyrics,
                title,
                // audioBase64: audio_b64 //Include b64
            }
        },
      });
    } else if (status === 'failed') {
        await requestRecord.update({
            status: 'failed',
            songData: null, // Clear any previous data
        });
        broadcastToClient(requestRecord.clientId, { type: 'error', data: 'Song generation failed.' });

    } else {
      // Handle other statuses (e.g., "processing") if the API provides them.
       await requestRecord.update({
            status: status,
        });
      console.log(`Webhook received with status: ${status}`);
    }

  } catch (error) {
    console.error("Error handling complete song webhook:", error);
    throw new Error("Failed to process complete song webhook.");
  }
}


module.exports = {
  verifySignature,
  handleCompleteSongWebhook,
};