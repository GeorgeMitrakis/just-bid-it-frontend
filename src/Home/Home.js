import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import $ from 'jquery';

class Home extends React.Component{

    constructor (props) {
        super(props);
    }

    componentDidMount(){
        $.ajax({
            url: "http://localhost:8765/app/api/hello",
            dataType: 'json',
            type: 'PUT',
            data: {}
        })
        .then(json => {
            console.log(json)
        })
        .fail(err=>{
            console.log(err)
        })
    }

    redirectHandler = (url) => {
        this.props.history.push(url);
    }


        render(){
        return(
            <div>
                <br/>
                <Row className="d-flex justify-content-center">
                    <Col>
                        <Row className="d-flex justify-content-center">
                        <h2>About us</h2>
                        </Row>
                        <br/>
                        <Row className="d-flex justify-content-center">
                        <h3>What is JBI?</h3>
                        </Row>
                        <Row className="d-flex justify-content-center">

                            <h5> JBI is a free online auction marketplace offering local trade with no fees for bidding, buying, or selling!<br/>
                            {/*You can turn your unwanted stuff into cash, and get the best possible deals .<br/>*/}
                                Whether you're a serious collector or casual treasure hunter, JBI.com is the place to find that special item<br/>
                                you've been looking for in the best possible deal!
                            </h5>
                            <br/>


                        </Row>
                        <br/>
                        <Row className="d-flex justify-content-center">
                            <h3>Why an online auction?</h3>
                        </Row>
                        <Row className="d-flex justify-content-center">

                            <h5>
                                Online auctions allow people to bid for items online at the same time. <br/>
                                You can access auctions around the world and get in on all the action, right from your own computer.<br/>
                                Ready to start bidding?

                            </h5>
                            <br/>
                        </Row>

                        <br/>
                        <br/>
                    </Col>
                </Row>
                <hr/>
                <Row className= "d-flex justify-content-center" style={{marginTop:'60px'}}>

                    <>
                    <Col >
                        <h3>Are you an Auctioneer?</h3>
                        <h5> Navigate through your auctions! </h5> <br/>
                        <Button type="button" color="muted" className="btn btn-outline-secondary" onClick={() => this.redirectHandler("/items")}>
                        My Auctions
                    </Button>
                    </Col>

                    <Col>
                        <h3>Are you a Bidder?</h3>
                        <h5> Start bidding now!</h5><br/>
                        <Button type="button" color="muted" className="btn btn-outline-secondary" onClick={() => this.redirectHandler("/search")}>
                            Search
                        </Button>
                    </Col>
                    </>
                </Row>
                <br/>
            </div>
        )
    }
}

export default withRouter(Home);
