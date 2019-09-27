import React from 'react';
import {Card, Col, Row, Table} from "reactstrap";
import { withRouter } from 'react-router-dom';
import { Collapse, Button,
    Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap';
import classnames from 'classnames';
import produce from 'immer';
import styles from './OwnerAuctionItem.module.css';
import Map from '../Map/Map';
import Marker from '../Map/Marker';


class OwnerAuctionItem extends React.Component {
    constructor(props) {

        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false ,
            activeTab: '1',
            alert:{
                visible:false,
                message:''
            }
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

    onDismiss = () => {
        this.setState(
            produce(draft=>{
                draft.alert.visible = false;
            }))
    }

    editHandler = () =>{
        if(this.props.item.running ===false ){
            this.setState(
                produce(draft=>{
                    draft.alert.visible = true;
                    draft.alert.message = 'Auction is closed. It cannot be edited!';
                }))
        }
        else if(this.props.item.numberOfBids > 0){
            this.setState(
                produce(draft=>{
                    draft.alert.visible = true;
                    draft.alert.message = 'There are bids on the auction. It cannot be edited!';
                }))
        }
        else{
            this.props.history.push("/items/"+this.props.item.id+"/edit")
        }
    }

    deleteHandler = () =>{
        if(this.props.item.numberOfBids > 0){
            this.setState(
                produce(draft=>{
                    draft.alert.visible = true;
                    draft.alert.message = 'There are bids on the auction. It cannot be deleted!';
                }))
        }
        else{
            this.props.deleteHandler(this.props.item)
        }
    }

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
            <div>
                <Alert color="danger" className={styles.redAlert} isOpen={this.state.alert.visible} toggle={this.onDismiss}>
                    {this.state.alert.message}
                </Alert>
                <Card className={bidcardStyle}>
                    <Col>
                        <br/>
                        <Row className="d-flex justify-content-around">
                            <Col className="d-flex justify-content-start" >
                                <h4>{this.props.item.name}</h4>
                            </Col>
                            <button
                                type="button"
                                color="muted"
                                className="btn btn-outline-secondary"
                                onClick={this.editHandler}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                color="muted"
                                className="btn btn-outline-secondary"
                                onClick={this.deleteHandler}
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
                            {this.props.item.buyPrice!==null?
                            <Col className="d-flex justify-content-between" >
                                Buy Price :${this.props.item.buyPrice}
                            </Col>:null}
                            <Col className="d-flex justify-content-between" >
                                Bids : {this.props.item.numberOfBids} 
                            </Col>
                            <Col className="d-flex justify-content-between" >
                                Highest Bid :$ {this.props.item.currentBid}
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-lg-end">
                            <Button outline color="secondary" onClick={this.toggle}>Details</Button>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Col>
                                <Collapse isOpen={this.state.collapse} className={styles.collapse}>
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
                                            <br/>
                                            <Row><h4>Description:</h4></Row>
                                            <br/>
                                            <Row>{this.props.item.description}</Row>
                                            <hr/>
                                            <Row> <h4>Categories: </h4></Row>
                                            <br/>
                                            {this.props.item.categories.map((category,index) =>{
                                                return(
                                                    <Row key={index}>{category}</Row>
                                                )}
                                            )}                                         
                                            <hr/>
                                            <Row><b> First bid:</b> {' $ '+this.props.item.firstBid} </Row>
                                            <br/>
                                            <Row><b>Auction started at:</b> {' '+this.props.item.start}</Row>
                                            <br/>
                                        </TabPane>
                                        <TabPane tabId="2">         
                                            <br/>                               
                                            <Row className="d-flex justify-content-center"><p>Location: {this.props.item.location.name}</p></Row>
                                            <Row className="d-flex justify-content-center"><p>Country:{this.props.item.country}</p></Row>
                                            <br/>
                                            <Row className="d-flex justify-content-center">
                                                {hasCoords === true && this.state.activeTab==='2' &&
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
                                            </Row>
                                            <br/>
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
                            </Col>
                        </Row>
                    </Col>
                </Card>
            </div>
        );
    }


}



export default withRouter(OwnerAuctionItem);