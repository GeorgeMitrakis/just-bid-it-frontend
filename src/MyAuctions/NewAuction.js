import React from 'react';
import { withRouter } from 'react-router-dom';
import AuctionForm from './AuctionForm';
import produce from 'immer';
import $ from 'jquery';

class NewAuction extends React.Component{
    constructor(props){
        super(props);
    }


    postNewAuction = (data, dummy) =>{
        $.ajax({
            url: "http://localhost:8765/app/api/items",
            dataType : 'json',
            type: 'POST',
            data: data
        })
        .then(msg => {
            console.log(msg)            
        })
        .fail(err=>{
            console.log(err);
        })
    }
    
    render(){
        return(
            <AuctionForm requestHandler={this.postNewAuction}/>
        )
    }
}

export default withRouter(NewAuction);