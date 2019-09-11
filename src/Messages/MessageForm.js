import React from 'react';
import {withRouter} from 'react-router-dom';
import CardTitle from "reactstrap/es/CardTitle";
import {Card, Col, Row, Table} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";


class MessageForm extends React.Component{




    render() {
        return(
            <Card>
                <br/>
                <CardTitle className= "d-flex justify-content-center"> <h3>New Message</h3> </CardTitle>
                <CardBody>

                </CardBody>
            </Card>

        )
    }

}
export default withRouter(MessageForm);