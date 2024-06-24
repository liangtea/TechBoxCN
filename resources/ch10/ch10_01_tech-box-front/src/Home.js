import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3005/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ method: 'get_news_list' }),
        })
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(item => ({
                    thumbnail: item.image_url,
                    title: item.title,
                    subtitle: item.subtitle,
                    description: item.preface.length > 50 ? item.preface.substring(0, 50) + '...' : item.preface,
                    updateTime: new Date(item.publish_time).toLocaleString('zh-CN'),
                }));
                setListItems(formattedData);
            })
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    return (
        <Container>
            <ListGroup>
                {listItems.map((item, index) => (
                    <ListGroup.Item key={index} className="list-group-item">
                        <Row>
                            <Col xs={4} md={2}>

                                <Image
                                    src={item.thumbnail || logo}
                                    className="no-border"
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Col>
                            <Col xs={8} md={10} className="text-left-align">
                                <div style={{ marginTop: '0.8rem' }}>
                                    <h5 className="small-title">{item.title}</h5>
                                </div>

                                <p className="small-text">{item.description}</p>
                                <small className="update-time">{item.updateTime}</small> {/* 更新时间 */}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Home;
