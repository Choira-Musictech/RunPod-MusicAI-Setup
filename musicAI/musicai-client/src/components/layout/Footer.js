

import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter >
      {/* style={{ background: "#fafafa" }} */}
      <Row className="">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2023, made with
            {<HeartFilled />} by
            <a href="#" className="font-weight-bold" target="_blank">
              Choira
            </a>
            the last remaining magic in this world.✨
          </div>
        </Col>
        <Col xs={24} md={12} lg={12} >
          <div className="footer-menu" >
            <ul>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Choira AI
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://choira.io/#/about"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              {/* <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  License
                </a>
              </li> */}
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
