import React from 'react';
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import { withRouter,Route, BrowserRouter as Router, Switch  } from 'react-router-dom';
// import styles from "../MyAuctions/OwnerAuctionItem.module.css";
import styles from '../MyAuctions/OwnerAuctionItem.module.css';
import $ from "jquery";
import {sent} from "./MessageForm.module.css"
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
            <Container fluid id={sent} >
                <Row className="d-flex justify-content-center">
                    <button
                        type="button" color="muted" className="btn btn-outline-secondary"
                        onClick={()=>this.props.history.push("/messages")}
                    >
                        Create a new message
                    </button>
                </Row>

                <Row className="d-flex justify-content-center">
                {this.state.messages.map((messages,index) =>{
                    return(
               <Card key={index} style ={{width : '600px', marginTop:'30px' , marginBottom:'30px'}} className="d-flex justify-content-center">
                <Col>
                    <br/>
                    <Row className="d-flex justify-content-around">
                        <Col className="d-flex justify-content-start" >
                            <h4>To: {messages.receiver}</h4>

                        </Col>
                        <Col className="d-flex justify-content-end">
                            <button type="button" color="muted" className="btn btn-outline-secondary" > Delete</button>
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
                            <h5> "{messages.text}."</h5>
                        </Col>
                    </Row>
                    <br/>
                </Col>
                   <br/>
               </Card>

                    )
                }
                )}

                </Row>
            </Container>


        );
    }
}


export default withRouter(MessagesSent);