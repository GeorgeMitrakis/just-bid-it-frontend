 import React from 'react';
import { withRouter } from 'react-router-dom';
import {Col,Row} from "reactstrap";
import './search.css';
 import produce from 'immer';
 import $ from "jquery";



class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            searchterm : '',
            categoryvalue : ''

        }
    }

    inputChangedHandler(event) {
        event.persist();
        event.preventDefault();
        console.log(event.target.value);
        let v = event.target.value;
        this.setState(
            produce(draft=>{
                draft.categoryvalue= v;
            })
        )
        $.ajax({
            url: "http://localhost:8765/app/api/categories",
            dataType: 'json',
            type: 'GET',
            data: {
               category: this.state.categoryvalue
            }
        })
            .then(json => {
                console.log(json)
            })
            .fail(err=>{
                console.log(err)
            })

    }

    render() {

        return (
            <div className="filter-list">
                <form>
                   <Row>
                       <Col xs="6" sm="4"></Col>
                       <fieldset>
                        <input type="text" className="form-control form-control-lg" placeholder="Enter your text here.." />
                    </fieldset>
                    <fieldset>
                        <input type= "text" className="form-control form-control-lg" placeholder="Categories" value={this.state.categoryvalue} onChange={(event)=> this.inputChangedHandler(event)}/>
                    </fieldset>
                       <button type="submit" className="btn float-right">SEARCH</button>

                   </Row>
                </form>
            </div>
        );
    }

}


export default withRouter(Search);

