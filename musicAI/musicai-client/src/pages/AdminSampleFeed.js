import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { TweenOneGroup } from 'rc-tween-one';
import axios from 'axios';

// components
import {
  Layout,
  Typography,
  Menu,
  Button,
  Form,
  Input,
  message,
  InputNumber,
  Card,
  Row,
  Col,
  Progress,
  Tag,
  Upload,

} from 'antd';

import { 
  PlusOutlined,
  InboxOutlined,

 } from '@ant-design/icons';

// assets
import card from "../assets/images/generated-img-1.png";



// ----------------------------------------------------------------------

const { Title, Paragraph } = Typography;
const { Header, Footer, Content } = Layout;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

// ----------------------------------------------------------------------


function AdminSampleFeed () {

  const [audioData, setAudioData] = useState({audioDescription:'', loading: false, ack:''})
  const [currentAudio, setCurrentAudio] = useState({ output_filename:'', audioID: 0, progress:0, showWave: false });
  const [localID, setLocalID] = useState(0);
  const [localText, setLocalText] = useState({text:'',img:''});
  // const { token } = theme.useToken();
  const [tags, setTags] = useState(['hiphop','track']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const formData = new FormData();

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
  
  const tagPlusStyle = {
    background: 'transparent',
    borderStyle: 'dashed',
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: 'inline-block',
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = tags.map(forMap);
  

  const beforeUpload = (file) => {
    const allowedExtensions = ['.mp3', '.wav']; 

    // Check if the file exists
    if (!file) {
      return false;
    }

    // Check the file extension
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(`.${fileExtension}`)) {
      return false;
    }
    const fileSize = file.size;
    if (fileSize > MAX_FILE_SIZE) {
      console.error('File size exceeds the limit');
      return false; // Prevent file upload
    }
    // Check if the file is playable
    const audioElement = new Audio();
    const fileUrl = URL.createObjectURL(file);
    audioElement.src = fileUrl;
    
    const canPlayPromise = audioElement.canPlayType(file.type);
    URL.revokeObjectURL(fileUrl);

    if (canPlayPromise === '') {
      return false;
    }
    const audioDesc = convertFilenameToDescription(file.name)
    console.log({audioDesc});
    setAudioData((preVal)=>({
      ...preVal,
      audioDescription: audioDesc || ''
    }))
    return true; // Allow file upload
  };

  const handleFileChange = (e) => {
    // console.log(e);
    const audioDesc = convertFilenameToDescription(e.file.name)
    console.log({audioDesc});
    setAudioData((preVal)=>({
      ...preVal,
      audioDescription: audioDesc || ''
    }))
  };


  const onFinish = async (values) => {
    message.loading(" Publishing Audio...✈️")
    setAudioData(prevData => ({ ...prevData, loading: true }));


    const { file, description } = values;
    // console.log("file", file);
    try {
      // Perform audio file validation or processing here
      const isValidAudio = await beforeUpload(file[0].originFileObj);
      // console.log("isValidAudio", isValidAudio);
      if (isValidAudio) {
        const formData = new FormData();
        formData.append('audio', file[0].originFileObj);
        formData.append('description', description || audioData.audioDescription);
        formData.append('sound-effect', 1);
        formData.append('genere', tags.join(', '));

        for (var key of formData.entries()) {
          console.log(key[0] + ', ' + key[1]);
        }

        axios.post('http://ai.choira.io/library/upload_sample', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            setAudioData((preVal)=>({ ...preVal,loading:false}))
            if(response?.data?.status) {
              
              message.success('File uploaded successfully');
            }
            // setAudioData((preVal)=>({
            //   ...preVal,
            //   loading:!loading,
            //   ack: 'File uploaded successfully'
            // }))
          })
          .catch((error) => {
            message.error('Error uploading file');
            // setAudioData((preVal)=>({
            //   ...preVal,
            //   loading:!loading,
            //   ack: 'File uploading file'
            // }))
          });
      } else {
        message.warning('Invalid audio file');
        // setAudioData((preVal)=>({
        //   ...preVal,
        //   loading:!loading,
        //   ack: 'Invalid audio file'
        // }))
      }
    } catch (error) {
      message.warning('Error processing audio file');
      setAudioData((preVal)=>({
        ...preVal,
        loading:false,
        ack: 'File uploaded successfully'
      }))
    }
    setAudioData((preVal)=>({ ...preVal,loading:false}))
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  return (
    <>
    {/* <RootStyle> */}
      {/* <MainStyle> */}
      <Layout className="layout-default layout-admin" >
        <Header>
          <div className="header-col header-brand demo-logo" style={{marginTop:'10px'}} >
            {/* <h5>Choira</h5> */}
          </div>
          <div className="header-col header-nav" >
            <Menu mode="horizontal" defaultSelectedKeys={["1"]} >
              <Menu.Item key="1">
                <Link to="/dashboard">
                  {/* {template} */}
                  <span> Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/#">
                  {/* {profile} */}
                  <span>Uploaded samples</span>
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="3">
                <Link to="/#">
                  {signup}
                  <span> </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/#">
                  {signin}
                  <span> Sign In</span>
                </Link>
              </Menu.Item> */}
            </Menu>
          </div>
          <div className="header-col header-btn">
            <Button type="primary" style={{ width: "100%", background: '#ffc701', borderColor: '#ffc701' }}>choira.io</Button>
          </div>
        </Header>

        <Content className="content-ant">
        <Row className="mb-24" style={{display:'flex',justifyContent:'space-evenly'}} >
        {/* <Col xs={24} md={12} sm={24} lg={12} xl={14} > */}
          <Card bordered={false} className="criclebox h-full">
            <Row gutter style={{display:'flex',justifyContent:'space-evenly'}}>
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
                    <Title level={5}>Music Sample Uploader </Title>
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
                          'cfg_coef':7,
                          description: audioData.audioDescription

                        }}
                        style={{
                          maxWidth: 600,
                        }}
                      >
                        <Form.Item
                          className="formLabel"
                          name='title'
                          label="Title"
                          rules={[
                            {
                              required: true,
                              message: 'Title of sample',
                            },
                          ]}
                        >
                          <Input style={{ width: '50%',background:'#353839',color:"#F5F5F5" }} placeholder='Hip Hop Lo-Fi Beat...' value={audioData.audioDescription} />
                        </Form.Item>

                        <Form.Item
                          className="formLabel"
                          name='tag'
                          label="Tags"
                          rules={[
                            {
                              // required: true,
                              message: 'Tags for sample',
                            },
                          ]}
                        >
                          <div
                          style={{
                            marginBottom: 16,
                          }}
                        >
                          <TweenOneGroup
                            enter={{
                              scale: 0.8,
                              opacity: 0,
                              type: 'from',
                              duration: 100,
                            }}
                            onEnd={(e) => {
                              if (e.type === 'appear' || e.type === 'enter') {
                                e.target.style = 'display: inline-block';
                              }
                            }}
                            leave={{
                              opacity: 0,
                              width: 0,
                              scale: 0,
                              duration: 200,
                            }}
                            appear={false}
                          >
                            {tagChild}
                          </TweenOneGroup>
                        </div>
                        {inputVisible ? (
                          <Input
                            ref={inputRef}
                            type="text"
                            size="small"
                            style={{
                              width: 78,
                            }}
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputConfirm}
                            onPressEnter={handleInputConfirm}
                          />
                        ) : (
                          <Tag onClick={showInput} style={tagPlusStyle}>
                            <PlusOutlined /> New Tag
                          </Tag>
                        )}

                        </Form.Item>


                        <Form.Item
                          className="formLabel"
                          name="description"
                          label="Description"
                          rules={[
                            {
                              // required: true,
                              message: 'Write a Sample description',
                            },
                          ]}
                        >
                          <Input.TextArea maxLength={400} style={{background:'#353839', color:"#F5F5F5"}} value={audioData.audioDescription} />
                        </Form.Item>

                        {/* <Form.Item label="Dragger"> */}
                        <Form.Item name="file" valuePropName="fileList" getValueFromEvent={normFile} 
                          className="formLabel"
                          label="Upload"
                          rules={[
                            {
                              required: true,
                              message: 'upload single sample',
                            },
                          ]}
                        >
                          <Upload.Dragger name="files" style={{ background:'#353839',color:"#F5F5F5" }} maxCount={1} beforeUpload={beforeUpload} action={'http://ai.choira.io/library/upload_sample'}>
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            {/* <p className="ant-upload-hint">Support for a single or bulk upload.</p> */}
                          </Upload.Dragger>
                        </Form.Item>
                        {/* </Form.Item> */}

                        <Form.Item {...tailFormItemLayout}>
                          <Button type="primary" htmlType="submit" style={{background:'#faad14', borderColor: '#faad14'}} loading={audioData.loading}>
                          <span style={{color:"white",fontWeight:700,fontSize:20}}>{!audioData.loading?'Publish 🚀 ':'Publish-IN...✈️'} </span>
                          </Button>
                        </Form.Item>
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
              
            </Row>
          </Card>
        {/* </Col> */}

      </Row>
        </Content>

      </Layout>
      {/* </MainStyle> */}
      {/* </RootStyle> */}
    </>
  )
}

const convertFilenameToDescription = (filename) => {
  // Remove file extension
  const nameWithoutExtension = filename.replace(/\.[^.]+$/, '');
  
  // Convert underscores to spaces
  const nameWithSpaces = nameWithoutExtension.replace(/_/g, ' ');
  
  // Capitalize first letter of each word
  const words = nameWithSpaces.split(' ');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
  // Join the words back into a single string
  const description = capitalizedWords.join(' ');

  return description;
};


export default AdminSampleFeed;