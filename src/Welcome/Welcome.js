import React from 'react';
import { withRouter } from 'react-router-dom';
//import logo from './logo.svg';
import { Row, Col, Button } from 'reactstrap';
import { getUserInfoField } from '../Utility/Utility';
//import { getUserInfo } from './Utility';
import {Carousel,CarouselItem,CarouselControl,CarouselIndicators,CarouselCaption} from 'reactstrap';
const items = [
    {
        src: 'https://s28771.pcdn.co/wp-content/uploads/2014/12/light-grey-background-05.jpg',
        altText: 'Sign up for free!',
        caption: 'SIGN UP FOR FREE!'
    },
    {
        src: 'https://s28771.pcdn.co/wp-content/uploads/2014/12/light-grey-background-05.jpg',
        altText: 'Slide 2',
        caption: 'ALREADY A MEMBER?LOG IN!'
    },
    {
        src: 'https://s28771.pcdn.co/wp-content/uploads/2014/12/light-grey-background-05.jpg',
        altText: 'Slide 3',
        caption: 'OR SEARCH FOR AUCTIONS'
    }
];
class Welcome extends React.Component{
    constructor(props){
       super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

     }
    redirectHandler = (url) => {
        this.props.history.push(url);
    }
    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }
    render(){
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });
        return(
            <div>
                <Row className="d-flex justify-content-center">
                    <h4>
                        Hello dear 
                        {' ' + (getUserInfoField("username") ? getUserInfoField("username") : "guest")}
                        , Welcome to our website!
                    </h4>
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
                <div>
                    <Carousel
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                    >
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl  direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl  direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default withRouter(Welcome);