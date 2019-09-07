import React from "react";
import { withRouter } from 'react-router-dom';
import { getUserInfoField } from '../Utility/Utility';
//import styles from './UserRequestData.module.css';
import {Card, CardBody, CardHeader, Col, Container,  Row, Button} from "reactstrap";
import $ from "jquery";
import { Alert } from 'reactstrap';
//import { useAlert } from "react-alert";


class UserRequestData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            options: (this.props.user.access === "pending")
        };
        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    componentDidMount(){
        console.log(this.props);

    }

    allowHandler(event){
        event.preventDefault();
        console.log("sign up successful!!");

        $.ajax({
            url: "http://localhost:8765/app/api/admin/users/"+this.props.user.username+"/accept",
            dataType: 'json',
            type: 'PUT'

        })
            .then(json => {
                console.log(" Ajax success!");
                console.log(json);
                // this.setState({users:json.users})
                this.setState({visible:true, options:false});
                console.log(" Ajax end");
            })
            .fail(err=>{
                console.log(err)
            })
    }

    banHandler(event){
        event.preventDefault();
        console.log("successful!!");

        $.ajax({
            url: "http://localhost:8765/app/api/admin/users/"+this.props.user.username+"/decline",
            dataType: 'json',
            type: 'PUT'

        })
            .then(json => {
                console.log(" Ajax success!");
                console.log(json);
                // this.setState({users:json.users})
                this.setState({visible:true, options:false});
                console.log(" Ajax end");
            })
            .fail(err=>{
                console.log(err)
            })


    }

    userMessage = (role, access) =>{
        if(role ==="common user" && access === "pending"){
            return(
                <>
                <h3> Thank you for your sign up request, {' '+this.props.user.username+' '}!</h3>
                <p> An administrator will review your request and grant you access to the site. </p>
                </>
            )
        }
        else if(role ==="common user" && access === "denied"){
            return(
                <>
                <h3> Dear, {' '+this.props.user.username+' '}!</h3>
                <p> Your registration request to the site has been declined. </p>
                </>
            )
        }
    }
    adminAlert = () =>{
        if(getUserInfoField("role") === "administrator"){
        return(
            <Col className="d-flex justify-content-center">
                <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                    Action successful!
                </Alert>
            </Col>
        )}

    }

    optionsCard = () =>{
        if(this.state.options){
            return(
                <Card>
                    <CardBody>
                        <h4>This user is not yet active.</h4>
                        <p>Accept his/her registration request? </p>
                        <div className="d-flex justify-content-around">
                            <Button type="submit" onClick = {(event)=>this.banHandler(event)} >Decline</Button>
                            <Button type="submit" onClick = {(event)=>this.allowHandler(event)} >Accept</Button>
                        </div>
                    </CardBody>
                </Card>);
        }
    }

    render() {
        return(
            <div className="mt-2">
                {this.userMessage(getUserInfoField("role"), this.props.user.access)}    {/* <h1 id='title'></h1> */}
                <Col>
                    <Row className="mb-3"/>
                    {getUserInfoField("role") === "administrator" ?
                    (
                    <>
                    <Row className="d-flex justify-content-center">
                        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                            Action successful!
                        </Alert>
                    </Row>
                    <Row className="d-flex justify-content-center">                    
                        {this.optionsCard()}
                    </Row>
                    </>):null}
                    {/*<br/>*/}
                    {/*<Col className="d-flex justify-content-center">*/}
                    {/*<Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>*/}
                    {/*    Action successful!*/}
                    {/*</Alert>*/}
                    {/*</Col>*/}
                </Col>
                <Container fluid id="content">
                    <Col>
                        <Row className="mb-3"/>
                        <Row className="justify-content-center">
                            {/* <Example username={this.state.username} onButtonClick={()=>{this.innerButton()}}/> */}
                            <Col className="align-self-center" xs="auto">
                                <Card id="usertable">
                                    <CardHeader>
                                     User information card
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col> Username: </Col>
                                            <Col> {this.props.user.username}</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> First Name: </Col>
                                            <Col> {this.props.user.firstname}</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Last Name: </Col>
                                            <Col> {this.props.user.lastname}</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Email: </Col>
                                            <Col> {this.props.user.email}</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Country: </Col>
                                            <Col> {this.props.user.country}</Col>
                                        </Row>
                                        <br/>
                                          <Row>
                                            <Col>Location:</Col>
                                            <Col> {this.props.user.location}</Col>
                                         </Row>
                                         <br/>
                                        <Row>
                                            <Col>Phone number:</Col>
                                            <Col> {this.props.user.phoneNumber}</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Tax registration number:</Col>
                                            <Col> {this.props.user.taxRegistrationNumber}</Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <Row className="justify-content-center">
                            <Button color="link" onClick={()=>this.props.history.goBack()}>
                                Go Back
                            </Button>
                        </Row>
                    </Col>
                </Container>


            </div>
        )
    }


}
export default withRouter(UserRequestData);