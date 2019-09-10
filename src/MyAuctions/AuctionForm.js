import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, Form, Button, Container} from 'reactstrap';
import produce from 'immer';
//import DatePicker from 'react-datepicker';
import { formatDate, todayIs, tomorrowIs } from '../Utility/Utility';
//import styles from './AuctionForm.module.css'
import Popup from "reactjs-popup";

import $ from 'jquery';
import { getUserInfoField } from '../Utility/Utility';


class AuctionForm extends React.Component {
    constructor(props){
        super(props);


        //let day = new Date().toISOString();

        let name= '';
        let categoryList = [{category: ''}];
        let location ='';
        let latitude ='';
        let longitude ='';
        let country ='';
        let buyPrice = 15.5;
        let firstBid = 15.5 ;
        let ends = tomorrowIs();
        let description ='';

        if(!(this.props.item === null || this.props.item === undefined)){
            name = this.props.item.name;
            categoryList = [];
            this.props.item.categories.map((category, index)=>{
                categoryList.push({category: category});
            });
            location = this.props.item.location;
            if(this.props.item.latitude!==0 && this.props.item.longitude!==0){
                latitude = this.props.item.latitude;
                longitude = this.props.item.longitude;
            }
            
            country = this.props.item.country;
            buyPrice = this.props.item.buyPrice;
            firstBid = this.props.item.firstBid;
            ends = formatDate(this.props.item.end);
            description = this.props.item.description;
        }
        

        //this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.state = {
            name : name,
            categoryList : categoryList,
            location: location,
            latitude: latitude,
            longitude: longitude,
            country: country,
            buyPrice: buyPrice,
            firstBid: firstBid,
            ends: ends,
            description: description
        }
    }

    componentDidMount(){
        console.log(this.props.item);
        console.log(this.state);
        
    }

    submitHandler = (event) => {
        event.preventDefault();
        // console.log(this.state);
        console.log("[AuctionForm.js] submitHandler start");

        // let categories = [];
        // this.state.categoryList.map((elem, index) =>{
        //     return categories.push(elem.category);
        // })
        // console.log(categories);

        let requestBody = {
            userId: getUserInfoField("id"),
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

        let id = null;
        if(!(this.props.item === null || this.props.item === undefined)){
            id = this.props.item.id;
        }
        this.props.requestHandler(requestBody, id);

        console.log("sent:");
        console.log(requestBody);
        console.log("[AuctionForm.js] submitHandler end");
    }

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
                                {(this.props.item === null || this.props.item === undefined)? 
                                            "Create New Auction":"Edit auction"}
                                </CardHeader>
                                <CardBody>
                                    <p className="small text-muted">Here you can make a new auction</p>
                                    <Form onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col> Name </Col>
                                            <Col> <input type="text" name="bid_name" required value={this.state.name} onChange={(event)=>this.inputChangeHandler('name',event)}/> </Col>
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
                                                                required
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
                                            <Col> <input type="text" name="location" required value={this.state.location} onChange={(event) => this.inputChangeHandler('location', event)}/></Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Coordinates</Col>
                                            <Col> 
                                                <Row>
                                                    <Col><input type="text" required placeholder="latitude" name="latitude" value={this.state.latitude} onChange={(event) => this.inputChangeHandler('latitude', event)}/></Col>
                                                    <Col><input type="text" required placeholder="longitude" name="longitude" value={this.state.longitude} onChange={(event) => this.inputChangeHandler('longitude', event)}/></Col>
                                                    
                                                </Row>
                                                <br/>
                                                <Row className="justify-content-center">

                                                    <Popup trigger={<Button outline color="secondary">Open Map</Button>} position="right center">
                                                        <div>Popup content here !!

                                                        </div>
                                                    </Popup>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Country </Col>
                                            <Col><input type="text" name="country" required value={this.state.country} onChange={(event) => this.inputChangeHandler('country', event)}/> </Col>
                                        </Row>
                                        <br/>

                                        <Row>
                                            <Col>Buy Price</Col>
                                            <Col><input type="text" name="buy_price" required value={this.state.buyPrice} onChange={(event) => this.inputChangeHandler('buyPrice', event)}/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>First Bid</Col>
                                            <Col><input type="text" name="first_bid" required  value={this.state.firstBid} onChange={(event) => this.inputChangeHandler('firstBid', event)}/></Col>

                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Ends</Col>
                                            <Col><input type="datetime-local"  name="ends" required value={this.state.ends} onChange={(event) => this.inputChangeHandler('ends', event)}/></Col>
                                        </Row>
                                        <br/>
                                        <Row>

                                            <Col>Description</Col>
                                            <Col><textarea type="text" name="description" required value={this.state.description} onChange={(event) => this.inputChangeHandler('description', event)}/></Col>

                                        </Row>
                                        <br/>
                                        {/* <Button className="float-right font-weight-bold" id={classes.submit_btn}>Είσοδος</Button> */}
                                        <br/>
                                        <Button type="submit">
                                            {(this.props.item === null || this.props.item === undefined)? 
                                            "Start Auction":"Submit Changes"}
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
export default withRouter(AuctionForm);