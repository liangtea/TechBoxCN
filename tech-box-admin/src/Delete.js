import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const newsUrl = process.env.REACT_APP_NEWS_URL;
const deleteUrl = process.env.REACT_APP_DELETE_URL;

const DeleteNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedNews, setSelectedNews] = useState([]);
  const navigate = useNavigate();

  // 获取新闻列表的函数
  const fetchNewsList = () => {
    fetch(newsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ method: 'get_news_list' })
    })
      .then(response => response.json())
      .then(data => {
        setNewsList(data); // 假设返回的数据是一个数组
      })
      .catch(error => {
        console.error('获取新闻列表失败:', error);
      });
  };

  // 组件加载时获取新闻列表
  useEffect(() => {
    fetchNewsList();
  }, []);

  const handleSelectNews = (id) => {
    setSelectedNews(prevSelectedNews =>
      prevSelectedNews.includes(id)
        ? prevSelectedNews.filter(newsId => newsId !== id)
        : [...prevSelectedNews, id]
    );
  };

  const handleDeleteSelected = () => {
    // 检查是否有选中的新闻
    if (selectedNews.length === 0) {
      alert('请选择要删除的新闻！');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      // 如果没有token，重定向到登录页面
      navigate('/login');
      return;
    }

    // 发送DELETE请求到后端
    fetch(deleteUrl, {
      method: 'POST', // 或者如果后端期望DELETE方法，可以改为'DELETE'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(selectedNews) // 发送选中新闻的ID数组
    })
      .then(response => {
        if (!response.ok && response.status === 401) {
          // 如果响应状态码为401，表示认证失败
          throw new Error('认证失败，请重新登录。');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          // 如果后端返回成功，更新前端的新闻列表
          fetchNewsList();
          setSelectedNews([]); // 清空选中的新闻
          setShowAlert(true); // 显示删除成功的提示
          setTimeout(() => setShowAlert(false), 3000); // 3秒后隐藏提示
        } else {
          // 如果后端返回失败，显示错误消息
          alert(`删除失败: ${data.message}`);
        }
      })
      .catch(error => {
        // 处理网络或其他错误
        console.error('删除时发生错误:', error);
        alert('删除时发生错误，请稍后再试。');
        navigate('/login');
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            删除成功！
          </Alert>}
          <ListGroup>
            {newsList.map(news => (
              <ListGroup.Item key={news.id} className="d-flex align-items-center" style={{ justifyContent: 'flex-start' }}>
                <Form.Check
                  type="checkbox"
                  checked={selectedNews.includes(news.id)}
                  onChange={() => handleSelectNews(news.id)}
                />
                <div className="ms-2" style={{ width: '100%' }}>
                  <div className="fw-bold" style={{ textAlign: 'left' }}>{news.title}</div>
                  <div style={{ fontSize: '0.75em', textAlign: 'left' }}>
                    {new Date(news.publish_time).toISOString().replace(/T/, ' ').replace(/\..+/, '')}
                  </div>
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
