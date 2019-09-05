import React from 'react';
import { withRouter } from 'react-router-dom';
import {Col, Pagination, PaginationItem, PaginationLink, Row} from "reactstrap";
import './Search.css';
import $ from "jquery";
import SearchResultItem from './SearchResultItem';
import SearchBar from './SearchBar';


class Search extends React.Component {
    constructor(props) {
        super(props);

        //this.popupRef = React.createRef();
        this.state = {
            items : []
        }
        //this.inputChangedHandler = this.inputChangedHandler.bind(this);
        //this.togglePopup = this.togglePopup.bind(this);
    }

    componentDidMount(){
        this.searchItems(this.state.searchterm, this.state.categoryvalue, this.state.locationvalue, this.state.maxprice);
    }


    searchItems(searchterm, categoryvalue ,locationvalue ,maxprice){
        $.ajax({
            url: "http://localhost:8765/app/api/search",
            dataType: 'json',
            type: 'GET',
            data: {
                term: searchterm,
                category: categoryvalue,
                location : locationvalue,
                price : maxprice
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


    // outsideClickHandler(event){
    //     event.persist();
    //     event.preventDefault();
    //     console.log(event);
    //     if(event.type === "submit"){
    //         this.searchItems();
    //         return;
    //     }
    //     if(this.popupRef.current.contains(event.target)){
    //         return;
    //     }
       
    //     this.hidePopup();
    // }
    

    render() {
        return (
            <Col className="filter-list"
                //onClick={(event)=>this.outsideClickHandler(event)}
            >
               <SearchBar searchHandler={(s,c)=>this.searchItems(s,c)}/>

                        <Pagination aria-label="Page navigation example">
                            <PaginationItem>
                                <PaginationLink first href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink previous href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    3
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    4
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    5
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink next href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink last href="#" />
                            </PaginationItem>
                        </Pagination>
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

