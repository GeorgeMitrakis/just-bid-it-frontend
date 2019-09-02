import React from 'react';
import { withRouter } from 'react-router-dom';
//import logo from './logo.svg';
import { Row, Col, Button } from 'reactstrap';
import { getUserInfoField } from '../Utility/Utility';
//import { getUserInfo } from './Utility';


class Welcome extends React.Component{
    // constructor(props){
    //     super(props);
    // }

    redirectHandler = (url) => {
        this.props.history.push(url);
    }

    render(){
        return(
            <div>
                <Row className="d-flex justify-content-center">
                    <p>
                        Hello dear 
                        {' ' + (getUserInfoField("username") ? getUserInfoField("username") : "guest")}
                        , welcome to JustBidIt
                    </p>
                </Row>
                <br/>
                <Row className="d-flex justify-content-around">
                    <Col>
                        <Button  onClick={() => this.redirectHandler("/signup")}>
                            Sign up
                        </Button>
                    </Col>
                    <Col>
                        <Button  onClick={() => this.redirectHandler("/login")}>
                            Login
                        </Button>
                    </Col> 
                    <Col>
                        <Button  onClick={() => this.redirectHandler("/search")}>
                            Search
                        </Button>
                    </Col>
                </Row>     
            </div>
        )
    }
}

export default withRouter(Welcome);