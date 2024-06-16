import React, { useState } from 'react';
import { Button, ListGroup, Form, Container, Row, Col } from 'react-bootstrap';

const DeleteNews = () => {
  // 假设这是从API获取的新闻数据
  const [newsList, setNewsList] = useState([
    { id: 1, title: '新闻标题1', date: '2024-06-16' },
    { id: 2, title: '新闻标题2', date: '2024-06-15' },
    // ...更多新闻
  ]);
  const [selectedNews, setSelectedNews] = useState([]);

  const handleSelectNews = (id) => {
    setSelectedNews(prevSelectedNews =>
      prevSelectedNews.includes(id)
        ? prevSelectedNews.filter(newsId => newsId !== id)
        : [...prevSelectedNews, id]
    );
  };

  const handleDeleteSelected = () => {
    // 在这里添加删除逻辑，例如API调用
    setNewsList(newsList.filter(news => !selectedNews.includes(news.id)));
    setSelectedNews([]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <ListGroup>
            {newsList.map(news => (
              <ListGroup.Item key={news.id} className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  checked={selectedNews.includes(news.id)}
                  onChange={() => handleSelectNews(news.id)}
                />
                <div className="ms-2">
                  <div className="fw-bold">{news.title}</div>
                  <div>{news.date}</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="danger" onClick={handleDeleteSelected} className="mt-3">
            删除
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteNews;
