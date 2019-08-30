import React from 'react';
import { withRouter } from 'react-router-dom';
import {Col,Row, Form } from "reactstrap";
import './search.css';
import produce from 'immer';
 import $ from "jquery";
import Popup from './Popup';
import './Popup.scss'


class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query : '',
            categories : [],
            searchterm : '',
            categoryvalue : '',
            suggestions : [] ,
            isPopupOpen : false
        }
       // this.inputChangedHandler = this.inputChangedHandler.bind(this);
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
                console.log(json)
                this.setState({categories:json.categories})
            })
            .fail(err=>{
                console.log(err)
            })

    }

    categorySelectHandler = (value) => {
        this.setState({categoryvalue:value});
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <div className="filter-list">
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
                               <div className="content">
                                    <input type= "text" className="form-control form-control-lg" placeholder="Categories" value={this.state.categoryvalue} onChange={(event)=> this.categoryInputChangedHandler(event)}/>
                                   < Popup isOpen = {this.state.isPopupOpen} categories = {this.state.categories} select={this.categorySelectHandler}/>
                               </div>
                           </div>
                       </div>
                       <div>
                            <button type="submit" className="btn float-right">SEARCH</button>
                       </div>
                   </Row>
                </Form>

            </div>

        );
    }

}


export default withRouter(Search);

