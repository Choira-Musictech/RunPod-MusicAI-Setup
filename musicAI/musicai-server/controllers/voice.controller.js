

exports.voiceController = (req,res) =>{
    setTimeout(()=>res.json({status:true,link:"https://www.random.com"}),20000)
}