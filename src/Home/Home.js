import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button , Container } from 'reactstrap';
import  './Home.css';
import $ from 'jquery';

// const imgUrls = [
//     "https://cmeimg-a.akamaihd.net/640/clsd/getty/c64f76dc20c246ca88ee180fe4b4b781",
//     "https://lh3.googleusercontent.com/oxPeODS2m6rYIVbhcQChRtOWEYeGDwbeeeB1cDU2o_WYAVPU61VIgx-_6BAh5gSL8Sw=h900",
//     "https://i0.wp.com/www.universodegatos.com/wp-content/uploads/2017/04/fivfelv7.jpg?resize=582%2C328",
//     "https://i.pinimg.com/736x/07/c3/45/07c345d0eca11d0bc97c894751ba1b46.jpg",
//     "https://ehealthforum.com/health/images/avatars/11699147425707699031013.jpeg"
// ];


class Home extends React.Component{

    constructor (props) {
        super(props);

        // this.state = {
        //     currentImageIndex: 0
        // };
        //
        // this.nextSlide = this.nextSlide.bind(this);
        // this.previousSlide = this.previousSlide.bind(this);
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

    // previousSlide () {
    //     const lastIndex = imgUrls.length - 1;
    //     const { currentImageIndex } = this.state;
    //     const shouldResetIndex = currentImageIndex === 0;
    //     const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
    //
    //     this.setState({
    //         currentImageIndex: index
    //     });
    // }

    // nextSlide () {
    //     const lastIndex = imgUrls.length - 1;
    //     const { currentImageIndex } = this.state;
    //     const shouldResetIndex = currentImageIndex === lastIndex;
    //     const index =  shouldResetIndex ? 0 : currentImageIndex + 1;
    //
    //     this.setState({
    //         currentImageIndex: index
    //     });
    // }

        render(){
        return(
            <div>
                <br/>
                <Row className="d-flex justify-content-around">
                    <Col>
                        <Row className="d-flex justify-content-around" style={{marginRight:'500px'}}>
                        <h2>About US</h2>
                        </Row>
                        <br/>
                        <Row className="d-flex justify-content-around" style={{marginRight:'500px'}}>
                        <h3>What is JBI?</h3>
                        </Row>
                        <Row className="d-flex justify-content-around">

                            <h5> JBI is a free online auction marketplace offering local trade with no fees for bidding, buying, or selling!<br/>
                            You can turn your unwanted stuff into cash, and get the best possible deals for new or used things.
                            </h5>
                        </Row>
                        <br/>
                        <Row className="d-flex justify-content-around">
                            <h5> Whether you're a serious collector or casual treasure hunter, JBI.com is the place to find that special item you've been looking for. <br/>
                                Ready to start bidding?
                            </h5>
                        </Row>
                        <br/>
                        <br/>


                        {/*<h4> Navigate between over 500 auctions! </h4>*/}

                    </Col>
                </Row>
                <Row className= "d-flex justify-content-center" style={{marginTop:'100px'}}>

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
                {/*<div className="carousel">*/}
                {/*    <Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" />*/}
                {/*    <ImageSlide url={ imgUrls[this.state.currentImageIndex] } />*/}
                {/*    <Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;"/>*/}
                {/*</div>*/}
            </div>
        )
    }
}
const Arrow = ({ direction, clickFunction, glyph }) => (
    <div
        className={ `slide-arrow ${direction}` }
        onClick={ clickFunction }>
        { glyph }
    </div>
);

const ImageSlide = ({ url }) => {
    const styles = {
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    return (
        <div className="image-slide" style={styles}></div>
    );
}
export default withRouter(Home);
