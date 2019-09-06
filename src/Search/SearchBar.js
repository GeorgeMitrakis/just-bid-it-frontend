import React from 'react';
import { withRouter } from 'react-router-dom';

import {Row, Form, Button } from "reactstrap";
import AutoCompletePopup from './AutoCompletePopup';
import produce from 'immer';
import $ from "jquery";
import styles from './Searchbar.module.scss';

class SearchBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            searchterm : '',
            categoryvalue : '',
            isCategoryPopupOpen : false,
            isLocationPopupOpen: false,
            locationvalue : ''


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
        }else if(field === "locationvalue"){
            this.locationGet(v);
        }

    }


    categoriesGet(value){
        if(value===''){
            this.setState({categories:[]});
            this.hideCategoryPopup();
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
            this.showCategoryPopup();
            console.log("Ajax end");
        })
        .fail(err=>{
            console.log(err)
        })
    }
    locationGet(value){
        if(value===''){
            this.setState({locations:[]});
            this.hideLocationPopup();
            return;
        }

        $.ajax({
            url: "http://localhost:8765/app/api/locations",
            dataType: 'json',
            type: 'GET',
            data: {
                location: value
            }

        })
            .then(json => {
                console.log("Ajax success!");
                console.log(json)
                this.setState({locations:json.locations})
                this.showLocationPopup();
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
        this.hideCategoryPopup();
        //console.log(this.state);
        //console.log("categorySelectHandler end");
    }
    locationSelectHandler(value){
        //console.log("categorySelectHandler start");
        //console.log(this.state);
        this.setState({locationvalue:value});
        this.hideLocationPopup();
        //console.log(this.state);
        //console.log("categorySelectHandler end");
    }

    showCategoryPopup() {
        this.setState({ isCategoryPopupOpen: true });
    }
    
    hideCategoryPopup() {
        this.setState({ isCategoryPopupOpen: false });
    }
    showLocationPopup() {
        this.setState({ isLocationPopupOpen: true });
    }

    hideLocationPopup() {
        this.setState({ isLocationPopupOpen: false });
    }

    submitHandler = (event) => {
        event.persist();
        event.preventDefault();
        //console.log(event);
        this.props.searchHandler(this.state.searchterm, this.state.categoryvalue,this.state.locationvalue,20);
    }

    render(){
        return(
            <div>
            <Form onSubmit={this.submitHandler}>
            <Row className="d-flex justify-content-center align-items-start" >

                <div className={styles.search}>
                    <div className="search-container">
                        <div className={styles.content}>
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
                <div className={styles.search}>
                    <div className="search-container">
                        <div 
                             className={styles.content}
                            //ref={this.popupRef}
                        >
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                placeholder="Category, eg. 'Shoes'" 
                                style={{ marginBottom:" 7px"}}
                                value={this.state.categoryvalue} 
                                onChange={(event)=> this.inputChangedHandler(event, "categoryvalue")}
                                onClick={() => {if(this.state.categoryvalue!==''){ this.showCategoryPopup()}}}
                            />
                            
                            <AutoCompletePopup 
                                isOpen={this.state.isCategoryPopupOpen}
                                items = {this.state.categories}
                                select={(value) => this.categorySelectHandler(value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.search}>
                    <div className="search-container">
                        <div
                             className={styles.content}
                            //ref={this.popupRef}
                        >
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Location, eg. 'Athens'"
                                style={{ marginBottom:" 7px"}}
                                value={this.state.locationvalue}
                                onChange={(event)=> this.inputChangedHandler(event, "locationvalue")}
                                onClick={() => {if(this.state.locationvalue!==''){ this.showLocationPopup()}}}
                            />

                            <AutoCompletePopup
                                isOpen={this.state.isLocationPopupOpen}
                                items = {this.state.locations}
                                select={(value) => this.locationSelectHandler(value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.search}>
                    <div className="search-container">
                        <div
                             className={styles.content}
                        >
                            <input
                                type="text"
                                className={"form-control form-control-lg "+styles.buycontainer}
                                placeholder="Price"
                                // value={this.state.categoryvalue}
                                // onChange={(event)=> this.inputChangedHandler(event, "categoryvalue")}
                                // onClick={() => {if(this.state.categoryvalue!==''){ this.showPopup()}}}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-1">
                    <Button type="submit">SEARCH</Button>
                </div>
            </Row>
         </Form>

            </div>
        )
    }
}



export default withRouter(SearchBar);