require('dotenv').config()

// API
// ----------------------------------------------------------------------

const SERVER_API = process.env.REACT_APP_NODE_SERVER_API;
const SAMPLE_SERVER_API = process.env.REACT_APP_SAMPLE_NODE_SERVER_API;
// console.log("SERVER_API", SERVER_API);

export { SERVER_API, SAMPLE_SERVER_API }
