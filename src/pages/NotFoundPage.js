// NotFoundPage.js
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFoundPage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <h1 className="display-1">404</h1>
          <h2>Страница не найдена!</h2>
          <p className="mt-3">К сожалению, запрашиваемая вами страница не существует или была перемещена.</p>
          <LinkContainer to="/">
            <Button variant="primary" className="mt-4">Вернуться на главную страницу</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
