import React from 'react';
import {Card,  Col, Row} from "reactstrap";
import {bidcard, infoRow, itemTextArea, pairInput, pairButton, buy, bid} from './SearchResultItem.module.css';
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
                </Col>
            </Card>
           </div>
        );
    }
}

export default SearchResultItem;