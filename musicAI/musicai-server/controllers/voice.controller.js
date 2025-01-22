

exports.voiceController = (req,res) =>{
    setTimeout(()=>res.json(
        { status:true, audio_url: "https://files.topmediai.com/aimusic/api/a19bad04-3383-41d3-b581-f7063e0866e7-audio.mp3",
        image_url: "https://files.topmediai.com/aimusic/api/a19bad04-3383-41d3-b581-f7063e0866e7-image.png" }),20000)
}