// server/services/musicService.js

const axios = require('axios');
const config = require('../config/config');

async function generateCompleteSong(prompt, requestId, webhookUrl) {
    try {
        const payload = {
            prompt,
            // instrumental: false,
            // model: "FUZZ-0.8",  
            replyUrl: webhookUrl, // dynamically generated webhook URL
            replyRef: requestId,  // Use the requestId as the replyRef
            // maxJobs: 1,       // Optional, adjust as needed
        };

        console.log("Payload:", payload);

        const response = await axios.post(
            `${config.riffusionApiBaseUrl}/create-prompt`,
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${config.riffusionApiToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // (an array of job IDs) and 'user_id'.
        console.log("Riffusion API response:", response.data);

        return { success: true, jobs: response.data.jobs }; // Return the job IDs

    } catch (error) {
        console.error("Error calling Riffusion API:", error.response ? error.response.data : error.message);
        if (error.response) {
            const statusCode = error.response.status;
            switch(statusCode) {
              case 400:
                throw new Error(`Riffusion API Bad Request: ${error.response.data.detail || 'Invalid input'}`);
              case 401:
                throw new Error(`Riffusion API Unauthorized: Invalid API token`);
              case 422:
                throw new Error(`Riffusion API Unprocessable Entity: ${error.response.data.detail || 'Validation error'}`);
              case 429:
                throw new Error(`Riffusion API Too Many Requests: Rate limit exceeded`);
              case 596:
                throw new Error(`Riffusion API: ${error.response.data.detail || 'Generation Failed'}`) // Custom Error from API
              default:
                 throw new Error(`Riffusion API Error: ${statusCode} - ${error.response.data.detail || error.message}`);
            }
        } else if (error.request) {
            throw new Error(`Riffusion API: No response received`);
        } else {
            throw new Error(`Riffusion API Request Error: ${error.message}`);
        }
    }
}

module.exports = {
    generateCompleteSong,
};