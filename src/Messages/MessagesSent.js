import React from 'react';
import { Card, Col, Container, Row} from "reactstrap";
import { withRouter  } from 'react-router-dom';
// import styles from "../MyAuctions/OwnerAuctionItem.module.css";
//import styles from '../MyAuctions/OwnerAuctionItem.module.css';
import $ from "jquery";
import {sent} from "./MessageForm.module.css"
import {getUserInfoField} from "../Utility/Utility";
import produce from 'immer';


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
            data: {userId:getUserInfoField("id")}

        })
            .then(json => {
                console.log("success");
                console.log(json)
                // console.log(json.results);
                this.setState({messages:json.messages})
                // this.props.messages(json.messages);
            })
            .fail(err=>{
                console.log(err);
            })
    }

    deleteHandler = (id) =>{
        if(!window.confirm(`Are you sure you want to delete this message?`)) return;
        console.log(id);
        $.ajax({
            url: "http://localhost:8765/app/api/messages/"+id+"/delete" ,
            dataType : 'json',
            type: 'DELETE'
        })
            .then(json => {
                console.log(json)
                this.setState(
                    produce(draft=>{
                        draft.messages = this.state.messages.filter((elem, index)=>
                            {if(elem.id !== id) return elem}
                        )
                    })
                )

            })
            .fail(err=>{
                console.log(err);
            })
    }
    render()
        {
        return(
            <Container fluid id={sent} className="d-flex justify-content-center">
                {/*<Row className="d-flex justify-content-center">*/}
                {/*    <button*/}
                {/*        type="button" color="muted" className="btn btn-outline-secondary"*/}
                {/*        onClick={()=>this.props.history.push("/messages/new")}*/}
                {/*    >*/}
                {/*        Create a new message*/}
                {/*    </button>*/}
                {/*</Row>*/}

                <Row className="d-flex justify-content-center">
                    {this.state.messages.length === 0 && <p>No messages.</p>}
                {this.state.messages.map((message,index) =>{
                    return(
               <Card key={index} style ={{width : '600px', marginTop:'30px' , marginBottom:'30px'}}>
                <Col>
                    <br/>
                    <Row className="d-flex justify-content-around">
                        <Col className="d-flex justify-content-start" >
                            <h4>To: {message.receiver}</h4>

                        </Col>
                        <Col className="d-flex justify-content-end">
                            <button type="button" color="muted" className="btn btn-outline-secondary" onClick={()=> this.deleteHandler(message.id)}> Delete</button>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-around">
                        <Col className="d-flex justify-content-start" >
                            <p>Sent: Dec-10-01 22:56 {message.date}</p>

                        </Col>
                    </Row>
                    <hr/>
                    <br/>
                    <Row className="d-flex justify-content-between">
                        <Col className="d-flex justify-content-start" >
                            <h5> "{message.text}."</h5>
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