import React from 'react';
import {Card, Col, Row, Table} from "reactstrap";
import { withRouter,Route, BrowserRouter as Router, Switch  } from 'react-router-dom';
import { Collapse, Button, CardText, 
    Nav, NavItem, NavLink, TabContent, TabPane, CardTitle } from 'reactstrap';
import classnames from 'classnames';
import styles from './OwnerAuctionItem.module.css';
import Map from '../Map/Map';
import Marker from '../Map/Marker';


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
        let hasCoords = false;
        if(this.props.item.latitude !== 0 && this.props.item.longitude !== 0){
            hasCoords = true;
        }
        let bidcardStyle = styles.bidcard;
        if(this.props.item.running === false){
            bidcardStyle =  styles.closed;
        }
        return(
            <Card className={bidcardStyle}>
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
                        Auction ends at : {this.props.item.end}
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
                        Highest Bid :$ {this.props.item.currentBid} by username (bidder review: 3/5) $
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-lg-end">
                    <Button outline color="secondary" onClick={this.toggle}>Details</Button>
                    </Row>
                    <Row className="d-flex justify-content-center">
                    <Collapse isOpen={this.state.collapse}>
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
                                            <Col>
                                                <Row><h4>Description:</h4></Row>
                                                <Row>{this.props.item.description}</Row>
                                            </Col>

                                            <Col >
                                                <Row> <h4>Categories: </h4></Row>
                                                {this.props.item.categories.map((category,index) =>{
                                                    return(
                                                        <Row key={index}>{category}</Row>
                                                    )}
                                                )}
                                            </Col>
                                            <br/>

                                            <Col>
                                            <Row> First bid: <input type="number" readOnly value={this.props.item.firstBid}/> </Row>
                                            <br/>
                                            <Row>Auction started at: {this.props.item.start}</Row>
                                            </Col>

                                        </Card>
                                    </Col>

                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row className="d-flex justify-content-center" >
                                    <Col>
                                        <Row>
                                            <Card body>
                                            <Col>
                                                <CardText>Location: {this.props.item.location.name}</CardText>
                                            </Col>
                                                <Col>
                                                <CardText>Country:{this.props.item.country}</CardText>
                                            </Col>
                                            </Card>
                                        </Row>
                                        {hasCoords === true &&
                                        <Row>
                                            <Card body>
                                                <Col>
                                                {this.state.activeTab==='2' &&
                                                    <Map 
                                                        className = {styles.showmap} 
                                                        zoom = {15}
                                                        minZoom={13}
                                                        maxZoom={17}
                                                        position={[this.props.item.location.latitude, this.props.item.location.longitude]}
                                                        coordsHandler={(event)=>console.log(event)}
                                                    >
                                                        <Marker position={[this.props.item.location.latitude, this.props.item.location.longitude]} />
                                                    </Map>}
                                                </Col>
                                            </Card>
                                        </Row>}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <div>
                                    
                                        {   this.props.item.bids!== null ?(
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
                                            {this.props.item.bids.map((bid,index) =>{
                                            return(<tr key={index}>
                                                <td>{bid.id}</td>
                                                <td>{bid.bidder.username}</td>
                                                <td>{bid.amount}</td>
                                                <td>{bid.time}</td>
                                                <td>{bid.bidder.rating}</td>
                                            </tr>)})}                                            
                                            </tbody>
                                            </Table>
                                            ):
                                            <div className={styles.noBid}>There are no bids in this auction yet.</div>

                                        }                                    
                                </div>
                            </TabPane>
                        </TabContent>
                    </Collapse>
                    </Row>
                </Col>
            </Card>
        );
    }


}



export default withRouter(OwnerAuctionItem);