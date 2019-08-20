import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, Form, Button, Container} from 'reactstrap';
import DatePicker from 'react-datepicker';
import { getUserInfo } from './Utility';


class Newauction extends React.Component {

    submitHandler = (event) => {
        event.preventDefault();
        console.log("sign up successful!!");
    }

    render() {
        return (
            <Container fluid id="content">
                <Col>
                    <Row className="justify-content-center">
                        <h1>JUST BID IT</h1>
                    </Row>
                    <Row className="mb-3"/>
                    <Row className="justify-content-center">
                        {/* <Example username={this.state.username} onButtonClick={()=>{this.innerButton()}}/> */}
                        <Col className="align-self-center" xs="auto">
                            <Card id="newauction_form">
                                <CardHeader>
                                    NEW AUCTION FORM
                                </CardHeader>
                                <CardBody>
                                    <p className="small text-muted">Here you can make a new auction</p>
                                    <Form>
                                        <Row>
                                            <Col> Name </Col>
                                            <Col> <input type="text" name="bid_name"/> </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Categories </Col>
                                            <Col> <input type="text" name="categories"/> </Col>
                                        </Row>
                                        <br/>
                                        <Row>

                                            <Col>Description</Col>
                                            <Col><input type="text" name="description"/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Location</Col>
                                            <Col> <input type="text" name="location"/></Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Coordinaries</Col>
                                            <Col> <input type="text" placeholder="street" name="street"/>
                                            <input type="text" placeholder="number" name="num"/></Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Country </Col>
                                            <Col><input type="text" name="country"/> </Col>
                                        </Row>
                                        <br/>

                                        <Row>
                                            <Col>Buy Price</Col>
                                            <Col><input type="text" name="buy_price"/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>First Bid</Col>
                                            <Col><input type="text" name="first_bid"/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Ends</Col>
                                            <Col><input type="date" name="ends"/></Col>
                                        </Row>
                                        <br/>
                                        {/* <Button className="float-right font-weight-bold" id={classes.submit_btn}>Είσοδος</Button> */}
                                        <br/>
                                        <Button onClick={this.submitHandler}>
                                            Start Auction
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
export default withRouter(Newauction);