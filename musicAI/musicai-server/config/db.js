const { MongoClient } = require('mongodb');
const config = require('./config');

const url = config.mongo.url;
const dbName = config.mongo.dbName; 
let db;

async function connectDB() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    await db.createCollection('requests');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw for handling in index.js
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
}

module.exports = {
  connectDB,
  getDB,
  url, 
  dbName,
};