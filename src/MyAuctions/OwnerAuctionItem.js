import React from 'react';
import {Card, Col, Row} from "reactstrap";
import { withRouter,Route, BrowserRouter as Router, Switch  } from 'react-router-dom';
import { Collapse, Button, CardText, 
    Nav, NavItem, NavLink, TabContent, TabPane, CardTitle } from 'reactstrap';
import classnames from 'classnames';
import AuctionForm from "./AuctionForm";
import styles from './OwnerAuctionItem.module.css';
import $ from 'jquery';


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
                    <Collapse isOpen={this.state.collapse}>
                        <>
                        <Nav tabs>
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
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special lalalala</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special iaiaiaiat</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special Title Treatment</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special Title Treatment</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special treatment</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special iaiaiaiat</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                </Row>
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