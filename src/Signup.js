import React from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Card, CardBody, CardHeader, Col, Container, Form, Row} from "reactstrap";
import './Signup.css';

class Signup extends React.Component{

    submitHandler = (event) => {
        event.preventDefault();
        console.log("sign up successful!!");
    }



render(){
    return(
        <Container fluid id="content">
            <Col>
                <Row className="justify-content-center">
                    <h1>JUST BID IT</h1>
                </Row>
                <Row className="mb-3"/>
                <Row className="justify-content-center">
                    {/* <Example username={this.state.username} onButtonClick={()=>{this.innerButton()}}/> */}
                    <Col className="align-self-center" xs="auto">
                        <Card id="signup_form">
                            <CardHeader>
                                REGISTRATION FORM
                            </CardHeader>
                            <CardBody>
                                <p className="small text-muted">Register to use our services</p>
                                <Form>
                                        <br/>
                                        <Row>
                                            <Col> First Name </Col>
                                            <Col> <input type="text" name="firstname"/> </Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Last Name </Col>
                                            <Col> <input type="text" name="lastname"/> </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Email </Col>
                                            <Col><input type="email" placeholder="example@example.com" name="email"/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Country </Col>
                                            <Col><input type="text" name="country"/> </Col>
                                        </Row>
                                        <br/>
                                        <Row>

                                            <Col>Location</Col>
                                            <Col> <input type="text" name="location"/></Col>
                                        </Row>
                                        <br/>

                                        <Row>

                                        <Col>Phone number</Col>
                                        <Col><input type="text" name="phone_number"/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Tax registration number</Col>
                                            <Col><input type="text" name="tax_registration_number"/></Col>

                                        </Row>
                                        <br/>
                                        <hr/>
                                        <br/>
                                        <Row>
                                            <Col>Username</Col>
                                            <Col><input type="text" name="username"/></Col>


                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Password</Col>
                                            <Col><input type="password" name="password"/></Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Confirm password</Col>
                                            <Col><input type="password" name="password1"/></Col>
                                        </Row>

                                        <br/>
                                        <br/>
                                    <Button onClick={this.submitHandler}>
                                        Submit
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Container>
    )
    }
}

export default withRouter(Signup);