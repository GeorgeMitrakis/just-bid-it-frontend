import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, Form, Button, Container} from 'reactstrap';
import produce from 'immer';
//import DatePicker from 'react-datepicker';
//import { getUserInfo } from './Utility';
import './Newauction.css'

import $ from 'jquery';


class Newauction extends React.Component {
    constructor(props){
        super(props);
        
        //this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.state = {
            name:'',
            categoryList:[{category: ''}],
            location: '',
            latitude: '',
            longitude: '',
            country:'',
            buyPrice: 15.50,
            firstBid: 15.50,
            ends:'',
            description:''
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        // console.log(this.state);
        console.log("WARNING [Newauction.js]");
        console.log("-----------------------");
        console.log("sending request with dummy userId");
        console.log("-----------------------");

        // let categories = [];
        // this.state.categoryList.map((elem, index) =>{
        //     return categories.push(elem.category);
        // })
        // console.log(categories);

        let requestBody = {
            userId: 9,
            name: this.state.name,
            categories: this.state.categoryList,
            location: this.state.location,
            country: this.state.country,
            buy_price: this.state.buyPrice,
            first_bid: this.state.firstBid,
            end: this.state.ends,
            description: this.state.description
        }

        if(this.state.latitude !== '' && this.state.longitude !==''){
            requestBody.concat({
                latitude:  this.state.latitude,
                longitude: this.state.longitude
            })
        }

        $.ajax({
            url: "http://localhost:8765/app/api/items",
            dataType : 'json',
            type: 'POST',
            data: requestBody
        })
        .then(msg => {
            console.log(msg)            
        })
        .fail(err=>{
            console.log(err);
        })
    }

    inputChangeHandler(field, event){
        // console.log(field);
        //event.persist();
        console.log(event);
        let v = event.target.value;
        this.setState(
            produce(draft=>{
                draft[field] = v;
            })
        )
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
                                            <Col> <input type="text" name="bid_name" value={this.state.name} onChange={(event)=>this.inputChangeHandler('name',event)}/> </Col>
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
                                                                color="muted"
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
                                                        color="muted"
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
                                            <Col>Location</Col>
                                            <Col> <input type="text" name="location" value={this.state.location} onChange={(event) => this.inputChangeHandler('location', event)}/></Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Coordinates</Col>
                                            <Col> 
                                                <Row>
                                                    <Col><input type="text" placeholder="latitude" name="latitude" value={this.state.latitude} onChange={(event) => this.inputChangeHandler('latitude', event)}/></Col>
                                                    <Col><input type="text" placeholder="longitude" name="longitude" value={this.state.longitude} onChange={(event) => this.inputChangeHandler('longitude', event)}/></Col>
                                                    
                                                </Row>
                                                <Row className="justify-content-center">
                                                    <Button color="muted">Open Map</Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Country </Col>
                                            <Col><input type="text" name="country" value={this.state.country} onChange={(event) => this.inputChangeHandler('country', event)}/> </Col>
                                        </Row>
                                        <br/>

                                        <Row>
                                            <Col>Buy Price</Col>
                                            <Col><input type="text" name="buy_price" value={this.state.buyPrice} onChange={(event) => this.inputChangeHandler('buyPrice', event)}/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>First Bid</Col>
                                            <Col><input type="text" name="first_bid" value={this.state.firstBid} onChange={(event) => this.inputChangeHandler('firstBid', event)}/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Ends</Col>
                                            <Col><input type="datetime-local" name="ends" value={this.state.ends} onChange={(event) => this.inputChangeHandler('ends', event)}/></Col>
                                        </Row>
                                        <br/>
                                        <Row>

                                            <Col>Description</Col>
                                            <Col><textarea type="text" name="description" value={this.state.description} onChange={(event) => this.inputChangeHandler('description', event)}/></Col>

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