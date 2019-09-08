import React from 'react';
import { withRouter } from 'react-router-dom';
import {Col,PaginationItem, PaginationLink, Container} from "reactstrap";
import styles from './Search.module.css';
import $ from "jquery";
import SearchResultItem from './SearchResultItem';
import SearchBar from './SearchBar';
import { Pagination } from 'semantic-ui-react';

class Search extends React.Component {
    constructor(props) {
        super(props);

        //this.popupRef = React.createRef();
        this.state = {
            limit: 10,
            activePage: 1,
            items : []
        }
        //this.inputChangedHandler = this.inputChangedHandler.bind(this);
        //this.togglePopup = this.togglePopup.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }
    componentDidMount(){
        let data = {};
        this.searchItems(data);
    }


    searchItems(data){
        $.ajax({
            url: "http://localhost:8765/app/api/search",
            dataType: 'json',
            type: 'GET',
            data: data

        })
        .then(json => {
            console.log("Search Ajax success!");
            console.log("Searched for: "+JSON.stringify(data));
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
            <Container className={styles.searchpage}
                //onClick={(event)=>this.outsideClickHandler(event)}
            >
               <SearchBar searchHandler={(s,c)=>this.searchItems(s,c)}/>
               {/*<div>*/}

               {/* <Pagination*/}
               {/*     activePage={this.state.activePage}*/}
               {/*     itemsCountPerPage={10}*/}
               {/*     totalItemsCount={450}*/}
               {/*     pageRangeDisplayed={2}*/}
               {/*     onChange={this.handlePageChange}*/}
               {/* />*/}
               {/*</div>*/}
                <Pagination
                    boundaryRange={0}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={10}
                />
                        {/*<Pagination className="d-flex justify-content-center"*/}
                        {/*           */}
                        {/*>*/}
                        {/*    <PaginationItem>*/}
                        {/*        <PaginationLink first href="#" />*/}
                        {/*    </PaginationItem>*/}
                        {/*    <PaginationItem>*/}
                        {/*        <PaginationLink previous href="#" />*/}
                        {/*    </PaginationItem>*/}
                        {/*    <PaginationItem>*/}
                        {/*        <PaginationLink href="#">*/}
                        {/*            1*/}
                        {/*        </PaginationLink>*/}
                        {/*    </PaginationItem>*/}
                        {/*    <PaginationItem>*/}
                        {/*        <PaginationLink href="#">*/}
                        {/*            2*/}
                        {/*        </PaginationLink>*/}
                        {/*    </PaginationItem>*/}
                        {/*    <PaginationItem>*/}
                        {/*        <PaginationLink href="#">*/}
                        {/*            3*/}
                        {/*        </PaginationLink>*/}
                        {/*    </PaginationItem>*/}
                        {/*    <PaginationItem>*/}
                        {/*        <PaginationLink href="#">*/}
                        {/*            4*/}
                        {/*        </PaginationLink>*/}
                        {/*    </PaginationItem>*/}
                        {/*    <PaginationItem>*/}
                        {/*        <PaginationLink href="#">*/}
                        {/*            5*/}
                        {/*        </PaginationLink>*/}
                        {/*    </PaginationItem>*/}
                        {/*    <PaginationItem>*/}
                        {/*        <PaginationLink href="#">*/}
                        {/*            6*/}
                        {/*        </PaginationLink>*/}
                        {/*    </PaginationItem>*/}
                        {/*    <PaginationItem>*/}
                        {/*        <PaginationLink next href="#" />*/}
                        {/*    </PaginationItem>*/}
                        {/*    <PaginationItem>*/}
                        {/*        <PaginationLink last href="#" />*/}
                        {/*    </PnaginationItem>*/}
                        {/*</Pagination>*/}
               <Col> 
                {
                    this.state.items.length!==0 ?(
                    this.state.items.map((item,index)=>
                    <SearchResultItem item = {item} key = {index} />)
                    ):
                    <div className="mt-5"><p>Sorry, no results could match your search.</p></div>
                }
                </Col>

            </Container>

        );
    }

}


export default withRouter(Search);

