import React from 'react';
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyAuctions from './MyAuctions';
import AuctionForm from './AuctionForm';
import $ from 'jquery';
import NewAuction from './NewAuction';

class AuctionRoutes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items:[]
        }        
    }


    addItemsHandler = (items) =>{
        this.setState({items:items});
    }

    editHandler = (data)=>{
        $.ajax({
            url: "http://localhost:8765/app/api/items/"+this.props.item.id,
            dataType : 'json',
            type: 'PUT',
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
            <Router>
                <Switch>
                    {this.state.items.map((item,index) =>{
                            return(
                                <Route
                                    key={index}
                                    path={"/items/"+item.id+"/edit"}
                                    exact
                                    render={()=>(<AuctionForm item={item} requestHandler={this.editHandler}/>)}
                                />
                            )
                        })
                    }
                    <Route 
                        path="/items/new"
                        exact
                        render={()=>(<NewAuction />)}
                    />     
                    <Route 
                        path="/items"
                        render={()=>(<MyAuctions items={this.addItemsHandler}/>)}
                    />                    
                </Switch>
            </Router>       
        )
    }
}

export default withRouter(AuctionRoutes);