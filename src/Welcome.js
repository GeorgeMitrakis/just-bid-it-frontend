import React from 'react';
import { withRouter } from 'react-router-dom';
import logo from './logo.svg';
import { Row, Col, Button } from 'reactstrap';
import { getUserInfoField } from './Utility';
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
                <body className="App-body">
                    <Row className="d-flex justify-content-center">
                        Hello dear 
                        {' ' + (getUserInfoField("username") ? getUserInfoField("username") : "guest")}
                        , welcome to JustBidIt
                    </Row>
                    <br/>
                    <Row className="d-flex justify-content-center">
                        <Col className="d-flex justify-content-end">
                            <Button color="info" onClick={() => this.redirectHandler("/signup")}>
                                Sign up
                            </Button>
                        </Col>
                        <Col className="d-flex justify-content-start">
                            <Button color="info" onClick={() => this.redirectHandler("/login")}>
                                Sign in
                            </Button>
                        </Col>                        
                    </Row>
                    <br/>
                    <Row >
                        <Col className="d-flex justify-content-center">
                            <Button color="info" onClick={() => this.redirectHandler("/search")}>
                                Search
                            </Button>
                        </Col>
                    </Row>     
                </body>
            </div>
        )
    }
}

export default withRouter(Welcome);