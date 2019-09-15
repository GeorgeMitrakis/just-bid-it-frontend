import React from 'react';
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import { withRouter,Route, BrowserRouter as Router, Switch  } from 'react-router-dom';
// import styles from "../MyAuctions/OwnerAuctionItem.module.css";
import {received} from "../Signup/Signup.module.css";
import styles from '../MyAuctions/OwnerAuctionItem.module.css';
import $ from "jquery";

class MessagesReceived extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            messages:[]
        }
    }
    componentDidMount(){
        this.showreceived();
    }
    showreceived(){

        $.ajax({
            url: "http://localhost:8765/app/api/messages/received",
            dataType : 'json',
            type: 'GET',
            data: {userId:9}

        })
            .then(json => {
                console.log(json)
                console.log(json.results);
                this.setState({messages:json.messages})
                this.props.messages(json.messages);
            })
            .fail(err=>{
                console.log(err);
            })
    }

    render()
    {
        return(
            <>
                <Container fluid id={received} className="d-flex justify-content-center" >
                    {this.state.messages.map((messages,index) =>{
                        return(
                            <Card style ={{width : '600px'}} >
                        <Col>
                            <br/>
                            <Row className="d-flex justify-content-around">
                                <Col className="d-flex justify-content-start" >
                                    <h4>From: {messages.sender} </h4>

                                </Col>
                                <Col>
                                    <button type="button" color="muted" className="btn btn-outline-secondary"> Delete</button>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-around">
                                <Col className="d-flex justify-content-start" >
                                    <p>Sent: Dec-10-01 22:56{messages.date}</p>

                                </Col>
                            </Row>
                            <hr/>
                            <br/>
                            <Row className="d-flex justify-content-between">
                                <Col className="d-flex justify-content-start" >
                                    <h4>{messages.text}</h4>
                                </Col>
                            </Row>
                        </Col>
                    </Card>
                        )
                        }
                    )}
                </Container>
            </>
        );
    }
}


export default withRouter(MessagesReceived);