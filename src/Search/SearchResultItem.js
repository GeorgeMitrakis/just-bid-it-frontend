import React from 'react';
import classnames from 'classnames';
import {
    Button,
    Card,
    CardText,
    CardTitle,
    Col,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent, Table,
    TabPane
} from "reactstrap";
import {bidcard, infoRow, itemTextArea, pairInput, pairButton, buy, bid} from './SearchResultItem.module.css';
import $ from "jquery";
import {getUserInfoField} from "../Utility/Utility";

class SearchResultItem extends React.Component{

    constructor(props){

        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            bid : this.props.item.currentBid + 0.5 ,
            collapse: false ,
            activeTab: '1'
        }
    }

    // componentDidMount(){
    //     console.log(this.props.item);
    //     this.setState({bid : this.props.currentBid + 0.5 });
    // }

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
    inputChangeHandler(event) {
        event.persist();
        event.preventDefault();
        console.log(event.target.value);
        let v = event.target.value;
        this.setState({bid:v} )

    }

    bidHandler(){
        console.log("creep");
        $.ajax({
            url: "http://localhost:8765/app/api/items/"+this.props.item.id+"/bid",
            dataType: 'json',
            type: 'POST',
            data: {
                bidder_id: getUserInfoField("id"),
                amount: this.state.bid
            }

        })
        .then(json => {
            console.log(json)
        })
        .fail(err=>{
            console.log(err)
        })

    }

    buyHandler(){
        console.log("creep");
        console.log(this.props.item);
        console.log( getUserInfoField("id"));

        if(this.props.item === null){
            console.log("item has no buy price.")
            return;
        }

        $.ajax({
            url: "http://localhost:8765/app/api/items/"+this.props.item.id+"/buy",
            dataType: 'json',
            type: 'POST',
            data: {
                bidder_id: getUserInfoField("id")
            }

        })
        .then(json => {
            console.log(json)
        })
        .fail(err=>{
            console.log(err)
        })
    }


    render() {
        return(
           <div>
            <Card className={bidcard}>
                <Col>
                    <br/>
                    <Row className={infoRow}>
                        <h4>
                            {this.props.item.name }
                        </h4>
                    </Row>
                    <hr/>
                    <br/>
                    <Row className={infoRow}>
                        <span className={itemTextArea}>
                            by {this.props.item.sellerId}
                        </span>
                    </Row>
                    <br/>
                    <Row className={infoRow}>
                        <span className={itemTextArea}>
                            Remaining time: 7d 20h 32m (Tuesday, March 8th, 20:30)
                        </span>
                        <span>
                            {"$ "}<input className={buy+" "+pairInput} type="number" step="0.5" readOnly value={this.props.item.buyPrice}/>
                            <button className={pairButton} type="submit" onClick={()=>this.buyHandler()}>Buy</button>
                        </span>
                    </Row>
                    <br/>
                    <Row className={infoRow}>
                        <span  className={itemTextArea}>
                            Highest Bid : $ {this.props.item.currentBid} by username (bidder review: 3/5) 
                        </span>
                        <span>
                            {"$ "}<input className={bid+" "+ pairInput} type="number" step="0.5" min={this.props.item.currentBid+0.5} value={this.state.bid} onChange={(event)=> this.inputChangeHandler(event)}/>
                            <button className={pairButton} type="submit" onClick={()=>this.bidHandler()} > Bid</button>
                        </span>
                    </Row>
                    <br/>
                    <Row className={infoRow}>
                        <span  className={itemTextArea}>
                            Location : {this.props.item.location}
                        </span>
                    </Row>
                    <br/>
                    <Row className={infoRow}>
                        <span  className={itemTextArea}>
                            Description : {this.props.item.description}
                        </span>
                    </Row>
                    <br/>
                    <Row className="d-flex justify-content-lg-end">
                        <Button outline color="secondary" onClick={this.toggle}>Details</Button>
                    </Row>
                    <Row>
                        <Collapse isOpen={this.state.collapse}>

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
                                </TabContent>
                        </Collapse>
                    </Row>
                </Col>

            </Card>
           </div>
        );
    }
}

export default SearchResultItem;