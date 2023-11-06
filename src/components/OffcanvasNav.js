import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffcanvasNav({ onDropdownToggle }) {
  // variants of nav adapations that can be used
  // [false, 'sm', 'md', 'lg', 'xl', 'xxl']


  
  let JS =[
    {title: 'String Methods', url: './js-string-methods'}
  ];
  // for (let i = 0; i <100; i++){
  //   example[i] = 'example';
  // }
  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="navbar-custom navbar-dark bg-dark main-nav">
          <Container fluid>
            <Navbar.Brand href="#">RA</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  RA
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/" className="nav-link-custom" >Home</Nav.Link>
                  <Nav.Link href="#action2" className="nav-link-custom">Link</Nav.Link>
                  <NavDropdown
                    drop="up"
                    title="JavaScript"
                    className="nav-dropdown-custom"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    onToggle={(isOpen, event, metadata) => onDropdownToggle(isOpen)}
                  >
                    {JS.map((item, i) => {
                      return (<NavDropdown.Item key={'nav-drop-js-'+i} href={item.url} className="nav-link-custom">{item.title}</NavDropdown.Item>)
                    })}

                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success" className="navbar-btn-custom">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasNav;