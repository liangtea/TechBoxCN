import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Image, Modal } from 'react-bootstrap';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [listItems, setListItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});

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
                    id: item.id, // 保存id
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

    const fetchNewsDetail = (id) => {
        fetch('http://localhost:3005/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ method: 'get_news_by_id', id }),
        })
            .then(response => response.json())
            .then(data => {
                setModalContent({
                    ...data,
                    thumbnail: data.image_url,
                    updateTime: new Date(data.publish_time).toLocaleString('zh-CN'),
                });
                setShowModal(true);
            })
            .catch(error => console.error('Error fetching news detail:', error));
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Container>
            <ListGroup>
                {listItems.map((item, index) => (
                    <ListGroup.Item key={index} className="list-group-item" onClick={() => fetchNewsDetail(item.id)}>
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
                                <small className="update-time">{item.updateTime}</small>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal show={showModal} onHide={handleCloseModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modalContent.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <small>{modalContent.subtitle}, {modalContent.updateTime}</small>
                    </p>
                    <p>{modalContent.preface}</p>
                    <Image src={modalContent.thumbnail || logo} fluid />
                    <div>{modalContent.content}</div>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Home;
