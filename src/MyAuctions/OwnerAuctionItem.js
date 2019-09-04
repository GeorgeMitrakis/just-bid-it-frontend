import React from 'react';
import {Card, Col} from "reactstrap";
import Row from "reactstrap/es/Row";
import { withRouter } from 'react-router-dom';
import $ from "jquery";
import {getUserInfoField} from "../Utility/Utility";
import { Collapse, Button, CardBody} from 'reactstrap';
import { CardImg, CardText,  CardLink,
    CardTitle, CardSubtitle } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
class OwnerAuctionItem extends React.Component {
    constructor(props) {

        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };

    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    // showItems(){
    //     $.ajax({
    //         url: "http://localhost:8765/app/api/items/"+this.props.item.id+"",
    //         dataType: 'json',
    //         type: 'GET',
    //         data: {
    //             bidder_id: getUserInfoField("id"),
    //             amount: this.state.bid
    //         }
    //
    //     })
    //         .then(json => {
    //             console.log("Ajax success!");
    //             console.log(json)
    //             this.setState({items:json.items})
    //             this.props.items.id(json.items);
    //             console.log("Search Ajax end");
    //         })
    //         .fail(err=>{
    //             console.log(err)
    //         })
    // }

    render() {
        return(
            <Card className="p-0 bidcard">
                <Col>
                    <br/>
                    <Row className="d-flex justify-content-around">
                        <Col className="d-flex justify-content-start" >
                            {this.props.item.name}
                        </Col>
                        <button type ="submit">EDIT</button>
                        <button type ="submit">DELETE</button>
                    </Row>
                    <br/>
                    <Row className="d-flex justify-content-between">
                        <Col className="d-flex justify-content-start" >
                        Status: {this.props.item.running.toString()}
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
                        <Card>
                            <CardBody>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.
                                    <Row className="d-flex justify-content-center">
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink href="#" active>Link</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">active</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink disabled href="#">Disabled Link</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Row>


                                </CardText>

                            </CardBody>
                        </Card>
                    </Collapse>
                    </Row>
                </Col>
            </Card>
        );
    }


}



export default withRouter(OwnerAuctionItem);