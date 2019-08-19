import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, Form, Button, Container} from 'reactstrap';
import './Login.css';
import Example from './Example';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: "xSour",
            flag : false
        }
    }
    
    submitHandler = (event) => {
        event.preventDefault();
        console.log("sign in successful!!");
        //this.props.history.replace("/welcome");
        this.setState({username: "Ghaeus"});

        console.log(this.state.flag);
    }

    innerButton = () =>{
        alert("button pressed!");
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
                            <Card id="login_form">
                                <CardHeader>
                                        Sign in
                                </CardHeader>
                                <CardBody>                                
                                    <p className="small text-muted">Sign in to use our services</p>
                                    <Form>
                                        Username:
                                        <input type="text" name="username"/>
                                        Password:
                                        <input type="text" name="password"/>
                                        {/* <Button className="float-right font-weight-bold" id={classes.submit_btn}>Είσοδος</Button> */}
                                        <Button onClick={this.submitHandler}>
                                            Sign in
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

export default withRouter(Login);