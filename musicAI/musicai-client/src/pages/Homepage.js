import React,{ useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Input, Image,Card,
  Col,
  Row,
  Typography,
  message,
} from "antd";
import {StepBackwardOutlined, StepForwardOutlined, FolderAddOutlined, DownloadOutlined, CaretRightOutlined} from "@ant-design/icons"
import Waveform from "../components/audio/Waveform";
import { Polygon } from "../components/audio/Polygon";
import { PropertyDefaultWrapper } from "../components/audio/PropertyDefaultWrapper";
// import '../assets/styles/homepage.css'
import leftforwardIcon from "../assets/icons/group-1000004984.png"
import rightforwardIcon from "../assets/icons/group-1000004983.png"
import artworkImg from "../assets/images/oETJ6ZXZ8vTfMKdVDeNr--1--1o7qx.png"

export default function Homepage () {

  const { TextArea } = Input;
  const { Title, Text, Paragraph } = Typography;
  const [showOverlay, setShowOverlay] = useState(false);
  const [audioData, setAudioData] = useState([])
  const [currentAudio, setCurrentAudio] = useState({ output_filename:'', audioID: 0, progress:0, showWave: false, isPlaying:false, })
  const [localID, setLocalID] = useState(0)
  const [localText, setLocalText] = useState({text:'',img:''})
  let audio = new Audio() // 
  const audioRef = useRef(audio);

  const handleMouseEnter = () => {
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  const onFinish = (values) => {
    const randomId = Math.floor(Math.random() * 1000)
    setLocalID(randomId)
    // setLocalText((prevState) => ({ ...prevState, text: values?.text }));
    const data = {
      duration: values?.duration || 120,
      cfg_coef: values?.cfg_coef || 7,
      text: values?.text,
      model: "large",
      temperature:1,
      segments: 1,
      overlap:4.5,
      topk: 0,
      topp: 0,
      audioID: randomId,
    }
    console.log('Received values of form: ', data);
    // AI Generator
    axios.post(`https://pipeline.choira.io/`,{
      data:data
    }).then((audioResp)=>{
        console.log("Resp Submitted ", audioResp)
        message.loading(`Audio generation in progress...`)
        // setTimeout(messageApi.destroy, 10000);
    });
    // IMG Generator
    const apiKey = 'DW7a71BLsHHon1Q6oYe5vrY7jHqp1dIA';
    const textUrl = values?.text.substring(0,50);
    console.log("textUrl", textUrl);
    const formData = new FormData();
    formData.append('q', textUrl);
    formData.append('YOUR_API_KEY', apiKey);

    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=DW7a71BLsHHon1Q6oYe5vrY7jHqp1dIA&q=${textUrl}&limit=25&offset=0&rating=g&lang=en`
    // , formData, 
    // {
    //   headers: {
    //     'api-key': apiKey,
    //     'Content-Type': 'multipart/form-data',
    //   },
    // }
    ).then((imgData)=>{
        console.log("imgData Submitted ", imgData.data.data[0]?.images)
        // console.log("imgData Submitted ", imgData.data.data[0].images)
        if(imgData.data.data[0]?.images) setLocalText((prevState) => ({ ...prevState, img: imgData.data.data[0].images.original.url }))
    });
  };

  const onSubmit = () => {

    console.log("audioData[0]?.audio_file", audioData[0]?.audio_file);
    setCurrentAudio(prevState => ({ ...prevState, output_filename: audioData[0]?.audio_file }));
    // audioRef.current.load()
    audioRef.current?.play()
  }

  const handlePlayPause = () => {
    console.log("CLicked", currentAudio.isPlaying)
    setCurrentAudio(prevState => ({ ...prevState, isPlaying: !currentAudio.isPlaying }));
    currentAudio?.isPlaying?audioRef.current?.play():audioRef.current.pause()
  }

  useEffect(() => {
    console.log("audioData", audioData);
    if(!audioData.length){
      axios.get(`https://pipeline.choira.io/api/audio-files`).then((audioResp)=>{
        console.log("audioResp", audioResp.data);
        const sortedAudioFiles =  audioResp.data.sort((a, b) => b.timestamp - a.timestamp);
        // console.log("sortedAudioFiles", sortedAudioFiles);
        setAudioData(sortedAudioFiles)
      });
    }

  }, [audioData.length])

  return (
    <div className="macbook-pro">
      <div className="div">
        <div className="overlap">
          <div className="text-field">
            <div className="frame">
              <div className="title">Song description</div>
            </div>
            <div className="frame-2">
              {/* <div className="p-wrapper"> */}
              <TextArea style={{color: "#D3D3D3", fontFamily: "Inter-Medium Helvetica",fontSize: "20px",fontWeight: "500",letterSpacing: "0.2px"}} bordered={false} className="text-wrapper frame-2" rows={3} placeholder="An original indie pop song that describes the feelings of a person..." maxLength={500} />
                {/* <p className="text-wrapper">
                  An original indie pop song that describes the feelings of a person who is deeply in love with their
                  friend. The lyrics are romantic and the melody is catchy, making it a perfect song for anyone who is
                  feeling romantic and wants to express their feelings to their friend. The song is about the joy and
                  happiness that comes with being in love and how it can make you feel like you're on top of the world.
                  The song is sure to make anyone feel happy and romantic.
                </p> */}
              {/* </div> */}
              {/* <div className="group">
                <div className="rectangle" />
              </div> */}
            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-group">
              <div className="overlap-group-wrapper">
                <div className="overlap-group-2">
                  <Polygon
                    polygon="polygon-1-4.svg"
                    polygonStyle={{
                      height: "305px",
                      left: "6px",
                      top: "6px",
                      transform: "rotate(7.00deg)",
                      width: "305px",
                    }}
                    property1="default"
                    style={{
                      height: "317px",
                      left: "66px",
                      position: "absolute",
                      top: "64px",
                      transform: "rotate(7.00deg)",
                      width: "317px",
                    }}
                  />
                  <PropertyDefaultWrapper
                    polygon="polygon-1-5.svg"
                    polygonStyle={{
                      height: "296px",
                      left: "11px",
                      top: "11px",
                      transform: "rotate(-18.00deg)",
                      width: "296px",
                    }}
                    property1="default"
                    style={{
                      height: "317px",
                      left: "66px",
                      position: "absolute",
                      top: "64px",
                      transform: "rotate(32.00deg)",
                      width: "317px",
                    }}
                  />
                  <Polygon
                    img="polygon-1-6.svg"
                    polygonStyle={{
                      height: "310px",
                      transform: "rotate(112.00deg)",
                      width: "304px",
                    }}
                    property1="variant-2"
                    style={{
                      height: "317px",
                      left: "66px",
                      position: "absolute",
                      top: "64px",
                      transform: "rotate(-98.00deg)",
                      width: "317px",
                    }}
                  />
                  <PropertyDefaultWrapper
                    img="polygon-1-7.svg"
                    polygonStyle={{
                      height: "303px",
                      top: "7px",
                      transform: "rotate(151.00deg)",
                      width: "303px",
                    }}
                    property1="variant-3"
                    style={{
                      height: "317px",
                      left: "66px",
                      position: "absolute",
                      top: "66px",
                      transform: "rotate(-137.00deg)",
                      width: "317px",
                    }}
                  />
                </div>
              </div>
              <div className="lihjt">
                <PropertyDefaultWrapper
                  img="polygon-1-8.svg"
                  polygonStyle={{
                    height: "303px",
                    top: "7px",
                    transform: "rotate(151.00deg)",
                    width: "303px",
                  }}
                  property1="variant-3"
                  style={{
                    height: "317px",
                    left: "66px",
                    mixBlendMode: "screen",
                    opacity: "0.8",
                    top: "66px",
                    transform: "rotate(-137.00deg)",
                    width: "317px",
                  }}
                />
              </div>
            </div>
          </div>
          <div>
          <img className="oetjzxzvtfmkdvdenr" alt="Oetjzxzvtfmkdvdenr" src={artworkImg}></img>
          {/* {currentAudio?.output_filename ? <button onClick={audio.play()} className="imgOverlayBtn" ></button>:null} */}
          <Button type="text" onClick={handlePlayPause} className="imgOverlayBtn" ><CaretRightOutlined style={{left:5, bottom:20, position: 'relative'  , fontSize: '40px', color: 'white'  }} /></Button>
          
          {/* {showOverlay && (
            <button className="imgOverlayBtn" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >Button</button>
          )} */}
          </div>
          {/* <Waveform className="" audio={`http://ai.choira.io/static/audio/${'uplifting%20motivational%20track(1).wav'}`} playAudio={false} />   */}
          {/* <img className="group-2" alt="Group" src="/assets/Icons/Group 1000004983.png" /> */}

          <div className="group-2">
          <Button type="text" >
            <StepBackwardOutlined style={{ fontSize: '40px', color: 'white'  }} />
          {/* <img  src={leftforwardIcon} /> */}
          </Button>
          </div>
          <div className="group-3">
          <Button type="text" >
            <StepForwardOutlined style={{ fontSize: '40px', color: 'white'  }} />
          {/* <img  src={leftforwardIcon} /> */}
          </Button>
          
          </div>
          
          <div className="group-wrapper">
          
            <div className="group-4">
              {/* <img className="vector" alt="Vector" src="vector.svg" /> */}
              <Button
                type="primary"
                icon={<FolderAddOutlined style={{ fontSize: '25px', color: 'black' }} />}
                className="text-wrapper-2"
                onClick={onSubmit}
              >
                Create Project
              </Button>
              
            </div>
            
          </div>

          {/* <div className="group-wrapper">
            <div className="group-4">
              <img className="vector" alt="Vector" src="vector.svg" />
              <FolderAddOutlined style={{ fontSize: '25px', color: 'black'  }} />
              <div className="text-wrapper-2">
                <div>Create Project</div>
              </div>
            </div>
          </div> */}
          
        </div>
        <h1 className="h-1">AI audio generator</h1>
        <p className="p">
          Our Osis is based on artificial intelligence and will help you to create amazing and the most
          unique music track very easily from your text description.
        </p>
        <img className="group-5" alt="Group" src="https://choira.io/static/media/choria.96439620.svg" />
      </div>
      
    </div>
  );
};