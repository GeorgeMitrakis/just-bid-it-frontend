import React from 'react';
import {Card, Col, Row} from "reactstrap";
import { withRouter } from 'react-router-dom';
import { Collapse, Button, CardBody} from 'reactstrap';
import { CardText, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { TabContent, TabPane, CardTitle } from 'reactstrap';


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
    togglefunc(tab)
    {

        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
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