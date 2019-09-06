import React from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Card, CardBody, CardHeader, Col, Container, Form, Row} from "reactstrap";
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
            console.log(err)
        })

    }



render(){
    return(
        <Container fluid id={content}>
            <Col>
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
                                <Form onSubmit={this.submitHandler}>
                                        <br/>
                                        <Row>
                                            <Col> First Name </Col>
                                            <Col> <input type="text" name="firstname" ref={this.firstname}/> </Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Last Name </Col>
                                            <Col> <input type="text" name="lastname" ref={this.lastname}/> </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Email </Col>
                                            <Col><input type="email" name="email" ref={this.email}/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Country </Col>
                                            <Col><input type="text" name="country" ref={this.country}/> </Col>
                                        </Row>
                                        <br/>
                                        <Row>

                                            <Col>Location</Col>
                                            <Col> <input type="text" name="location" ref={this.location}/></Col>
                                        </Row>
                                        <br/>

                                        <Row>

                                        <Col>Phone number</Col>
                                        <Col><input type="text" name="phone_number" ref={this.phonenumber}/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Tax registration number</Col>
                                            <Col><input type="text" name="tax_registration_number" ref={this.taxregristrationnumber}/></Col>

                                        </Row>
                                        <br/>
                                        <hr/>
                                        <br/>
                                        <Row>
                                            <Col>Username</Col>
                                            <Col><input type="text" name="username" ref={this.username}/></Col>


                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Password</Col>
                                            <Col><input type="password" name="password" ref={this.password}/></Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Confirm password</Col>
                                            <Col><input type="password" name="password1" ref={this.password1}/></Col>
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