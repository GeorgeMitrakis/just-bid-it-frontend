import React from 'react';
import { withRouter , Redirect} from 'react-router-dom';
import {Row, Col, Card, CardBody, CardHeader, Form, Button, Container, Alert} from 'reactstrap';
//import styles from './Login.module.css';
//import { getUserInfoField } from './Utility';
import { getUserInfo } from '../Utility/Utility';
import UserRequestData from '../UserRequest/UserRequestData';

import $ from 'jquery';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.state ={
            visible: false
        };
        this.onDismiss = this.onDismiss.bind(this);
    }


    onDismiss() {
        this.setState({ visible: false });
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
            let data = json.result.value;
            let messagesReceived = json.messagesReceived;
            data = {...data, messagesReceived};
            console.log(data);
            this.props.logInHandler(data);
        })
        .fail(err=>{
            if(err.status){
                console.log(err.status);
            }
            this.setState({visible:true, options:false});
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
        let user = getUserInfo();
        if(this.props.role !== "guest" && this.props.access !=="granted"){
            return(
                <div>
                    <UserRequestData user={user}/>
                </div>
            );
        }
        else if(this.props.role !== "guest" && this.props.role !== "administrator" && this.props.access ==="granted"){
            return(
                <Redirect to="/home"/>
            );
        }
        else if(this.props.role === "administrator"){
            return(
                <Redirect to="/admin/users"/>
            );
        }

        else{
            return(
                <Container fluid id="content">
                    <Col>
                        <Row className="d-flex justify-content-center">
                            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                                Incorrect username or password!
                            </Alert>
                        </Row>
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
                                                <Col><input maxLength="128" required type="text" name="username" ref={this.username}/></Col>   
                                            </Row>
                                            <br/>
                                            <Row>
                                            <Col>Password:</Col>
                                            <Col><input required type="password" name="password" ref={this.password}/></Col>
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