import React from 'react';
import { withRouter } from 'react-router-dom';

import {Col,Row, Form, Button } from "reactstrap";
import AutoCompletePopup from './AutoCompletePopup';
import produce from 'immer';
import $ from "jquery";
import './Searchbar.scss'

class SearchBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            searchterm : '',
            categoryvalue : '',
            isPopupOpen : false
        }
    }    

    inputChangedHandler(event, field) {
        event.persist();
        event.preventDefault();
        //console.log(event.target.value);
        let v = event.target.value;
        this.setState(
            produce(draft=>{
                draft[field]= v;
            })
        )

        if(field === "categoryvalue"){
            this.categoriesGet(v);
        }
    }

    categoriesGet(value){
        if(value===''){
            this.setState({categories:[]});
            this.hidePopup();
            return;
        }

        $.ajax({
            url: "http://localhost:8765/app/api/categories",
            dataType: 'json',
            type: 'GET',
            data: {
               category: value
            }

        })
        .then(json => {
            console.log("Ajax success!");
            console.log(json)
            this.setState({categories:json.categories})
            this.showPopup();
            console.log("Ajax end");
        })
        .fail(err=>{
            console.log(err)
        })
    }
    
    categorySelectHandler(value){
        //console.log("categorySelectHandler start");
        //console.log(this.state);
        this.setState({categoryvalue:value});
        this.hidePopup();
        //console.log(this.state);
        //console.log("categorySelectHandler end");
    }

    showPopup() {
        this.setState({ isPopupOpen: true });
    }
    
    hidePopup() {
        this.setState({ isPopupOpen: false });
    }

    submitHandler = (event) => {
        event.persist();
        event.preventDefault();
        //console.log(event);
        this.props.searchHandler(this.state.searchterm, this.state.categoryvalue);
    }

    render(){
        return(
            <Form onSubmit={this.submitHandler}>
            <Row className="d-flex justify-content-center align-items-start" >

                <div className="search">
                    <div className="search-container">
                        <div className="content">
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                placeholder="Search for auction..." 
                                value={this.state.searchterm} 
                                onChange={(event)=> this.inputChangedHandler(event, "searchterm")}
                                
                            />
                        </div>
                    </div>
                </div>
                <div className="search">
                    <div className="search-container">
                        <div 
                            className="content" 
                            //ref={this.popupRef}
                        >
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                placeholder="Category, eg. 'Shoes'" 
                                style={{ marginBottom:" 7px"}}
                                value={this.state.categoryvalue} 
                                onChange={(event)=> this.inputChangedHandler(event, "categoryvalue")}
                                onClick={() => {if(this.state.categoryvalue!==''){ this.showPopup()}}}
                            />
                            
                            <AutoCompletePopup 
                                isOpen={this.state.isPopupOpen}
                                categories = {this.state.categories} 
                                select={(value) => this.categorySelectHandler(value)} 
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-1">
                    <Button type="submit">SEARCH</Button>
                </div>
            </Row>
         </Form>
        )
    }
}



export default withRouter(SearchBar);