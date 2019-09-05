import React from 'react';
import {Card, CardBody, CardText, Col, Row, Button} from "reactstrap";
import './SearchResultItem.css';
import $ from "jquery";
import {getUserInfoField} from "../Utility/Utility";

class SearchResultItem extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            bid : this.props.item.currentBid + 0.5
        }
    }

    // componentDidMount(){
    //     console.log(this.props.item);
    //     this.setState({bid : this.props.currentBid + 0.5 });
    // }

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
            <Card className="bidcard">
                <Col>
                    <br/>
                    <Row>
                        <h4>
                            {this.props.item.name }
                        </h4>
                    </Row>
                    <hr/>
                    <br/>
                    <Row>
                        <span className="item-text-area">
                            by {this.props.item.sellerId}
                        </span>
                    </Row>
                    <br/>
                    <Row>
                        <span className="item-text-area">
                            Remaining time: 7d 20h 32m (Tuesday, March 8th, 20:30)
                        </span>
                        <span className="pair">
                            {"$"+" "}<input className="buy" type="number" step="0.5" readOnly value={this.props.item.buyPrice}/>
                            <button type="submit" onClick={()=>this.buyHandler()}>Buy</button>
                        </span>
                    </Row>
                    <br/>
                    <Row>
                        <span  className="item-text-area">
                            Highest Bid : $ {this.props.item.currentBid} by username (bidder review: 3/5) 
                        </span>
                        <span className="pair">
                            {"$"+" "}<input className="bid" type="number" step="0.5" min={this.props.item.currentBid+0.5} value={this.state.bid} onChange={(event)=> this.inputChangeHandler(event)}/>
                            <button type="submit" onClick={()=>this.bidHandler()} > Bid</button>
                        </span>
                    </Row>
                    <br/>
                </Col>
            </Card>
        );
    }
}

export default SearchResultItem;