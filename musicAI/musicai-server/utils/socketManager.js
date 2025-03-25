// server/utils/socketManager.js
const EventEmitter = require('events');

class SocketManager extends EventEmitter {
    constructor() {
        super();
        this.clients = new Map();
    }

    broadcastToClient(clientId, message) {
        try {
            const client = this.clients.get(clientId);
            if (client && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            } else {
                console.warn(`Attempted to broadcast to disconnected client: ${clientId}`);
                this.clients.delete(clientId); // Clean up disconnected clients
            }
        } catch (error) {
            console.error(`Error broadcasting to client ${clientId}:`, error);
        }
    }

    setupWebSocket(wss) {
        wss.on('connection', (ws, req) => {
            const urlParams = new URL(req.url, `http://${req.headers.host}`);
            const clientId = urlParams.searchParams.get('clientId');

            if (!clientId) {
                ws.close(1008, 'Client ID required');
                return;
            }

            this.clients.set(clientId, ws);
            console.log(`Client connected with ID: ${clientId}`);

            ws.on('message', async (message) => {
                try {
                    const parsedMessage = JSON.parse(message);
                    console.log(`Received from ${clientId}:`, parsedMessage);

                    // Emit an event based on the message type
                    this.emit(parsedMessage.type, {
                        clientId,
                        data: parsedMessage.data,
                        req, 
                    });

                } catch (error) {
                    console.error('Error processing message:', error);
                    this.broadcastToClient(clientId, { type: 'error', data: 'Error processing message.' });
                }
            });

            ws.on('close', () => {
                this.clients.delete(clientId);
                console.log(`Client disconnected: ${clientId}`);
            });

            ws.on('error', (error) => {
                console.error(`WebSocket error for client ${clientId}:`, error);
                this.clients.delete(clientId); // Clean up on error
            });
        });
    }
}

const socketManager = new SocketManager();

module.exports = {
    setupWebSocket: socketManager.setupWebSocket.bind(socketManager),
    broadcastToClient: socketManager.broadcastToClient.bind(socketManager),
    socketManager,
};