import React from 'react';
import { withRouter } from 'react-router-dom';
import {Col, Container} from "reactstrap";
import styles from './Search.module.css';
import $ from "jquery";
import SearchResultItem from './SearchResultItem';
import SearchBar from './SearchBar';
import { Pagination,Form, Container as Cont } from 'semantic-ui-react';
import Row from "reactstrap/es/Row";
import {myinpt} from "./Search.module.css"

class Search extends React.Component {
    constructor(props) {
        super(props);

        //this.popupRef = React.createRef();
        this.state = {
            limit: 10,
            activePage: 1,
            items : [],
            requestValues:{}
        }
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage }, ()=>this.searchItems(this.state.requestValues))
    handleInputChange = (e, { name, value }) => this.setState({ [name]: value },()=>this.searchItems(this.state.requestValues))


    componentDidMount(){
        let data = {};
        this.searchItems(data);
    }


    searchHandler(data){
        this.setState({requestValues: data}, ()=>this.searchItems(data));
    }

    searchItems(data){

        data = Object.assign(data, {page_number:this.state.activePage}, {page_size: this.state.limit});

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
               <SearchBar searchHandler={(data)=>this.searchHandler(data)}/>

                <Row className="d-flex justify-content-center">

                <Cont>
                <Pagination
                    activePage={this.state.activePage}
                    onPageChange={this.handlePaginationChange}
                    boundaryRange={0}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={10}
                />
                </Cont>
                    {/*<Form.Input*/}
                    {/*    style={{width:'50px'}}*/}
                    {/*    name = 'activePage'*/}
                    {/*    min={1}*/}
                    {/*    onChange={this.handleInputChange}*/}
                    {/*    type='number'*/}
                    {/*    value={this.state.activePage}*/}
                    {/*/>*/}
                </Row>
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

