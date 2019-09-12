import React from 'react';
import {Card, Col, Row, Table} from "reactstrap";
import { withRouter,Route, BrowserRouter as Router, Switch  } from 'react-router-dom';
import { Collapse, Button, CardText, 
    Nav, NavItem, NavLink, TabContent, TabPane, CardTitle } from 'reactstrap';
import classnames from 'classnames';
import AuctionForm from "./AuctionForm";
import styles from './OwnerAuctionItem.module.css';
import $ from 'jquery';
import CardBody from "reactstrap/es/CardBody";
import Map from '../Map/Map';


class OwnerAuctionItem extends React.Component {
    constructor(props) {

        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false ,
            activeTab: '1'
        };

    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    
    togglefunc(tab){

        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    // componentDidMount(){
    //     this.showUsers();
    // }
    //
    // showUsers(){
    //     $.ajax({
    //         url: "http://localhost:8765/app/api/items",
    //         dataType: 'json',
    //         type: 'GET'
    //
    //     })
    //         .then(json => {
    //             console.log("Ajax success!");
    //             console.log(json)
    //             this.setState({users:json.users})
    //             this.props.users(json.users);
    //             console.log("Search Ajax end");
    //         })
    //         .fail(err=>{
    //             console.log(err)
    //         })
    // }

    render() {
        return(
            <Card className={styles.bidcard}>
                <Col>
                    <br/>
                    <Row className="d-flex justify-content-around">
                        <Col className="d-flex justify-content-start" >
                            <h4>{this.props.item.name}</h4>
                        </Col>
                        <button 
                            onClick={()=>this.props.history.push("/items/"+this.props.item.id+"/edit")}
                        >
                            Edit
                        </button>
                        <button 
                            onClick={()=>this.props.deleteHandler(this.props.item)}
                        >
                            Delete
                        </button>
                    </Row>
                    <hr/>
                    <br/>
                    <Row className="d-flex justify-content-between">
                        <Col className="d-flex justify-content-start" >
                        Auction Status: {(this.props.item.running) ? "running" : "completed"}
                        </Col>
                    </Row>
                    <br/>
                    <Row className="d-flex justify-content-between">
                        <Col className="d-flex justify-content-start" >
                        Remaining time: 7d 20h 32m (Tuesday, March 8th, 20:30) $
                        </Col>
                    </Row>
                    <br/>
                    <Row className="d-flex justify-content-between">
                        <Col className="d-flex justify-content-between" >
                                Buy Price :${this.props.item.buyPrice}
                        </Col>
                            <Col className="d-flex justify-content-between" >
                                Bids : {this.props.item.numberOfBids} </Col>
                        <Col className="d-flex justify-content-between" >
                        Highest Bid :$ {this.props.item.currentBid} by bidder (bidder review: 3/5) $
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-lg-end">
                    <Button outline color="secondary" onClick={this.toggle}>Details</Button>
                    </Row>
                    <Row>
                    <Collapse isOpen={this.state.collapse}>
                        <>
                        <Nav tabs className="d-flex justify-content-center">
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.togglefunc('1'); }}
                                >
                                    Auction details
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.togglefunc('2'); }}
                                >
                                    Location
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.togglefunc('3'); }}
                                >
                                    Bids
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <Card body>
                                            <Col className="d-flex justify-content-start">
                                            <CardTitle>Description: {this.props.item.description}</CardTitle>
                                            </Col>
                                            <Col className="d-flex justify-content-start">
                                            <CardText>Categories: {this.props.item.categories}</CardText>
                                            </Col>
                                            <Col className="d-flex justify-content-start">
                                            <CardText> First bid: <input type="number" readOnly value={this.props.item.firstBid}/> </CardText>
                                            </Col>
                                            <Col className="d-flex justify-content-start">
                                            <CardText>Started: {this.props.item.start}</CardText>
                                            </Col>
                                            <Col className="d-flex justify-content-start">
                                            <CardText>Ends: {this.props.item.end}</CardText>
                                            </Col>
                                        </Card>
                                    </Col>

                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="6">
                                        <Card body>
                                           <Col className="d-flex justify-content-start">
                                               <CardText>Location: {this.props.item.location}</CardText>
                                           </Col>
                                            <Col className="d-flex justify-content-start" >
                                               <CardText>Country:{this.props.item.country}</CardText>
                                           </Col>
                                        </Card>
                                    </Col>

                                    <Col sm="6">
                                        <Card body>
                                        <Col className="d-flex justify-content-center">
                                        <>
                                        <Map className = {styles.showmap} > </Map>
                                        </>
                                        </Col>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <div>
                                    <Table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th className="hidden">Bid id</th>
                                            <th>Bidder</th>
                                            <th>Amount($)</th>
                                            <th>Time</th>
                                            <th>Bidder rating</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {   this.props.item.bids!== null ?(
                                            this.props.item.bids.map((item,index) =>{
                                            return(<tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.bidder}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.time}</td>
                                                <td>{item.bidderRating}</td>
                                            </tr>)
                                        }) ):
                                            <div> - </div>
                                        }

                                        </tbody>

                                    </Table>
                                </div>
                            </TabPane>
                        </TabContent>
                        </>
                    </Collapse>
                    </Row>
                </Col>
            </Card>
        );
    }


}



export default withRouter(OwnerAuctionItem);