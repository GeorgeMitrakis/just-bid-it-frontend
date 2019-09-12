import React from 'react';
import {withRouter} from 'react-router-dom';
import CardTitle from "reactstrap/es/CardTitle";
import {Button, Card, CardHeader, Col, Container, Row, Table} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Form from "reactstrap/es/Form";
import {content} from "../Signup/Signup.module.css";


class MessageForm extends React.Component{




    render() {
        return(
                <Container fluid id={content}>
                    <Row className="mb-3"/>
                    <Row className="justify-content-center">
                        <Col className="align-self-center" xs="auto">
                            <Card id="signup_form">
                                <h2>
                                    New Message
                                </h2>
                                <CardBody>
                                    <Form style ={{width : '600px'}}>
                                        <br/>
                                        <Row>
                                            <Col className="d-flex justify-content-center">
                                                <h4> To: {'  '} </h4> {' '}<input type="text" placeholder="username"  className="form-control form-control-sm" />
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col className="d-flex justify-content-center"  style={{width:'500px' , height:'200px'}}>
                                                {/*<input type="textarea" name="description" required  className="form-control " rows = "3"/>*/}
                                                <textarea className="form-control" rows="3" placeholder ="Write your message here"></textarea>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row className="d-flex justify-content-around">
                                            <Button type="button" color="muted" className="btn btn-outline-secondary"
                                            >
                                                Clear text
                                            </Button>

                                            <Button type="button" color="muted" className="btn btn-outline-secondary"
                                            >
                                                Send
                                            </Button>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>


        )
    }

}
export default withRouter(MessageForm);