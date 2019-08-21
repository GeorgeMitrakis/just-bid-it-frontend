import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, Form, Button, Container} from 'reactstrap';
//import DatePicker from 'react-datepicker';
//import { getUserInfo } from './Utility';
import './Newauction.css'


class Newauction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categoryList:[{category: ''}]
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log("auction start successful!!");
        console.log(this.state);
    }

    addCategoryHandler = () => {
        this.setState({
            categoryList: this.state.categoryList.concat([{category:''}])
        });
    }

    changeCategoryHandler =  (index , event) => {
        const newCategoryList = this.state.categoryList.map((category, sindex) => {
            if (index !== sindex) return category;
            return { ...category, category: event.target.value };
        });

        this.setState({ categoryList: newCategoryList });
        //console.log(this.state);
    }

    removeCategoryHandler = (index) => {
        this.setState({
            categoryList: this.state.categoryList.filter((s, sindex) => index !== sindex)
        });
    }

    render() {
        return (
            <Container fluid id="content">
                <Col>
                    <Row className="justify-content-center">
                        <h1>JUST BID IT</h1>
                    </Row>
                    <Row className="mb-3"/>
                    <Row className="d-flex justify-content-center">
                        {/* <Example username={this.state.username} onButtonClick={()=>{this.innerButton()}}/> */}
                        <Col className="d-flex align-self-center" xs="auto">
                            <Card id="newauction_form">
                                <CardHeader>
                                    NEW AUCTION FORM
                                </CardHeader>
                                <CardBody>
                                    <p className="small text-muted">Here you can make a new auction</p>
                                    <Form onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col> Name </Col>
                                            <Col> <input type="text" name="bid_name"/> </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col> Categories </Col>
                                            {/* <Col> <input type="text" name="categories"/> </Col> */}
                                            <Col>
                                                {this.state.categoryList.map((category, index)=>(
                                                    <Row key={index} className="ml-2">
                                                        <Col>
                                                            <input 
                                                                type="text" 
                                                                name="category"
                                                                value={category.category}
                                                                onChange={(event)=>this.changeCategoryHandler(index, event)}
                                                            /> 
                                                            <Button
                                                                color="danger"
                                                                type="button"
                                                                className="small pt-0 pb-0 pl-1 pr-1"
                                                                onClick={()=>this.removeCategoryHandler(index)}
                                                            >
                                                            <i className="fas fa-minus"></i>
                                                        </Button> </Col>
                                                    </Row>
                                                ))}
                                                <Row className="d-flex justify-content-center mt-1">
                                                    <Button
                                                        color="success"
                                                        type="button"
                                                        className="small pt-0 pb-0 pl-1 pr-1"
                                                        onClick={this.addCategoryHandler}
                                                    >
                                                        <i className="fas fa-plus"></i>
                                                    </Button>
                                                </Row>
                                            </Col>
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
                                            <Col>Coordinates</Col>
                                            <Col> 
                                                <Row>
                                                    <Col><input type="text" placeholder="latitude" name="latitude"/></Col>
                                                    <Col><input type="text" placeholder="longitude" name="longitude"/></Col>
                                                    
                                                </Row>
                                                <Row className="justify-content-center">
                                                    <Button color="secondary">Open Map</Button>
                                                </Row>
                                            </Col>
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
                                            <Col><input type="datetime-local" name="ends"/></Col>
                                        </Row>
                                        <br/>
                                        {/* <Button className="float-right font-weight-bold" id={classes.submit_btn}>Είσοδος</Button> */}
                                        <br/>
                                        <Button type="submit">
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