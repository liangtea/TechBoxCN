import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';

const listItems = [
    {
        thumbnail: 'path/to/your/thumbnail.jpg',
        title: '标题1',
        subtitle: '子标题1',
        description: '这里是正文内容1',
        updateTime: '2024年6月15日 00:43:34'
    },

    // ...更多列表项
];

const Home = () => {
    return (
        <Container>
            <ListGroup>
                {listItems.map((item, index) => (
                    <ListGroup.Item key={index} className="list-group-item">
                        <Row>
                            <Col xs={4} md={2}>
                                <Image src={logo} className="no-border" style={{ width: '120px', height: '120px' }} />
                            </Col>
                            <Col xs={8} md={10} className="text-left-align">
                                <h4 className="small-title">{item.title}</h4>
                                <h5 className="small-subtitle">{item.subtitle}</h5>
                                <p className="small-text">{item.description}</p>
                            </Col>
                            <small className="update-time">{item.updateTime}</small> {/* 更新时间 */}
                        </Row>
                    </ListGroup.Item>

                ))}
            </ListGroup>
        </Container>
    );
};

export default Home;
