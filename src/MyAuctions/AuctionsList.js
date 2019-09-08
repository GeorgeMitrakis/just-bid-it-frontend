import React from 'react';
import { withRouter,Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Row, Col, Button, Container} from 'reactstrap';
import $ from 'jquery';
import OwnerAuctionItem from "./OwnerAuctionItem";
import AuctionForm from "./AuctionForm";
import {getUserInfoField} from "../Utility/Utility";

class AuctionsList extends React.Component{
    constructor(props){
        super(props);
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
                    this.props.items.length!==0 ?(
                        this.props.items.map((item,index)=>
                            <OwnerAuctionItem item = {item} key = {index} deleteHandler={this.props.deleteHandler} />)
                    ):
                    <div className="mt-5"><p>Sorry, no results could match your search.</p></div>
                }
                </Col>
            </Container>
        )
    }
}

export default withRouter(AuctionsList);