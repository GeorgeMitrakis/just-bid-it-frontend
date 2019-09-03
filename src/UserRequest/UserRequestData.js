import React from "react";
import { withRouter } from 'react-router-dom';
import { getUserInfoField } from '../Utility/Utility';
import './UserRequestData.css';
import {Card, CardBody, CardHeader, Col, Container,  Row, Button} from "reactstrap";
import $ from "jquery";
import {createSuper} from "typescript/lib/tsserverlibrary";


class UserRequestData extends React.Component{
    constructor(props){
        super(props);
    }

    submitHandler1(event){
        event.preventDefault();
        console.log("sign up successful!!");

        $.ajax({
            url: "http://localhost:8765/app/api/admin/users/whatever/accept",
            dataType: 'json',
            type: 'PUT'

        })
            .then(json => {
                console.log(" Ajax success!");
                // console.log(json);
                // this.setState({users:json.users})
                console.log(" Ajax end");
            })
            .fail(err=>{
                console.log(err)
            })
    }
    submitHandler(event){
        event.preventDefault();
        console.log("sign up successful!!");

        $.ajax({
            url: "http://localhost:8765/app/api/admin/users/whatever/decline",
            dataType: 'json',
            type: 'PUT'

        })
            .then(json => {
                console.log(" Ajax success!");
                // console.log(json);
                // this.setState({users:json.users})
                console.log(" Ajax end");
            })
            .fail(err=>{
                console.log(err)
            })
    }
    render() {
        return(
            <div className="mt-2">
                <h3> Thank you for your sign up request, {' '+getUserInfoField("username")+' '}!</h3>
                <p> An administrator will review your request and grant you access to the site. </p>
                    {/* <h1 id='title'></h1> */}
                <Col>
                    <Row className="mb-3"/>
                    <Row className="justify-content-center">
                <Card>
                    <CardBody>
                        <h4>This user is not yet active.</h4>
                        <p>Accept his/her registration request? </p>
                        <div className="d-flex justify-content-around">
                        <Button type="submit" onClick = {(event)=>this.submitHandler(event)}>Decline</Button>
                        <Button type="submit" onClick = {(event)=>this.submitHandler1(event)}>Accept</Button>
                        </div>
                    </CardBody>
                </Card>
                    </Row>
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
                                            <Col> Userame: </Col>
                                            <Col> {getUserInfoField("username")}</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> First Name: </Col>
                                            <Col> {getUserInfoField("firstname")}</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Last Name: </Col>
                                            <Col> {getUserInfoField("lastname")}</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Email: </Col>
                                            <Col> {getUserInfoField("email")}</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Country: </Col>
                                            <Col> {getUserInfoField("country")}</Col>
                                        </Row>
                                        <br/>
                                          <Row>
                                            <Col>Location:</Col>
                                            <Col> {getUserInfoField("location")}</Col>
                                         </Row>
                                         <br/>
                                        <Row>
                                            <Col>Phone number:</Col>
                                            <Col> {getUserInfoField("phoneNumber")}</Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Tax registration number:</Col>
                                            <Col> {getUserInfoField("taxRegistrationNumber")}</Col>
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