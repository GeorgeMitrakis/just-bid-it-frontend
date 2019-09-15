import React from 'react';
import {withRouter} from 'react-router-dom';
import CardTitle from "reactstrap/es/CardTitle";
import {Button, Card, CardHeader, Col, Container, Row, Table} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Form from "reactstrap/es/Form";
// import {content} from "../Signup/Signup.module.css";
import MessagesPopUp from "./MessagesPopUp";
import $ from "jquery";
import produce from 'immer';
import {content} from "./MessageForm.module.css";
import AutoCompletePopup from "../Search/AutoCompletePopup";
import {getUserInfoField} from "../Utility/Utility";

class MessageForm extends React.Component{
    constructor(props){
        super(props);
        let text ='';

        // this.text = React.createRef();
        this.state = {
            text: text
            // usernamesvalue : '',
            // isUsernamesPopupOpen : false

        }

    }

    // inputChangedHandler(event, field){
    //     event.persist();
    //     event.preventDefault();
    //     //console.log(event.target.value);
    //     let v = event.target.value;
    //     this.setState(
    //         produce(draft=>{
    //             draft[field]= v;
    //         })
    //     )
    //
    //     if(field === "usernamesvalue"){
    //         this.usernamesGet(v);
    //     }
    //
    // }
    // usernamesGet(value){
    //     if(value===''){
    //         this.setState({messages:[]});
    //         this.hideMessagesPopup();
    //         return;
    //     }
    //
    //     $.ajax({
    //         url: "http://localhost:8765/app/api/usernames",
    //         dataType: 'json',
    //         type: 'GET',
    //         data: {
    //             usernames: value
    //         }
    //
    //     })
    //         .then(json => {
    //             console.log("Ajax success!");
    //             console.log(json)
    //             this.setState({categories:json.categories})
    //             this.showCategoryPopup();
    //             console.log("Ajax end");
    //         })
    //         .fail(err=>{
    //             console.log(err)
    //         })
    // }

    // messageSelectHandler(value){
    //     //console.log("categorySelectHandler start");
    //     //console.log(this.state);
    //     this.setState({usernamesvalue:value});
    //     this.hideCategoryPopup();
    //     //console.log(this.state);
    //     //console.log("categorySelectHandler end");
    // }
    // showMessagesPopup() {
    //     this.setState({ isMessagesPopupOpen: true });
    // }
    //
    // hideMessagesPopup() {
    //     this.setState({ isMessagesPopupOpen: false });
    // }
    // submitHandler = (event) => {
    //     event.persist();
    //     event.preventDefault();
    //     //console.log(event);
    //     // console.log("[SearchBar.js] Submit Handler start");
    //     // console.log("searchterm: "+this.state.searchterm);
    //     // console.log("categoryvalue: "+this.state.categoryvalue);
    //     // console.log("locationvalue: "+this.state.locationvalue);
    //     // console.log("pricevalue: "+this.state.pricevalue);
    //
    //     let data={};
    //
    //     if(this.state.usernamesvalue!==''){
    //         data = { ...data, usernames: this.state.usernamesvalue}
    //     }
    //
    //
    //     console.log(data);
    //     console.log("[SearchBar.js] Submit Handler end");
    //     this.props.searchHandler(data);
    // }


    inputChangeHandler(field, event){
        // console.log(field);
        //event.persist();
        console.log(event);
        let v = event.target.value;
        this.setState(
            produce(draft=>{
                draft[field] = v;
            }),
            ()=>console.log(this.state.ends)
        )
    }
    componentDidMount() {
        console.log(this.props.messages);
        console.log(this.state);
    }

    sendHandler  = (event) =>{

        console.log("success");
        $.ajax({
            url: "http://localhost:8765/app/api/messages/"+this.props.messages.username+"/send",
            dataType: 'json',
            type: 'POST',
            data: {
                userId: getUserInfoField("id"),
                text: this.state.text
            }

        })
            .then(json => {
                console.log(json)
            })
            .fail(err=>{
                console.log(err)
            })

    }
    render() {
        return(
            <div>
                <Row className="d-flex justify-content-around">
                    <Button type="button" color="muted" className="btn btn-outline-secondary" onClick={()=>this.props.history.push("/messages/received")}
                    >
                        Messages Received
                    </Button>

                    <Button type="button" color="muted" className="btn btn-outline-secondary" onClick={()=>this.props.history.push("/messages/sent")}
                    >
                        Messages Sent
                    </Button>
                </Row>

                <Container fluid id={content}>
                    <Row className="mb-3"/>
                    <Row className="justify-content-center">
                        <Col className="align-self-center" xs="auto">
                            <Card id="signup_form">
                                <h2>
                                    New Message
                                </h2>
                                <CardBody>
                                    <Form style ={{width : '600px'}}>
                                        <br/>
                                        <Row>
                                            <Col className="d-flex justify-content-center">
                                                <h4> To: {'  '} </h4> {' '}<input
                                                type="text"
                                                placeholder="username"
                                                className="form-control form-control-sm"
                                                style={{ marginBottom:" 7px"}}
                                                // value={this.state.usernamesvalue}
                                                // onChange={(event)=> this.inputChangedHandler(event, "usernamesvalue")}
                                                // onClick={() => {if(this.state.usernamesvalue!==''){ this.showMessagesPopup()}}}
                                            />
                                                {/*<MessagesPopUp*/}
                                                {/*    isOpen={this.state.isMessagesPopupOpen}*/}
                                                {/*    items = {this.state.usernames}*/}
                                                {/*    select={(value) => this.messageSelectHandler(value)}*/}
                                                {/*/>*/}
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col className="d-flex justify-content-center"  style={{width:'500px' , height:'200px'}}>
                                                {/*<input type="textarea" name="description" required  className="form-control " rows = "3"/>*/}
                                                <textarea  type = "text"
                                                    className="form-control"
                                                    placeholder ="Write your message here"
                                                    value={this.state.text}
                                                    onChange={(event) => this.inputChangeHandler('text', event)}
                                                >

                                                </textarea>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row className="d-flex justify-content-around">
                                            <Button type="button" color="muted" className="btn btn-outline-secondary"
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