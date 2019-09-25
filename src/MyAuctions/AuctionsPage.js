import React from 'react';
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuctionsList from './AuctionsList';
import AuctionForm from './AuctionForm';
import produce from 'immer';
import $ from 'jquery';
import NewAuction from './NewAuction';
import { getUserInfoField } from '../Utility/Utility';

class AuctionsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items:[]
        }        
    }

    componentDidMount(){
        console.log("WARNING [AuctionsPage.js]");
        console.log("-----------------------");
        console.log("sending request with dummy userId");
        console.log("-----------------------");

        $.ajax({
            url: "http://localhost:8765/app/api/items",
            dataType : 'json',
            type: 'GET',
            data: {userId:getUserInfoField("id")}
        })
        .then(json => {
            console.log(json) 
            console.log(json.results); 
            this.setState({items:json.results})
            //this.props.addItems(json.results);           
        })
        .fail(err=>{
            console.log(err);
        })
    }

    editHandler = (data, id)=>{
        if(!window.confirm(`Submit changes?`)) return;
        $.ajax({
            url: "http://localhost:8765/app/api/items/"+id,
            dataType : 'json',
            type: 'PUT',
            data: data
        })
        .then(json => {
            console.log(json)
            this.setState(
                produce(draft=>{
                    for (let index =0; index< draft.items.length; index++) {
                        if (json.item.id === draft.items[index].id) {
                            console.log("From: ")
                            console.log(draft.items[index])
                            console.log("To: ")
                            console.log(json.item)
                            
                            draft.items[index] = json.item;
                        }
                    }
                }),()=>{this.props.history.goBack()}
            )            
        })
        .fail(err=>{
            console.log(err);
        })
    }

    deleteHandler = (item) =>{
        if(!window.confirm(`Are you sure you want to delete this item?`)) return;
        $.ajax({
            url: "http://localhost:8765/app/api/items/"+item.id,
            dataType : 'json',
            type: 'DELETE'
        })
        .then(json => {
            console.log(json)
            this.setState(
                produce(draft=>{
                    draft.items = this.state.items.filter((elem, index)=>{
                        if(elem.id !== item.id){
                            return elem;
                        }
                    })
                })
            )            
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
                        render={()=>(<AuctionsList items={this.state.items} deleteHandler={this.deleteHandler}/>)}
                    />                    
                </Switch>
            </Router>       
        )
    }
}

export default withRouter(AuctionsPage);