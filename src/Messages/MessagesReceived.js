import React from 'react';
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import { withRouter,Route, BrowserRouter as Router, Switch  } from 'react-router-dom';
// import styles from "../MyAuctions/OwnerAuctionItem.module.css";
import {content} from "../Signup/Signup.module.css";
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
                <Container fluid id={content}>
                    {this.state.messages.map((messages,index) =>{
                        return(
                            <Card className={styles.bidcard}>
                        <Col>
                            <br/>
                            <Row className="d-flex justify-content-around">
                                <Col className="d-flex justify-content-start" >
                                    <h4>From:</h4>
                                    {messages.sender}
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-around">
                                <Col className="d-flex justify-content-start" >
                                    <h4>Sent:</h4>
                                    {messages.date}
                                </Col>
                            </Row>
                            <hr/>
                            <br/>
                            <Row className="d-flex justify-content-between">
                                <Col className="d-flex justify-content-start" >
                                    {messages.text}
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