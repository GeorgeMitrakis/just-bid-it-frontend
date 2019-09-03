import React from 'react';
import { withRouter } from 'react-router-dom';
import {Col,Row, Form, Button } from "reactstrap";
import './Search.css';
import produce from 'immer';
 import $ from "jquery";
import AutoCompletePopup from './AutoCompletePopup';
import './Searchbar.scss'
import res from '../response.json';
import SearchResultItem from './SearchResultItem';


class Search extends React.Component {
    constructor(props) {
        super(props);

        this.popupRef = React.createRef();

        this.state = {
            categories : [],
            searchterm : '',
            categoryvalue : '',
            suggestions : [] ,
            isPopupOpen : false,
            items : []
        }
       // this.inputChangedHandler = this.inputChangedHandler.bind(this);
        //this.togglePopup = this.togglePopup.bind(this);
    }

    componentDidMount(){
        this.searchItems();
    }

    searchItems(){
        $.ajax({
            url: "http://localhost:8765/app/api/search",
            dataType: 'json',
            type: 'GET',
            data: {
                term: this.state.searchterm,
                category: this.state.categoryvalue
            }

        })
        .then(json => {
            console.log("Search Ajax success!");
            console.log(json)
            this.setState({items:json.items})
            console.log("Search Ajax end");
        })
        .fail(err=>{
            console.log(err)
        })
    }


    outsideClickHandler(event){
        event.persist();
        event.preventDefault();
        console.log(event);
        if(event.type === "submit"){
            this.searchItems();
            return;
        }
        if(this.popupRef.current.contains(event.target)){
            return;
        }
       
        this.hidePopup();
    }

    showPopup() {
        this.setState({ isPopupOpen: true });
    }
    
    hidePopup() {
        this.setState({ isPopupOpen: false });
    }

    togglePopup(){
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }

    categoryInputChangedHandler(event) {
        event.persist();
        event.preventDefault();
        console.log(event.target.value);
        let v = event.target.value;
        this.setState(
            produce(draft=>{
                draft.categoryvalue= v;
            })
        )
        
        this.categoriesGet(v);
    }

    searchInputChangedHandler(event) {
        event.persist();
        event.preventDefault();
        console.log(event.target.value);
        let v = event.target.value;
        this.setState(
            produce(draft=>{
                draft.searchterm= v;
            })
        )
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
        console.log("categorySelectHandler start");
        console.log(this.state);
        this.setState({categoryvalue:value});
        this.hidePopup();
        console.log(this.state);
        console.log("categorySelectHandler end");
    }

    submitHandler = (event) => {
        event.persist();
        event.preventDefault();
        console.log(event);
        this.searchItems();
    }

    render() {
        return (
            <Col className="filter-list"
                //onClick={(event)=>this.outsideClickHandler(event)}
            >
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
                                        onChange={(event)=> this.searchInputChangedHandler(event)}
                                        
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
                                        onChange={(event)=> this.categoryInputChangedHandler(event)}
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
                <Col> 
                {
                    this.state.items.length!==0 ?(
                    this.state.items.map((item,index)=>
                    <SearchResultItem item = {item} key = {index} />)
                    ):
                    <div className="mt-5"><p>Sorry, no results could match your search.</p></div>
                }
                </Col>

            </Col>



        );
    }

}


export default withRouter(Search);

