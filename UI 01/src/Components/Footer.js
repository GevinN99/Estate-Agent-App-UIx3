import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {FaFacebookSquare, FaGoogle, FaInstagram, FaLinkedin} from "react-icons/fa";
import {FaSquareXTwitter} from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="card-footer text-center text-lg-start text-light bg-body-tertiary">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>
                <div>
                    <div className="icon-footer">
                        <a href="" className="me-4 text-reset">
                            <FaFacebookSquare />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <FaSquareXTwitter />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <FaGoogle />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <FaInstagram />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </section>
            <section>
                <Container className="text-center text-md-start mt-5">
                    <Row className="mt-3">
                        <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i>Company name
                            </h6>
                            <p>
                                Whether you’re an estate agent looking to expand your reach or a buyer seeking your dream property, the Estate Agent App makes the process efficient, transparent, and hassle-free. Join us in transforming the real estate landscape!
                            </p>
                        </Col>
                        <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Products
                            </h6>
                            {/* Add your product links here */}
                        </Col>
                        <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Useful links
                            </h6>
                            {/* Add your useful links here */}
                        </Col>
                        <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
                            <p>
                                <i className="fas fa-envelope me-3"></i>
                                info@example.com
                            </p>
                            <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                            <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                © 2024 Copyright:
                <a className="text-reset fw-bold" href="#!">YourWebsiteName</a>
            </div>
        </footer>
    );
}
