import React from 'react';
import {Card, CardBody, CardText} from "reactstrap";
import "./Popup.scss";
import './search.css';
import $ from "jquery";
import {getUserInfo, getUserInfoField} from "./Utility";
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
                        {this.props.item.name } by {this.props.item.sellerId} <br/>
                        Remaining time: 7d 20h 32m (Tuesday, March 8th, 20:30) $ <input type="text" readOnly value={this.props.item.buyPrice}/>
                        <button type="submit">BUY</button><br/>
                        Highest Bid : $ {this.props.item.currentBid} by username (bidder review: 3/5) $ <input type="text" value={this.state.bid} onChange={(event)=> this.inputChangeHandler(event)}/>
                        <button type="submit" onClick={()=>this.bidHandler()} > BID</button>
                        <br/>
                    </CardText>

                </CardBody>
            </Card>
        );
    }
}

export default AuctionItem;