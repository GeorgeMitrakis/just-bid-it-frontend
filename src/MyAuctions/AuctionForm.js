import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, Form, Button, Container} from 'reactstrap';
import produce from 'immer';
//import DatePicker from 'react-datepicker';
import { formatDate, todayIs, tomorrowIs } from '../Utility/Utility';
import styles from './AuctionForm.module.css';
//import Popup from "reactjs-popup";
import Map from '../Map/Map';
import Marker from '../Map/Marker';
import $ from 'jquery';
import { getUserInfoField } from '../Utility/Utility';


class AuctionForm extends React.Component {
    constructor(props){
        super(props);


        //let day = new Date().toISOString();

        let name= '';
        let categoryList = [{category: ''}];
        let location ={
            name:'',
            latitude:'',
            longitude:''
        };
        let country ='';
        let buyPrice = 100;
        let firstBid = 15.5 ;
        let ends = tomorrowIs();
        let description ='';
        let hasCoords = false;

        if(!(this.props.item === null || this.props.item === undefined)){
            name = this.props.item.name;
            categoryList = [];
            this.props.item.categories.map((category, index)=>{
                categoryList.push({category: category});
            });
            location.name = this.props.item.location.name;
            if(this.props.item.location.latitude!==0 && this.props.item.location.longitude!==0){
                location.latitude = this.props.item.location.latitude;
                location.longitude = this.props.item.location.longitude;
                hasCoords = true;
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
            country: country,
            buyPrice: buyPrice,
            firstBid: firstBid,
            ends: ends,
            description: description,
            toggleMap: false,
            hasCoords: hasCoords,
            zoom:13
        }
    }

    componentDidMount(){
        console.log(this.props.item);
        console.log(this.state);
        // let d = new Date();
        // console.log(d);
        // console.log("d.getTime() = "+d.getTime());
        // console.log("d.toDateString() =" +d.toDateString());
        // console.log("d.toISOString() =" +d.toISOString());
        // console.log("d.toLocaleDateString() =" +d.toLocaleDateString());
        // console.log("d.toLocaleTimeString() =" +d.toLocaleTimeString());
        // console.log("d.toLocaleString() =" +d.toLocaleString());
        // console.log("d.toString() =" +d.toString());
        // console.log("d.toUTCString() =" +d.toUTCString());
        // console.log("d.valueOf() =" +d.valueOf());
        // console.log("d.getDate() = "+d.getDate());
        // console.log("d.getDay() = "+d.getDay());
        // console.log("d.getFullYear() = "+d.getFullYear());
        // console.log("d.getHours() = "+d.getHours());
        // console.log("d.getMinutes() = "+d.getMinutes());
        // console.log("formatDate(d) = "+formatDate(d));
        
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
            location: this.state.location.name,
            country: this.state.country,
            buy_price: this.state.buyPrice,
            first_bid: this.state.firstBid,
            end: this.state.ends,
            description: this.state.description
        }

        if(this.state.location.latitude !== '' && this.state.location.longitude !==''){
            requestBody = {
                ...requestBody,
                latitude:  this.state.location.latitude,
                longitude: this.state.location.longitude
            }
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
                if(field==='location'){
                    draft[field].name = v;
                }
                else{
                    draft[field] = v;
                }                
            }),
            ()=>console.log(this.state)
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

    toggleMapHandler = () =>{
        this.setState({toggleMap: !this.state.toggleMap});
    }

    coordsHandler = (lat, lng)=>{
        this.setState(
            produce(draft=>{
                draft.location.latitude = lat;
                draft.location.longitude = lng;
                draft.hasCoords = true;
            }),()=>console.log(this.state)
        )
            
    }

    zoomHandler = (zoom)=>{
        this.setState({zoom:zoom});
    }

    render() {
        const endLimit = todayIs();
        let position;
        if(this.state.hasCoords === true){
            position = [this.state.location.latitude, this.state.location.longitude];
        }
        else{
            position = [37.9838, 23.7275]
        }
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
                                            <Col> <input type="text" name="location" required value={this.state.location.name} onChange={(event) => this.inputChangeHandler('location', event)}/></Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col>Coordinates</Col>
                                            <Col> 
                                                <Row>
                                                    <Col><input readOnly className={styles.coords} type="text" placeholder="latitude" name="latitude" value={this.state.location.latitude} /></Col>
                                                    <Col><input readOnly className={styles.coords} type="text" placeholder="longitude" name="longitude" value={this.state.location.longitude}/></Col>
                                                </Row>
                                                <br/>
                                                <Row className="justify-content-center">
                                                    <Button outline color="secondary" onClick={this.toggleMapHandler}>Map</Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <br/>
                                        {this.state.toggleMap ? 
                                        <Row className="d-flex justify-content-center">
                                            <Map 
                                                className={styles.map} 
                                                position={position}
                                                zoom={this.state.zoom} 
                                                onClick={(event) => this.coordsHandler(event.latlng.lat, event.latlng.lng)} 
                                                onZoomEnd={(event)=>this.zoomHandler(event.target._zoom)}
                                            >
                                                {(this.state.hasCoords===true)?
                                                <Marker position={position}/>:null}
                                            </Map>
                                        </Row>:null}
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
                                            <Col><input type="datetime-local"  name="ends" required value={this.state.ends} onChange={(event) => this.inputChangeHandler('ends', event)} min={endLimit}/></Col>
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