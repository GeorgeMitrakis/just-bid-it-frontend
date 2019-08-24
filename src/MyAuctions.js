import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Container} from 'reactstrap';
import $ from 'jquery';

class MyAuctions extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            items:[]
        }
    }

    // componentDidMount(){
    //     console.log("WARNING [MyAuctions.js]");
    //     console.log("-----------------------");
    //     console.log("sending request with dummy userId");
    //     console.log("-----------------------");

    //     $.ajax({
    //         url: "http://localhost:8765/app/api/items",
    //         dataType : 'json',
    //         type: 'GET',
    //         data: {userId:9}
    //     })
    //     .then(json => {
    //         console.log(json) 
    //         this.setState({items:json.results})           
    //     })
    //     .fail(err=>{
    //         console.log(err);
    //     })
    // }
    render(){
        return(
            <Container className="mt-3">
                <Col>
                    <Row className="mb-3 d-flex justify-content-center">
                        <Button onClick={()=>this.props.history.push("/items/new")}>Create new auction</Button>
                    </Row>
                    {this.state.items.length === 0 ?
                        (<p className="mt-5">loading...</p>):                            
                        this.state.items.map((item, index) => {
                        return(
                            <Row className="d-flex justify-content-center" key={index} item={item}>{item.name}</Row>
                        );
                    })}
                </Col>
            </Container>
        )
    }
}

export default withRouter(MyAuctions);