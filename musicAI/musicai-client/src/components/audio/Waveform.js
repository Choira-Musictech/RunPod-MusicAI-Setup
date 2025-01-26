import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';
import { Button } from 'antd';
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
  } from '@ant-design/icons';

const Waveform = ({promt_gen, audio,playAudio }) => {
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [isPlaying, toggleIsPlaying] = useState(false);
  const [fileReady, setFileReady] = useState(false);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      waveColor: 'gold',
      progressColor: 'rgb(100, 0, 100)',
      container: containerRef.current,
      responsive: true,
      barWidth: 3,
      barGap: 2,
      barRadius:2,
      barHeight: 1,
      cursorWidth: 0,
    });
    waveSurfer.load(audio);
    waveSurfer.on('ready', () => {
      if(promt_gen === "genai") setFileReady(true);
      waveSurferRef.current = waveSurfer;
      if(playAudio){
        waveSurferRef.current.playPause();
        toggleIsPlaying(waveSurferRef.current.isPlaying());
      }
    });
    // waveSurfer.params.container.querySelector('audio').controls = true

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  return (
    <WaveSurferWrap>
      {/* {fileReady || promt_gen !== "genai" ? <Button */}
      <Button
        size='large'
        onClick={() => {
          if(fileReady || promt_gen !== "genai"){
            waveSurferRef.current?.playPause();
            toggleIsPlaying(waveSurferRef.current?.isPlaying());
          }
          
        }}
        type="button"
      >
        {isPlaying ? <PauseCircleOutlined style={{fontSize:"16px"}} size="large" /> : <PlayCircleOutlined style={{fontSize:"400"}} />}
      </Button>
      <div ref={containerRef} />
    </WaveSurferWrap>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
};

const WaveSurferWrap = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;
  width:400px;

  button {
    width: 100%;
    height: 40px;
    border: none;
    padding: 0;
    // background-color: transparent;
  }
`;


export default Waveform;