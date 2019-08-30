import React from 'react';
import { withRouter } from 'react-router-dom';
import {Col,Row, Form, Button } from "reactstrap";
import './search.css';
import produce from 'immer';
 import $ from "jquery";
import Popup from './Popup';
import './Searchbar.scss'
import res from './response.json';
import AuctionItem from './AuctionItem';


class Search extends React.Component {
    constructor(props) {
        super(props);

        this.popupRef = React.createRef();

        this.state = {
            query : '',
            categories : [],
            searchterm : '',
            categoryvalue : '',
            suggestions : [] ,
            isPopupOpen : false,
            response : res
        }
       // this.inputChangedHandler = this.inputChangedHandler.bind(this);
    }

    outsideClickHandler(event){
        if(this.popupRef.current.contains(event.target)){
            return;
        }

        if(!this.isPopupOpen){
            this.hidePopup();
        }
    }

    showPopup() {
        this.setState({ isPopupOpen: true });
    }
    
    hidePopup() {
        this.setState({ isPopupOpen: false });
    }

    categoryInputChangedHandler(event) {
        event.persist();
        event.preventDefault();
        console.log(event.target.value);
        let v = event.target.value;
        this.setState(
            produce(draft=>{
                draft.categoryvalue= v;
                if(v!== ''){
                    draft.isPopupOpen = true;
                }else
                    draft.isPopupOpen = false;
            })
        )
        $.ajax({
            url: "http://localhost:8765/app/api/categories",
            dataType: 'json',
            type: 'GET',
            data: {
               category: v
            }

        })
        .then(json => {
            //console.log(json)
            this.setState({categories:json.categories})
        })
        .fail(err=>{
            console.log(err)
        })

    }

    categorySelectHandler = (value) => {
        this.setState({categoryvalue:value});
        this.hidePopup();
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(event);
        console.log(res);
    }

    render() {
        let results = this.state.response.items.map((item,index)=>
            <AuctionItem item = {item} key = {index} />
            );
        return (
            <Col className="filter-list"
                onClick={(event)=>this.outsideClickHandler(event)}
            >
                <Form onSubmit={this.submitHandler}>
                   <Row className="d-flex justify-content-center align-items-start">

                       <div className="search">
                           <div className="search-container">
                               <div className="content">

                                   <input type="text" className="form-control form-control-lg" placeholder="Enter your text here.." />
                               </div>
                           </div>
                       </div>
                       <div className="search">
                           <div className="search-container">
                               <div 
                                    className="content" 
                                    ref={this.popupRef}
                                >
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Categories" 
                                        value={this.state.categoryvalue} 
                                        onChange={(event)=> this.categoryInputChangedHandler(event)}
                                        onClick={()=>{ if(!this.state.isPopupOpen) this.showPopup()}}
                                    />
                                    <Popup 
                                        isOpen={this.state.isPopupOpen} 
                                        categories = {this.state.categories} 
                                        select={this.categorySelectHandler} 
                                    />
                               </div>
                           </div>
                       </div>
                       <div className="mt-1">
                            <Button type="submit">SEARCH</Button>
                       </div>
                   </Row>
                </Form>
                    <Col> {
                        results
                    }


                    </Col>

            </Col>



        );
    }

}


export default withRouter(Search);

