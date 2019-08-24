import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, Form, Button, Container} from 'reactstrap';
import './Login.css';
//import { getUserInfoField } from './Utility';
import { getUserInfo } from './Utility';
import UserData from './UserData';

import $ from 'jquery';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
    }    
    
    submitHandler = (event) => {
        event.preventDefault();
        //this.props.history.replace("/welcome");

        const u = this.username.current.value;
        const p = this.password.current.value;

        $.ajax({
            url: "http://localhost:8765/app/api/login",
            dataType: 'json',
            type: 'POST',
            data: {
                username: u,
                password: p
            }
        })
        .then(json => {
            console.log(json)
            this.props.logInHandler(json.result.value);
        })
        .fail(err=>{
            console.log(err)
        })
    }

    componentDidMount(){
        console.log(getUserInfo());
        console.log(this.props.role);
    }

    // innerButton = () =>{
    //     alert("button pressed!");
    // }

    render(){
        if(this.props.role !== "guest"){
            return(
                <div>
                    User is a {' '+this.props.role+' '} and has {' '+this.props.access+' '} access request
                    <UserData/>
                </div>
            );
        }
        else{
            return(
                <Container fluid id="content">
                    <Col>
                        <Row className="mb-3"/>
                        <Row className="justify-content-center">
                            {/* <Example username={this.state.username} onButtonClick={()=>{this.innerButton()}}/> */}
                            <Col className="align-self-center p-0" xs="auto">
                                <Card id="login_form">
                                    <CardHeader>
                                            Sign in
                                    </CardHeader>
                                    <CardBody>                                
                                        <p className="small text-muted">Sign in to use our services</p>
                                        <Form onSubmit={this.submitHandler}>
                                            <br/>
                                            <Row>
                                                <Col>Username:</Col>  
                                                <Col><input type="text" name="username" ref={this.username}/></Col>   
                                            </Row>
                                            <br/>
                                            <Row>
                                            <Col>Password:</Col>
                                            <Col><input type="password" name="password" ref={this.password}/></Col>
                        </Row>
                        <br/>
                                            <br/>                                       
                                            <Row className="justify-content-center">
                                                <Button type="submit">
                                                    Sign in
                                                </Button>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            );
        }
        
    }
}

export default withRouter(Login);