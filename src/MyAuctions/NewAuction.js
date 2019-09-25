import React from 'react';
import { withRouter } from 'react-router-dom';
import AuctionForm from './AuctionForm';
import produce from 'immer';
import $ from 'jquery';
import { Button, Card, CardBody, CardText, Container, Col, Row, Alert } from 'reactstrap';
import {successContainer, row} from './NewAuction.module.css';

class NewAuction extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            data:{},
            submitted:false
        }
    }


    postNewAuction = (data, dummy) =>{
        if(!window.confirm(`Confirm auction?`)) return;
        $.ajax({
            url: "http://localhost:8765/app/api/items",
            dataType : 'json',
            type: 'POST',
            data: data
        })
        .then(msg => {
            console.log(msg)
            this.setState({data:data, submitted:true});  
        })
        .fail(err=>{
            console.log(err);
        })
    }
    
    render(){
        if(this.state.submitted === false){
            return(
                <AuctionForm requestHandler={this.postNewAuction}/>
            )
        }
        else{
            return(
                <Container fluid id="content" className={successContainer}>
                    <Row className={row}>
                        <Alert color="success">
                            <h5>Auction with name {"\"" + this.state.data.name + "\""} started successfully!</h5>
                        </Alert>
                    </Row>
                    <Row className={row}>
                        <Button color="link" onClick={()=>this.props.history.push("/items")}>Go to my Auctions</Button>
                    </Row>
                </Container>
            )
        }
        
    }
}

export default withRouter(NewAuction);