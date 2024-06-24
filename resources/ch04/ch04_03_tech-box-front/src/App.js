import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar, Nav, Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import './App.css'; // 确保你有一个App.css文件来包含全局样式

const listItems = [
  {
    thumbnail: 'path/to/your/thumbnail.jpg',
    title: '标题1',
    subtitle: '子标题1',
    description: '这里是正文内容1',
    updateTime: '2024年6月15日 00:43:34'
  },
  {
    thumbnail: 'path/to/your/thumbnail.jpg',
    title: '标题1',
    subtitle: '子标题1',
    description: '这里是正文内容1',
    updateTime: '2024年6月15日 00:43:34'
  },
  {
    thumbnail: 'path/to/your/thumbnail.jpg',
    title: '标题1',
    subtitle: '子标题1',
    description: '这里是正文内容1',
    updateTime: '2024年6月15日 00:43:34'
  },
  {
    thumbnail: 'path/to/your/thumbnail.jpg',
    title: '标题1',
    subtitle: '子标题1',
    description: '这里是正文内容1',
    updateTime: '2024年6月15日 00:43:34'
  },
  {
    thumbnail: 'path/to/your/thumbnail.jpg',
    title: '标题1',
    subtitle: '子标题1',
    description: '这里是正文内容1',
    updateTime: '2024年6月15日 00:43:34'
  },
  {
    thumbnail: 'path/to/your/thumbnail.jpg',
    title: '标题1',
    subtitle: '子标题1',
    description: '这里是正文内容1',
    updateTime: '2024年6月15日 00:43:34'
  },
  {
    thumbnail: 'path/to/your/thumbnail.jpg',
    title: '标题1',
    subtitle: '子标题1',
    description: '这里是正文内容1',
    updateTime: '2024年6月15日 00:43:34'
  },
  {
    thumbnail: 'path/to/your/thumbnail.jpg',
    title: '标题1',
    subtitle: '子标题1',
    description: '这里是正文内容1',
    updateTime: '2024年6月15日 00:43:34'
  },
  {
    thumbnail: 'path/to/your/thumbnail.jpg',
    title: '标题1',
    subtitle: '子标题1',
    description: '这里是正文内容1',
    updateTime: '2024年6月15日 00:43:34'
  },


  // ...更多列表项
];


// NavigationBar组件代码
const NavigationBarWithList = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="Logo"
              src={logo} // 这里应该是你的logo图片路径
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            TechBox
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">主页</Nav.Link>
              <Nav.Link href="#about">关于</Nav.Link>
              <Nav.Link href="#contact">联系方式</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <ListGroup>
          {listItems.map((item, index) => (
            <ListGroup.Item key={index} className="list-group-item">
              <Row>
                <Col xs={4} md={2}>
                  <Image src={logo} className="no-border" style={{ width: '120px', height: '120px' }} />
                </Col>
                <Col xs={8} md={10} className="text-left-align">
                  <h4 className="small-title">{item.title}</h4>
                  <h5 className="small-subtitle">{item.subtitle}</h5>
                  <p className="small-text">{item.description}</p>
                </Col>
                <small className="update-time">{item.updateTime}</small> {/* 更新时间 */}
              </Row>
            </ListGroup.Item>

          ))}
        </ListGroup>
      </Container>
    </>
  );
};

// App组件代码
function App() {
  return (
    <div className="App">
      <NavigationBarWithList /> {/* 这里使用NavigationBar组件 */}
      {/* 其他组件和内容可以在这里添加 */}
    </div>
  );
}

export default App;

