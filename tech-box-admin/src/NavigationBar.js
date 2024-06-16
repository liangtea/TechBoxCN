import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// NavigationBar组件代码
const NavigationBar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // 清除localStorage中的token
        localStorage.removeItem('token');
        // 跳转回登录页面
        navigate('/login');
    };

    // ...组件代码
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
                        管理后台
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/publish">发布</Nav.Link>
                            <Nav.Link as={Link} to="/delete">删除</Nav.Link>
                            <Nav.Link onClick={handleLogout}>退出</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
export default NavigationBar;