// server/index.js
require('dotenv').config();
const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const { connectDB } = require('./config/db');
const { setupWebSocket, socketManager } = require('./utils/socketManager');
const routes = require('./routes/v1');
const config = require('./config/config');
const morgan = require('./config/morgan');
const cors = require('cors');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');

// Event handlers
const { registerEventHandlers } = require('./events/handlers'); 

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

// --- Middleware (same as before) ---
if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.set('trust proxy', true);

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
if (config.env === 'production') {
    app.use('/v1/auth', authLimiter);
}
app.use('/server/v1', routes);

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);
app.use(errorHandler);


// --- Event Listener Registration ---
connectDB()
    .then(() => {
        setupWebSocket(wss);
        registerEventHandlers(); // Register event handlers

        const PORT = config.port || 8080;
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to start the server:', err);
        process.exit(1);
    });