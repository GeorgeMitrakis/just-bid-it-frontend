import React from 'react';
import { withRouter,Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Row, Col, Button, Container} from 'reactstrap';
import $ from 'jquery';
import OwnerAuctionItem from "./OwnerAuctionItem";
import AuctionForm from "./AuctionForm";
import {getUserInfoField} from "../Utility/Utility";

class MyAuctions extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            items:[]
        }
    }

    componentDidMount(){
        console.log("WARNING [MyAuctions.js]");
        console.log("-----------------------");
        console.log("sending request with dummy userId");
        console.log("-----------------------");

        $.ajax({
            url: "http://localhost:8765/app/api/items",
            dataType : 'json',
            type: 'GET',
            data: {userId:9}
        })
        .then(json => {
            console.log(json) 
            console.log(json.results); 
            this.setState({items:json.results})
            this.props.items(json.results);           
        })
        .fail(err=>{
            console.log(err);
        })
    }

    render(){
        return(
            <Container className="mt-3">
                <Col>
                    <Row className= "d-flex justify-content-center">
                        <h4>Dear {" "+getUserInfoField("username")+" "} , here you can edit or delete your auctions, or create new ones!</h4>
                    </Row>
                    <br/>
                    <Row className="mb-3 d-flex justify-content-center">
                        <Button onClick={()=>this.props.history.push("/items/new")}>Create new auction</Button>
                    </Row>
                </Col>
                <Col>
                {
                    this.state.items.length!==0 ?(
                        this.state.items.map((item,index)=>
                            <OwnerAuctionItem item = {item} key = {index} />)
                    ):
                    <div className="mt-5"><p>Sorry, no results could match your search.</p></div>
                }
                </Col>
            </Container>
        )
    }
}

export default withRouter(MyAuctions);