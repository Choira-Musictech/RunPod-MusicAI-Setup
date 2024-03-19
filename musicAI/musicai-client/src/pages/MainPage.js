import React from 'react'
import { Layout, Space, Col, Row } from 'antd';
import "antd/dist/antd.css";
import '../assets/styles/mainpage.css'



const { Header, Footer, Sider, Content } = Layout;



const MainPage = () => {
  return (
    <div>
      <Layout>
        <Header className={'headerStyle'}> <img className="group-5" alt="Group" src="https://choira.io/static/media/choria.96439620.svg" /></Header>
        <Content className={'contentStyle'}>
        <Row gutter={[8, 16]}>
        <Row gutter={[16, 24]} justify="center">
          <Col className="gutter-row" span={1}>
            <div >col-6</div>
          </Col>
        </Row>
        </Row>
        <Row gutter={[8, 16]}>
          View Music
        </Row>
        <Row gutter={[8, 16]}>
          Ad Banner
        </Row>
        </Content>
        <Footer className={'footerStyle'}>Footer</Footer>
    </Layout>
    </div>
  )
}

export default MainPage