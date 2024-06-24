import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Publish = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [preface, setPreface] = useState('');
  const [content, setContent] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
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
