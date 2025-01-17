
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Select,
  Form,
  Input,
  InputNumber,
  Switch,
  Slider,
  Checkbox,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
  Space,
  
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  ClockCircleOutlined,
  RightOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import Paragraph from "antd/lib/typography/Paragraph";

// components
import Waveform from "../components/audio/Waveform";
import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";

// services
import SampleService from "../services/sample.service";

// socket
import { socket } from "../socket";

import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava4 from "../assets/images/logo-spotify.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import team1 from "../assets/images/team-1.jpg";
import team2 from "../assets/images/team-2.jpg";
import team3 from "../assets/images/team-3.jpg";
import team4 from "../assets/images/team-4.jpg";
// import card1 from "../assets/images/info-card-1.jpg";
import card1 from "../assets/images/generated-img.png";
import card from "../assets/images/generated-img-1.png";
import BeatingIndicator from "../components/indicator/green";
function MainScreen() {
  const { Title, Text } = Typography;
  const baseURL = "http://ai.choira.io/";

  const [audioData, setAudioData] = useState([
  ])
  const [currentAudio, setCurrentAudio] = useState({ output_filename:'', audioID: 0, progress:0, showWave: false })
  const [localID, setLocalID] = useState(0)
  const [localText, setLocalText] = useState({text:'',img:''})

  const list = [
    {
      img: ava1,
      Title: "Soft UI Shopify Version",
      bud: "$14,000",
      progress: <Progress percent={60} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava2,
      Title: "Progress Track",
      bud: "$3,000",
      progress: <Progress percent={10} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava3,
      Title: "Fix Platform Errors",
      bud: "Not Set",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava4,
      Title: "Launch new Mobile App",
      bud: "$20,600",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava5,
      Title: "Add the New Landing Page",
      bud: "$4,000",
      progress: <Progress percent={80} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },

    {
      img: ava6,
      Title: "Redesign Online Store",
      bud: "$2,000",
      progress: (
        <Progress
          percent={100}
          size="small"
          status="exception"
          format={() => "Cancel"}
        />
      ),
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
  ];

  const { Option } = Select;
  const [messageApi, contextHolder] = message.useMessage();

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
    },
  };

  const tailFormItemLayout = {
    labelCol: {
      span: 8,
      offset: 8,

    },
    wrapperCol: {
      span: 12,
      offset: 8,
    },
    // wrapperCol: {
    //   xs: {
    //     span: 24,
    //     offset: 8,
    //   },
    //   sm: {
    //     span: 16,
    //     offset: 8,
    //   },
    // },
  };

  var dateOptions = {
    month: 'short',
    day  : '2-digit',
    // hour : '2-digit',
    // minute:'2-digit'
  };


  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [reverse, setReverse] = useState(false);

  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const cart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const count = [
    {
      today: "Today’s Sales",
      title: "$53,000",
      persent: "+30%",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Today’s Users",
      title: "3,200",
      persent: "+20%",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "New Clients",
      title: "+1,200",
      persent: "-20%",
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "New Orders",
      title: "$13,200",
      persent: "10%",
      icon: cart,
      bnb: "bnb2",
    },
  ];

  const list1 = [
    {
      img: ava1,
      Title: "Soft UI Shopify Version",
      bud: "$14,000",
      progress: <Progress percent={60} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava2,
      Title: "Progress Track",
      bud: "$3,000",
      progress: <Progress percent={10} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava3,
      Title: "Fix Platform Errors",
      bud: "Not Set",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava4,
      Title: "Launch new Mobile App",
      bud: "$20,600",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava5,
      Title: "Add the New Landing Page",
      bud: "$4,000",
      progress: <Progress percent={80} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },

    {
      img: ava6,
      Title: "Redesign Online Store",
      bud: "$2,000",
      progress: (
        <Progress
          percent={100}
          size="small"
          status="exception"
          format={() => "Cancel"}
        />
      ),
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
  ];

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [creativeValue, setCreativeValue] = useState(1);

  const onChangeCreative = (newValue) => {
    setCreativeValue(newValue);
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };

  const onSampleFinish = (values, randomId) => {
    const { text } = values;
    SampleService.getSample(text)
      .then((response) => {
        if (response.status) {
          const { url } = response.data[0];
          console.log("Music----",url.replace(" ", "+"));
          setCurrentAudio((prevState) => ({
            ...prevState,
            output_filename: url.replace(" ", "+"),
            audioID: randomId,
          }));
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
  

  // const onFinish = (values) => {
  //   console.log("target", values);
  //   const randomId = Math.floor(Math.random() * 1000)
  //   setLocalID(randomId)
    
  //   // setLocalText((prevState) => ({ ...prevState, text: values?.text }));
  //   const data = {
  //     duration: values?.duration || 30,
  //     cfg_coef: values?.cfg_coef || 7,
  //     text: values?.text,
  //     model: "facebook/musicgen-large",
  //     temperature:1,
  //     segments: 1,
  //     overlap:4.5,
  //     topk: 0,
  //     topp: 0,
  //     audioID: randomId,
  //   }
  //   console.log('Received values of form: ', data);
  //   if(values.method) {
  //     onSampleFinish(values, randomId)
  //   } else {
  //   // AI Generator
  //   console.log("Generating using AI");
  //   axios.post(`https://pipeline.choira.io/`,{
  //     data:data
  //   }).then((audioResp)=>{
  //       console.log("Resp Submitted ", audioResp)
  //       message.loading(`Audio generation in progress...`)
  //       // setTimeout(messageApi.destroy, 10000);
  //   });
  //   }
  //   // IMG Generator
  //   const apiKey = 'DW7a71BLsHHon1Q6oYe5vrY7jHqp1dIA';
  //   const textUrl = values?.text.substring(0,50);
  //   console.log("textUrl", textUrl);
  //   const formData = new FormData();
  //   formData.append('q', textUrl);
  //   formData.append('YOUR_API_KEY', apiKey);

  //   axios.get(`https://api.giphy.com/v1/gifs/search?api_key=DW7a71BLsHHon1Q6oYe5vrY7jHqp1dIA&q=${textUrl}&limit=25&offset=0&rating=g&lang=en`
  //   // , formData, 
  //   // {
  //   //   headers: {
  //   //     'api-key': apiKey,
  //   //     'Content-Type': 'multipart/form-data',
  //   //   },
  //   // }
  //   ).then((imgData)=>{
  //       console.log("imgData Submitted ", imgData.data.data[0]?.images)
  //       // console.log("imgData Submitted ", imgData.data.data[0].images)
  //       if(imgData.data.data[0]?.images) setLocalText((prevState) => ({ ...prevState, img: imgData.data.data[0].images.original.url }))
  //   });
  // };

  const onFinish = (values)=>{

    setCurrentAudio(prevState => ({ ...prevState, output_filename:'' }));
    socket.emit('generate-music-large',{duration:values.duration,prompt:values.text})

    // IMG Generator
    const apiKey = 'DW7a71BLsHHon1Q6oYe5vrY7jHqp1dIA';
    const textUrl = values?.text.substring(0,50);
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
    
  }

  useEffect(() => {
    console.log(socket?.id)
    socket.on('connect',()=>{
      console.log("Connected to server");
    })
    socket.on('disconect',()=>{
      console.log("Disconnected to server");  
      message.error(`refresh page!`)
    })
    socket.on('music_generated',(data)=>{
      
      console.log("New file created",data);
      // setCurrentAudio(data)
      setCurrentAudio((prevState) => ({
        ...prevState,
        audioID: data.file_name,
        output_filename: `https://pipeline.choira.io/api/audio/${data.file_name}`,
      }));
      // setCurrentAudio(prevState => ({ ...prevState, showWave: false }));
      // message.success(`${data.output_filename} generated!`)
      // setTimeout(messageApi.destroy, 1000);    
    })

    socket.on('music-progress',(data)=>{
      // const {generated_tokens, tokens_to_generate} = data
      const {progress} = data
      // const progressState = generated_tokens/tokens_to_generate*100
      const progressState = progress
      currentAudio.progress = progress
      // setCurrentAudio(currentAudio.toFixed(2))
      setCurrentAudio(prevState => ({ ...prevState, progress: Math.trunc(progressState) }))
      // console.log("progressState:", currentAudio.progress,"%");
    })

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

  }, [])

  useEffect(() => {
    console.log("audioData", audioData);
    if(!audioData.length){
      axios.get(`https://pipeline.choira.io/api/audio-files`).then((audioResp)=>{
        console.log("audioResp", audioResp.data);
        // const sortedAudioFiles =  audioResp.data.generations.sort((a, b) => b.timestamp - a.timestamp);
        const sortedAudioFiles =  audioResp.data.generations.reverse()
        // console.log("sortedAudioFiles", sortedAudioFiles);
        setAudioData(sortedAudioFiles)
      });
    }

  }, [audioData.length])
  
  // socket.on('connect',()=>{
  //   console.log("out Connected to server");
  // })
  // socket.on('disconect',()=>{
  //   console.log("out Disconnected to server");
  // })
  // socket.on('new_file',(data)=>{
  //   console.log("outside New file created",data);
  //   // setAudioData([...audioResp,])
  // })

  return (
    <>

      <div className="layout-content">


      <Row className="mb-24" style={{display:'flex',justifyContent:'space-evenly'}} >
        {/* <Col xs={24} md={12} sm={24} lg={12} xl={14} > */}
          <Card bordered={false} className="criclebox h-full">
            <Row gutter>
              <Col
                xs={24}
                md={12}
                sm={24}
                lg={12}
                xl={14}
                className="mobile-24"
                style={{display:'flex',justifyContent:'space-around'}}
              >
                <div className="h-full col-content p-20" style={{display:'flex',justifyContent:'space-evenly'}}>
                  <div className="ant-muse">
                    {/* <Text>Choira</Text> */}
                    {/* <Title level={5}>OASIS</Title> */}
                    <BeatingIndicator title={"OSIS"}/>
                    <Paragraph className="lastweek mb-36">
                    Our Osis is based on artistic intelligence and will help you to create amazing and the most unique music track very easily from your text description.
                    
                    </Paragraph>

                    <Form
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        initialValues={{
                          'input-number': 3,
                          'checkbox-group': ['A', 'B'],
                          rate: 3.5,
                          'duration':30,
                          method:true,
                          'cfg_coef':7,

                        }}
                        style={{
                          maxWidth: 600,
                        }}
                      >
                        {/* <Form.Item className="formLabel" label="Plain Text">
                          <span className="ant-form-text">music</span>
                        </Form.Item> */}
                        <Form.Item
                          className="formLabel"
                          name='duration'
                          label="Duration"
                          rules={[
                            {
                              required: true,
                              message: 'duration of track in seconds',
                            },
                            {
                              type: "number",
                              min:8, // Minimum value
                              message: "The duration must be at least 8 seconds!",
                            },
                            {
                              type: "number",
                              max:40, // Minimum value
                              message: "The duration must be at most 40 seconds!",
                            },
              
                          ]}
                        >
                          <InputNumber style={{ width: '50%',background:'#353839',color:"#F5F5F5" }} min={8} max={120} />
                        </Form.Item>
                        {/* <Form.Item
                          className="formLabel"
                          name="cfg_coef"
                          label="Creativity"
                          // hasFeedback
                          rules={[
                            {
                              required: true,
                              message: 'choose creativity level!',
                            },
                          ]}
                        >
                          <Slider
                            min={1}
                            max={10}
                            onChange={onChangeCreative}
                            // defaultValue = {7}
                            value={typeof creativeValue === 'number' ? creativeValue : 7}
                          />
                        </Form.Item> */}

                        <Form.Item
                          className="formLabel"
                          name="text"
                          label="Description"
                          rules={[
                            {
                              required: true,
                              message: 'Write a song description here to create your project',
                            },
                          ]}
                        >
                          <Input.TextArea maxLength={400} style={{background:'#353839', color:"#F5F5F5"}} />
                        </Form.Item>

                        <Form.Item  
                          className="formLabel"
                          name="method"
                          valuePropName="checked"
                          label="Generation"
                          >
                          <Switch className="formLabel" style={{background:'#353839', color:"#F5F5F5"}} checkedChildren="Background Music 🎼 " unCheckedChildren="✨ Complete Song " defaultChecked />
                        </Form.Item>

                        {/* <Form.Item
                          name="agreement"
                          valuePropName="checked"
                          rules={[
                            {
                              validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                          ]}
                          {...tailFormItemLayout}
                        >
                          <Checkbox>
                            I have read the <a href="">agreement</a>
                          </Checkbox>
                        </Form.Item> */}
                        
                        <Form.Item {...tailFormItemLayout} >
                          <Space span={2} direction="horizontal"  style={{ display: 'flex' }}>
                          <Button type="primary" name="AI" htmlType="submit" style={{background:'#faad14', borderColor: '#faad14'}}>
                          <span style={{color:"white",fontWeight:700,fontSize:20}}>Create ✨🚀</span>
                          </Button>
                          </Space>
                        </Form.Item>
                        {/* <Form.Item {...tailFormItemLayout}>
                          <Button type="primary" htmlType="submit" style={{background:'#faad14', borderColor: '#faad14'}}>
                          <span style={{color:"white",fontWeight:700,fontSize:20}}>Create 🚀</span>
                          </Button>
                        </Form.Item> */}
                        
                    </Form>

                  </div>
                  {/* <div className="card-footer">
                    <a className="icon-move-right" href="#pablo">
                      Read More
                      {<RightOutlined />}
                    </a>
                  </div> */}
                </div>
              </Col>
              <Col
                xs={24}
                md={12}
                sm={24}
                lg={12}
                xl={10}
                className="mainImg"
              >
                <div className="image-container ant-cret text-right ">
                  <img src={localText.img.length? localText.img: card} alt="" className="image  border10" /> 
                  {/* // artWork */}
                  {/* <Progress percent={currentAudio.progress} status="active" /> */}
                  <div className="overlay">
                    {/* <Waveform audio={`http://127.0.0.1:5000/static/audio/A rising synth.wav`} /> */}
                    {/* <Progress percent={70} status="active" /> */}
                    
                    {(currentAudio.output_filename != '') ? (
                      <>
                        <Waveform promt_gen={"genai"} playAudio={true} audio={currentAudio.output_filename} />
                        {/* <Button type="primary" icon={<DownloadOutlined />} size="default">
                          <a href={currentAudio.output_filename} download />
                        </Button> */}
                      </>
                    ) : (
                      currentAudio.progress > 0 && (
                        <Progress percent={currentAudio.progress} status="active" size="large" style={{ textColor: "#FCC200" }} />
                      )
                    )}

                  </div>
                  </div>
              </Col>
            </Row>
          </Card>
        {/* </Col> */}

      </Row>

      <Row gutter={[24, 0]}>
          <Col span={24} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Generated Music</Title>
                  <Paragraph className="lastweek">
                    created recently
                    {/* <span className="blue">40%</span> */}
                  </Paragraph>
                </div>
                {/* <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">ALL</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                      <Radio.Button value="c">STORES</Radio.Button>
                    </Radio.Group>
                  </div>
                </div> */}
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>Song description</th>
                      {/* <th>MEMBERS</th> */}
                      {/* <th>BUDGET</th> */}
                      <th>Track</th>
                      {/* <th>Date</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    
                    {audioData.map((d, index) => (
                      <tr key={index}>
                        {/* <td>{d.text.replace(".wav", "").replace("(1)", "")}</td> */}
                        <td>{d.user_prompt}</td>
                        <td>
                        <span className="text-xs font-weight-bold">
                          <Waveform audio={`https://pipeline.choira.io/api/audio/${d.filename}`} playAudio={false} />
                          {/* <Button type="primary" icon={<DownloadOutlined />} size={"default"} href={`http://ai.choira.io/static/audio/${d.audio_file}`} /> */}
                          {/* <audio id="audio_tag" src={`http://127.0.0.1:5000/static/audio/${d.audio_file}`} controls /> */}
                        </span>
                        </td>
                        <td>
                        {/* <Button type="primary" icon={<DownloadOutlined />} size={"default"} href={`https://pipeline.choira.io/static/audio/${d.audio_file}`} /> */}
                          {/* {`${new Date(d.timestamp).toLocaleDateString(undefined, {month: "short", day: "numeric"})} ${new Date(d.timestamp).toLocaleTimeString()}`} */}
                          {/* { new Date(d.timestamp).toLocaleString('en-us',dateOptions) } */}
                        </td>
                        
                        {/* <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.member}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">{d.progress}</div>
                        </td> */}
                      </tr>
                    ))}

                    <tr key={"0001"}>
                      <td>80s electronic track with melodic synthesizers, catchy beat and groovy bass</td>
                      <td>
                      <span className="text-xs font-weight-bold">
                        <Waveform audio={'https://ai.choira.io/music_examples/choiragen1.wav'} playAudio={false} />
                      </span>
                      </td>
                    </tr>
                    <tr key={"0002"}>
                      <td>A grand orchestral arrangement with thunderous percussion, epic brass fanfares, and soaring strings, creating a cinematic atmosphere fit for a heroic battle</td>
                      <td>
                      <span className="text-xs font-weight-bold">
                        <Waveform audio={'https://ai.choira.io/music_examples/choiragen2.wav'} playAudio={false} />
                      </span>
                      </td>
                    </tr><tr key={"0003"}>
                      <td>A light and cheerly EDM track, with syncopated drums, aery pads, and strong emotions</td>
                      <td>
                      <span className="text-xs font-weight-bold">
                        <Waveform audio={'https://ai.choira.io/music_examples/choiragen3.wav'} playAudio={false} />
                      </span>
                      </td>
                    </tr><tr key={"0004"}>
                      <td>Classic reggae track with an electronic guitar solo</td>
                      <td>
                      <span className="text-xs font-weight-bold">
                        <Waveform audio={'https://ai.choira.io/music_examples/choiragen4.wav'} playAudio={false} />
                      </span>
                      </td>
                    </tr><tr key={"0005"}>
                      <td>Violins and synths that inspire awe at the finiteness of life and the universe.</td>
                      <td>
                      <span className="text-xs font-weight-bold">
                        <Waveform audio={'https://ai.choira.io/music_examples/choiragen5.wav'} playAudio={false} />
                      </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div className="uploadfile shadow-none">
                <Upload {...uploadProps}>
                  <Button
                    // type="dashed"
                    className="ant-full-box"
                    // icon={<ToTopOutlined />}
                  >
                    <span className="click">Click to View all AI generated tracks</span>
                  </Button>
                </Upload>
              </div> */}
            </Card>
          </Col>
      </Row>

        {/* <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Projects</Title>
                  <Paragraph className="lastweek">
                    done this month<span className="blue">40%</span>
                  </Paragraph>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">ALL</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                      <Radio.Button value="c">STORES</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>COMPANIES</th>
                      <th>MEMBERS</th>
                      <th>BUDGET</th>
                      <th>COMPLETION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.member}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">{d.progress}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="uploadfile shadow-none">
                <Upload {...uploadProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    <span className="click">Click to Upload</span>
                  </Button>
                </Upload>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Orders History</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph>

                <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                >
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} REVERSE
                </Button>
              </div>
            </Card>
          </Col>
        </Row> */}

        <Row gutter={[24, 0]}>
          <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Row gutter>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={14}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div className="ant-muse">
                      <Text>Start with Choira</Text>
                      <Title level={5}>Music Ecosystem for the Digital Age</Title>
                      <Paragraph className="lastweek mb-36">
                      complete ecosystem to empower you with tools to jam, produce and explore music, the last remaining magic in this world.✨
                      </Paragraph>
                    </div>
                    <div className="card-footer">
                      <a className="icon-move-right" href="https://choira.io/">
                        Read More
                        {<RightOutlined />}
                      </a>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={10}
                  className="col-img"
                >
                  <div className="ant-cret text-right">
                    <img src={card1} alt="" className="border10" />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox card-info-2 h-full">
              <div className="gradent h-full col-content">
                <div className="card-content">
                  <Title level={5}>Book Studios in a BEAT</Title>
                  <p>
                  Simple way to book & record your next hit!
                  Be a part of an ever growing ecosystem of Music!
                  Book Create Play!
                  </p>
                </div>
                <div className="card-footer">
                  <a className="icon-move-right" href="https://studio.choira.io/">
                    Read More
                    <RightOutlined />
                  </a>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MainScreen;
