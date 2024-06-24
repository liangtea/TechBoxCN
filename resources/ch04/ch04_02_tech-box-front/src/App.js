import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css'; // 确保你有一个App.css文件来包含全局样式

// NavigationBar组件代码
const NavigationBar = () => {
  return (
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
  );
};

// App组件代码
function App() {
  return (
    <div className="App">
      <NavigationBar /> {/* 这里使用NavigationBar组件 */}
      {/* 其他组件和内容可以在这里添加 */}
    </div>
  );
}

export default App;

