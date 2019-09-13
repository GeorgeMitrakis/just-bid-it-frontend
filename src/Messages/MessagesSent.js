import React from 'react';
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import { withRouter,Route, BrowserRouter as Router, Switch  } from 'react-router-dom';
// import styles from "../MyAuctions/OwnerAuctionItem.module.css";
import {content} from "../Signup/Signup.module.css";
import styles from '../MyAuctions/OwnerAuctionItem.module.css';
import $ from "jquery";

class MessagesSent extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            messages:[]
        }
    }
    componentDidMount(){
        this.showsent();
    }
    showsent(){

        $.ajax({
            url: "http://localhost:8765/app/api/messages/sent",
            dataType : 'json',
            type: 'GET',
            data: {userId:9}

        })
            .then(json => {
                console.log("success");
                console.log(json)
                // console.log(json.results);
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
            <Container fluid id={content}>
                <Row className="d-flex justify-content-center">
                    <button
                        onClick={()=>this.props.history.push("/messages")}
                    >
                        Create a new message
                    </button>
                </Row>
                {this.state.messages.map((messages,index) =>{
                    return(
               <Card className={styles.bidcard}>
                <Col>
                    <br/>
                    <Row className="d-flex justify-content-around">
                        <Col className="d-flex justify-content-start" >
                            <h4>To:{messages.receiver}</h4>

                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-around">
                        <Col className="d-flex justify-content-start" >
                            <p>Sent: Dec-10-01 22:56 {messages.date}</p>

                        </Col>
                    </Row>
                    <hr/>
                    <br/>
                    <Row className="d-flex justify-content-between">
                        <Col className="d-flex justify-content-start" >
                            <h4> {messages.text}</h4>
                        </Col>
                    </Row>
                </Col>
            </Card>
                    )
                }
                )}
            </Container>


        );
    }
}


export default withRouter(MessagesSent);