const axios = require('axios');
const express = require('express');
const router = express.Router();
const config = require('../config/config');


/**
 * Generate music and image based on the given prompt.
 *
 * @param {string} prompt - The prompt to generate music and image.
 * @returns {Promise<{audioUrl: string, imageUrl: string, title: string, lyric: string}>}
 */
async function generateMusic(prompt) {
  try {
    // API endpoint and API key
    const apiEndpoint = 'https://api.topmediai.com/v1/music';
    const apiKey = config.otherAPI.topmedia_key;
    console.log("apiKey-->", apiKey);
    
    // const response = await axios.post(apiEndpoint, {
    //   is_auto: 1,
    //   prompt,
    //   instrumental: 0,
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key': apiKey,
    //   },
    // });

    const response = {
        "status": 200,
        "message": "Success",
        "data": [
            {
                "audio_file": "https://files.topmediai.com/aimusic/api/aa02bb15-2f7c-4765-8978-26fc5257d253-audio.mp3",
                "image_file": "https://files.topmediai.com/aimusic/9003098/deff6149-1f92-4495-8928-8ab8f64f7a7c-image.png",
                "item_uuid": "aa02bb15-2f7c-4765-8978-26fc5257d253",
                "title": "Sunshine Smile",
                "lyric": "[Verse]\nWoke up to the morning light oh so bright\nBirds singing sweet songs no worry no fright\nDancing on the sidewalk with shoes untied\nGrinning like a kid on a roller-coaster ride\n\n[Verse 2]\nClouds part ways for a sky so blue\nNothing but good vibes in this avenue\nSkipping down the street with my sunglasses on\nLife feels like a never-ending fun marathon\n\n[Chorus]\nLaughing like there's no tomorrow\nBorrowing joy no need for sorrow\nEvery step a burst of sunshine\nLiving life on the happy line\n\n[Verse 3]\nWindows down wind in my hair carefree\nSmiling at strangers everyone a friend to me\nIce cream melting in the afternoon heat\nTwirling in circles on this joyful street\n\n[Verse 4]\nThe world's a playground full of delight\nWe’ve got the stars and the moonlight\nHolding hands we're flying high\nUnderneath this sparkling sky\n\n[Chorus]\nLaughing like there's no tomorrow\nBorrowing joy no need for sorrow\nEvery step a burst of sunshine\nLiving life on the happy line",
                "tags": "pop, vibrant"
            },
            {
                "audio_file": "https://files.topmediai.com/aimusic/api/dd418ad2-2e8d-4ac8-983d-ccd72e2afc99-audio.mp3",
                "image_file": "https://files.topmediai.com/aimusic/9120405/60bef4aa-7b15-4370-847c-c736e8fa3b0a-image.png",
                "item_uuid": "dd418ad2-2e8d-4ac8-983d-ccd72e2afc99",
                "title": "Sunshine Smile",
                "lyric": "[Verse]\nWoke up to the morning light oh so bright\nBirds singing sweet songs no worry no fright\nDancing on the sidewalk with shoes untied\nGrinning like a kid on a roller-coaster ride\n\n[Verse 2]\nClouds part ways for a sky so blue\nNothing but good vibes in this avenue\nSkipping down the street with my sunglasses on\nLife feels like a never-ending fun marathon\n\n[Chorus]\nLaughing like there's no tomorrow\nBorrowing joy no need for sorrow\nEvery step a burst of sunshine\nLiving life on the happy line\n\n[Verse 3]\nWindows down wind in my hair carefree\nSmiling at strangers everyone a friend to me\nIce cream melting in the afternoon heat\nTwirling in circles on this joyful street\n\n[Verse 4]\nThe world's a playground full of delight\nWe’ve got the stars and the moonlight\nHolding hands we're flying high\nUnderneath this sparkling sky\n\n[Chorus]\nLaughing like there's no tomorrow\nBorrowing joy no need for sorrow\nEvery step a burst of sunshine\nLiving life on the happy line",
                "tags": "pop, vibrant"
            }
        ]
    }

    const { data } = response;
    const musicData = data[1]; // Assuming the first item in the array

    return {
      audioUrl: musicData.audio_file,
      imageUrl: musicData.image_file,
      title: musicData.title,
      lyric: musicData.lyric,
    };
  } catch (error) {
    throw new Error(`Failed to generate music: ${error.message}`);
  }
}

exports.voiceController = async(req,res) =>{

    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
  
    try {
      const musicData = await generateMusic(prompt);
      res.json(musicData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    // setTimeout(()=>res.json(
    //     { status:true, audio_url: "https://files.topmediai.com/aimusic/api/a19bad04-3383-41d3-b581-f7063e0866e7-audio.mp3",
    //     image_url: "https://files.topmediai.com/aimusic/api/a19bad04-3383-41d3-b581-f7063e0866e7-image.png" }),20000)
}