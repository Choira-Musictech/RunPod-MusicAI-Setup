import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import axios from "axios";
import "./green.css";

const { Title } = Typography;

const BeatingIndicator = () => {
    const [isGreen, setIsGreen] = useState(3);

    useEffect(() => {
        axios.get(`https://pipeline.choira.io/api/health`,{ timeout: 3000 }).then((resp)=>{
            setIsGreen(1);
        }).catch(err=>{            
            setIsGreen(2);
        });
    }, [])
    

  return (
    <div className="title-indicator-container">
      <Title level={5}>AI Music Generator</Title>
      <div
        className={`beating-circle ${isGreen === 1 ? "green" : (isGreen === 2 ? "red": "grey")}`}
      ></div>
    </div>
  );
};

export default BeatingIndicator;
