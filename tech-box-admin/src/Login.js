import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import logo from './logo.png'; // 确保logo图片在正确的路径

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 在这里处理登录逻辑，例如API调用
    console.log({ username, password });
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
