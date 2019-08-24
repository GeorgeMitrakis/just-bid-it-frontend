import React from "react";
import { withRouter } from 'react-router-dom';
import { getUserInfoField } from './Utility';
import './UserData.css'
import {Card, CardBody, CardHeader, Col, Container, Form, Row} from "reactstrap";

class UserData extends React.Component{
    render() {
        return(
            <div>
                <h3> Thank you for your sign up ,Username!</h3>
                <h4> Confrirmation pending...</h4>
                    <h1 id='title'></h1>
                <Container fluid id="content">
                    <Col>
                        <Row className="mb-3"/>
                        <Row className="justify-content-center">
                            {/* <Example username={this.state.username} onButtonClick={()=>{this.innerButton()}}/> */}
                            <Col className="align-self-center" xs="auto">
                                <Card id="usertable">
                                    <CardHeader>
                                     This is your information card
                                    </CardHeader>
                                    <CardBody>
                                        <br/>
                                        <Row>
                                            <Col> First Name </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Last Name </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Email </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Country </Col>
                                        </Row>
                                        <br/>
                                          <Row>
                                        <Col>Location</Col>
                                         </Row>
                                         <br/>
                                        <Row>
                                            <Col>Phone number</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Tax registration number</Col>
                                        </Row>
                                        <br/>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Container>


            </div>
        )
    }


}
export default withRouter(UserData);