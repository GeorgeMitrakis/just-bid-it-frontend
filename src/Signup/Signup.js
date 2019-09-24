import React from 'react';
import { withRouter } from 'react-router-dom';
import {Alert, Button, Card, CardBody, CardHeader, Col, Container, Form, Row} from "reactstrap";
import {content} from './Signup.module.css';
import $ from 'jquery';
// import { getUserInfo } from './Utility';
class Signup extends React.Component{

    constructor(props) {
        super(props);
        this.firstname = React.createRef();
        this.lastname = React.createRef();
        this.email = React.createRef();
        this.country = React.createRef();
        this.location = React.createRef();
        this.phonenumber = React.createRef();
        this.taxregristrationnumber = React.createRef();
        this.username = React.createRef();
        this.password = React.createRef();
        this.password1 = React.createRef();
        this.state ={
            visible: false,
            message: ''
        };
        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    redirectHandler = (url) => {
        this.props.history.push(url);
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log("sign up successful!!");

        const first = this.firstname.current.value;
        const last = this.lastname.current.value;
        const email = this.email.current.value;
        const coun = this.country.current.value;
        const loc = this.location.current.value;
        const phone = this.phonenumber.current.value;
        const tax = this.taxregristrationnumber.current.value;
        const user = this.username.current.value;
        const psw = this.password.current.value;
        const psw1 = this.password1.current.value;
        console.log(this.firstname);

        $.ajax({

            url: "http://localhost:8765/app/api/signup",
            dataType : 'json',
            type: 'POST',
            data: {
                firstname : first,
                lastname : last,
                email : email,
                country: coun,
                location : loc,
                phone_number : phone,
                tax_registration_number : tax,
                username : user,
                password : psw,
                password1 : psw1
            }
        })
        .then(json => {
            console.log(json)
            this.props.logInHandler(json.result);
            this.props.history.replace("/login");
        })
        .fail(err=>{
            let msg;
            switch(err.status){
                case(461):{
                    msg = 'Passwords don\'t match';
                    break;
                }
                case(462):{
                    msg = 'Username taken';
                    break;                    
                }
                case(463):{
                    msg = 'Email is already in use';
                    break;                    
                }
                case(464):{
                    msg = 'Phone number is already in use';
                    break;                    
                }
                case(465):{
                    msg = 'Tax number is already in use';
                    break;                    
                }
                case(400):{
                    msg = 'Missing or empty parameters';
                    break;                    
                }
                default:{
                    msg = 'Internal server error';
                    break;
                }
            }
            this.setState({visible:true, options:false, message:msg});
            console.log(err)
        })

    }



render(){
    return(
        <Container fluid id={content}>
            <Col>
                <Row className="mb-3"/>
                <Row className="justify-content-center">
                    <Col className="align-self-center" xs="auto">
                        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                           {this.state.message}
                        </Alert>
                        <Card id="signup_form">
                            <CardHeader>
                                REGISTRATION FORM
                            </CardHeader>
                            <CardBody>
                                <p className="small text-muted">Register to use our services</p>
                                <Form onSubmit={this.submitHandler}>
                                        <br/>
                                        <Row>
                                            <Col> First Name </Col>
                                            <Col> <input type="text" name="firstname" maxLength="64" required ref={this.firstname}/> </Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Last Name </Col>
                                            <Col> <input type="text" name="lastname" maxLength="64" required ref={this.lastname}/> </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Email </Col>
                                            <Col><input type="email" name="email" maxLength="128" required ref={this.email}/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Country </Col>
                                            <Col><input type="text" name="country" maxLength="32" required ref={this.country}/> </Col>
                                        </Row>
                                        <br/>
                                        <Row>

                                            <Col>Location</Col>
                                            <Col> <input type="text" name="location" maxLength="64" required ref={this.location}/></Col>
                                        </Row>
                                        <br/>

                                        <Row>

                                        <Col>Phone number</Col>
                                        <Col><input type="text" name="phone_number" maxLength="32" required ref={this.phonenumber}/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Tax registration number</Col>
                                            <Col><input type="text" name="tax_registration_number" maxLength="32" required ref={this.taxregristrationnumber}/></Col>

                                        </Row>
                                        <br/>
                                        <hr/>
                                        <br/>
                                        <Row>
                                            <Col>Username</Col>
                                            <Col><input type="text" name="username" maxLength="128" required ref={this.username}/></Col>


                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Password</Col>
                                            <Col><input type="password" name="password" required ref={this.password}/></Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Confirm password</Col>
                                            <Col><input type="password" name="password1" required ref={this.password1}/></Col>
                                        </Row>

                                        <br/>
                                        <br/>

                                    <Button type="submit">
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