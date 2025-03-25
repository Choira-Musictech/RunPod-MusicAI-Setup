// server/models/Request.js

const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

class Request {
  constructor({ requestId, clientId, status, prompt, songData, createdAt, updatedAt }) {
    this.requestId = requestId;
    this.clientId = clientId;
    this.status = status;
    this.prompt = prompt;
    this.songData = songData || null;  
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    // validation happens on save/update.
  }

  validate() {
    if (!this.requestId) {
      throw new Error('Request ID is required');
    }
    if (!this.clientId) {
      throw new Error('Client ID is required');
    }
    if (!this.status) {
      throw new Error('Status is required');
    }
    if (!['pending', 'completed', 'failed'].includes(this.status)) {
      throw new Error('Invalid status');
    }
  }

  async save() {
    this.validate();
    const db = getDB(); 
    const result = await db.collection('requests').insertOne(this);
    this._id = result.insertedId;
    return this;
  }

  static async findById(requestId) {
    const db = getDB();
    console.log("requestId", requestId)
    const request = await db.collection('requests').findOne({ requestId });
    console.log("request-->", request);
    
    return request ? new Request(request) : null; 
  }

  static async findByClientId(clientId){
      const db = getDB();
      const requests = await db.collection('requests').find({clientId}).toArray();

      return requests.map(request => new Request(request))
  }

  async update(updates) {
        const db = getDB();
        this.validate();
        Object.assign(this, updates);
        this.updatedAt = new Date();
        const result = await db.collection('requests').updateOne(
            { requestId: this.requestId },
            { $set: this }
        );

        if (result.matchedCount === 0) {
          throw new Error(`Request with ID ${this.requestId} not found`);
        }
        return this;
    }
     static async clear() {
        const db = getDB();
        await db.collection('requests').deleteMany({});
    }
}

module.exports = Request;