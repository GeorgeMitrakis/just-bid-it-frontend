 import React from 'react';
import { withRouter } from 'react-router-dom';
import {Col,Row} from "reactstrap";
import './search.css';
 import produce from 'immer';



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
        event.preventDefault();
        console.log(event);
        let v = event.target.value;
        this.setState(
            produce(draft=>{
                draft.categoryvalue= v;
            })
        )    }

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

