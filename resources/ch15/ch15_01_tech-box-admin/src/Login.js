import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import logo from './logo.png'; // 确保logo图片在正确的路径
import { useNavigate } from 'react-router-dom';

const loginUrl = process.env.REACT_APP_LOGIN_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 发送POST请求到后端的登录接口
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // 如果后端返回了token，保存它到localStorage
          localStorage.setItem('token', data.token);
          // 跳转到发布页面
          navigate('/publish');
        } else {
          // 如果登录失败，处理错误
          alert('登录失败: ' + data.error);
        }
      })
      .catch(error => {
        // 处理网络或其他错误
        console.error('登录时发生错误:', error);
        alert('登录时发生错误，请稍后再试。');
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '320px' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" width="72" height="72" />
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="账号"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          登录
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
