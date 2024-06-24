import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Publish = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [preface, setPreface] = useState('');
  const [content, setContent] = useState('');
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // 新增状态控制提示显示

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;


    const date = new Date();
    const mysqlDateString = date.toISOString().slice(0, 19).replace('T', ' ');

    if (form.checkValidity() === true) {
      // 构建要发送的数据对象
      const formData = {
        title,
        subtitle,
        image_url: imageUrl,
        preface,
        content,
        publish_time: mysqlDateString // 使用当前时间作为发布时间
      };

      // 从localStorage获取JWT
      const token = localStorage.getItem('token');
      if (!token) {
        // 如果没有token，重定向到登录页面
        navigate('/login');
        return;
      }

      // 发送POST请求到后端
      fetch('http://localhost:3005/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (!response.ok && response.status === 401) {
            // 如果响应状态码为401，表示认证失败
            throw new Error('认证失败，请重新登录。');
          }
          return response.json();
        })
        .then(data => {
          setShowAlert(true); // 显示成功提示
          // 清空表单
          setTitle('');
          setSubtitle('');
          setImageUrl('');
          setPreface('');
          setContent('');
          setValidated(false); // 重置表单验证状态
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        })
        .catch(error => {
          console.error(error);
          // 认证失败或其他错误，重定向到登录页面
          navigate('/login');
        });
    } else {
      setValidated(true);
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            发布成功！
          </Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>标题</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="输入标题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                请输入标题。
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubtitle">
              <Form.Label>副标题</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="输入副标题"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                请输入副标题。
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImageUrl">
              <Form.Label>图片地址</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="输入图片URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                请输入图片地址。
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPreface">
              <Form.Label>前言</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="输入前言"
                value={preface}
                onChange={(e) => setPreface(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                请输入前言。
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>正文</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={5}
                placeholder="输入正文内容"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                请输入正文内容。
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              发布
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Publish;
