
const express = require('express');
const musicRoute = require('./music.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/music',
        route: musicRoute,
    },
    // { path: '/auth', route: authRoute }, // Uncomment when you add authentication
    // { path: '/users', route: userRoute }, // Uncomment when you add user management
];

const devRoutes = [
    {
        path: '/docs',
        route: docsRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

module.exports = router;