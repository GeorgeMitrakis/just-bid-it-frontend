import React from 'react';
import {Card, CardBody, CardText} from "reactstrap";
import "./Searchbar.scss";
import './search.css';
import $ from "jquery";
import {getUserInfo, getUserInfoField} from "./Utility";
import Row from "reactstrap/es/Row";
class AuctionItem extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            bid : ''
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
        console.log("gay");
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


    render() {
        return(
            <Card className="p-0 bidcard">
                <CardBody className="d-flex justify-content-start">
                    <CardText>
                        <Row className="d-flex justify-content-between">
                        {this.props.item.name } by {this.props.item.sellerId}
                        </Row>
                        <br/>
                        <Row className="d-flex justify-content-between">
                        Remaining time: 7d 20h 32m (Tuesday, March 8th, 20:30) $ <input type="text" readOnly value={this.props.item.buyPrice}/>
                        <button type="submit">BUY</button>
                        </Row>
                        <br/>
                        <Row className="d-flex justify-content-between">
                        Highest Bid : $ {this.props.item.currentBid} by username (bidder review: 3/5) $ <input type="text" value={this.state.bid} onChange={(event)=> this.inputChangeHandler(event)}/>
                        <button type="submit" onClick={()=>this.bidHandler()} > BID</button>
                        </Row>
                        <br/>
                    </CardText>

                </CardBody>
            </Card>
        );
    }
}

export default AuctionItem;