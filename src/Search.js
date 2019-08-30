import React from 'react';
import { withRouter } from 'react-router-dom';
import {Col,Row, Form } from "reactstrap";
import './search.css';
import produce from 'immer';
 import $ from "jquery";
import Popup from './Popup';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.items = [
            'mary',
            'tum',
            'john',
        ];

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
                console.log(json)
                this.setState({categories:json.categories})
            })
            .fail(err=>{
                console.log(err)
            })

    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(event);
    }


    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions  = [];
        if(value.length > 0) {
            const regex = new RegExp(`^$(value)` , 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }

        this.setState(() => ({suggestions}));
    }
    rendersugg(){
        const {suggestions} = this.state;
        if (suggestions.length === 0)
        {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li>{item}</li>)}
            </ul>
        );
    }

    render() {

        return (
            <div className="filter-list">
                <Form onSubmit={this.submitHandler}>
                   <Row className="d-flex justify-content-center">

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
                                   < Popup isOpen = {this.state.isPopupOpen} categories = {this.state.categories}/>
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

