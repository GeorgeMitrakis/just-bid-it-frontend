import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Card, Col, Container, Row, CardBody, Form} from "reactstrap";
// import {content} from "../Signup/Signup.module.css";
import $ from "jquery";
import produce from 'immer';
import styles, {content} from "./MessageForm.module.css";
import {getUserInfoField} from "../Utility/Utility";


class MessageForm extends React.Component{
    constructor(props){
        super(props);
        let text ='';

        // this.text = React.createRef();
        this.state = {
            text: text,
            username:''
        }

    }

    clearText(){
        this.setState({text:''})
    }

    inputChangeHandler(field, event){
        // console.log(field);
        //event.persist();
        console.log(event);
        let v = event.target.value;
        this.setState(
            produce(draft=>{
                draft[field] = v;
            }),
            ()=>console.log(this.state.text)
        )
    }
    componentDidMount() {
        console.log(this.props.messages);
        console.log(this.state);
        let urlparts = window.location.href.split("/");
        let username = urlparts[5];
        console.log(username);
        console.log(urlparts);
        this.setState({username:username})
    }

    sendHandler  = (event) =>{

        console.log("success");
        $.ajax({
            url: "http://localhost:8765/app/api/messages/"+this.state.username+"/send",
            dataType: 'json',
            type: 'POST',
            data: {
                userId: getUserInfoField("id"),
                text: this.state.text
            }

        })
            .then(json => {
                console.log(json)
                this.props.history.push("/messages/sent")
            })
            .fail(err=>{
                console.log(err)
            })

    }
    render() {
        return(
            <div>
                <Row className="mb-3"/>


                <Container fluid id={content}>
                    <Row className="mb-3"/>
                    <Row className="justify-content-center">
                        <Col className="align-self-center" xs="auto">
                            <Row className="d-flex justify-content-between">
                                <Button type="button" color="muted" className={"btn btn-outline-secondary "+styles.receivedbutton} onClick={()=>this.props.history.push("/messages/received")}
                                >
                                    Messages Received
                                </Button>

                                <Button type="button" color="muted" className={"btn btn-outline-secondary "+styles.sentbutton} onClick={()=>this.props.history.push("/messages/sent")}
                                >
                                    Messages Sent
                                </Button>
                            </Row>
                            <br/>
                            <br/>
                            <Card id="signup_form">
                                <h2>
                                    New Message
                                </h2>
                                <CardBody>
                                    <Form style ={{width : '600px'}}>
                                        <br/>
                                        <Row>
                                            <Col className="d-flex justify-content-center">
                                                <h4> To: {'  '} </h4> {' '}
                                                <input
                                                type="text"
                                                placeholder="username"
                                                className="form-control form-control-sm"
                                                value = {this.state.username}
                                                maxLength="2048"
                                                readOnly
                                            />

                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col className="d-flex justify-content-center "  style={{width:'500px' , height:'200px'}}>
                                                {/*<input type="textarea" name="description" required  className="form-control " rows = "3"/>*/}
                                                <textarea
                                                    type = "text"
                                                    className="form-control"
                                                    placeholder ="Write your message here"
                                                    id="exampleFormControlTextarea3"
                                                    value={this.state.text}
                                                    onChange={(event) => this.inputChangeHandler('text', event)}
                                                />
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row className="d-flex justify-content-around">
                                            <Button type="button" color="muted" className="btn btn-outline-secondary" onClick={()=>this.clearText()}
                                            >
                                                Clear text
                                            </Button>

                                            <Button type="button" color="muted" className="btn btn-outline-secondary" onClick={this.sendHandler}
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
        </div>


        )
    }

}
export default withRouter(MessageForm);