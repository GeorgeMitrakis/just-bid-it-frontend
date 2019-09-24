import React from 'react';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';
import {
    Button,
    Card,
    CardText,
    CardTitle,
    Col,
    Collapse, Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent, Table,
    TabPane, 
    Alert
} from "reactstrap";
import {bidcard, infoRow, itemTextArea, pairInput, pairButton, buy, bid} from './SearchResultItem.module.css';
import $ from "jquery";
import {getUserInfo, getUserInfoField} from "../Utility/Utility";
import Map from '../Map/Map';
import Marker from '../Map/Marker';
import styles from './SearchResultItem.module.css';
import produce from 'immer';

class SearchResultItem extends React.Component{

    constructor(props){

        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            bid : this.props.item.currentBid + 0.5 ,
            collapse: false ,
            activeTab: '1',
            alert:{
                visible:false,
                message:'',
                type:''
            }
        }
    }

    // componentDidMount(){
    //     console.log(this.props.item);
    //     this.setState({bid : this.props.currentBid + 0.5 });
    // }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    togglefunc(tab){

        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    inputChangeHandler(event) {
        event.persist();
        event.preventDefault();
        console.log(event.target.value);
        let v = event.target.value;
        this.setState({bid:v} )

    }

    bidHandler(){
        console.log("creep");

        if(getUserInfo()===null || getUserInfo()===undefined){
            this.setState(
                produce(draft=>{
                    draft.alert.visible = true;
                    draft.alert.message = 'You must be logged-in to perform this action.';
                    draft.alert.type = 'danger';
                })
            )
            return;
        }

        if(getUserInfoField("access")!=="granted"){
            this.setState(
                produce(draft=>{
                    draft.alert.visible = true;
                    draft.alert.message = 'Your account must be activated by the admin to perform this action.';
                    draft.alert.type = 'danger';
                })
            )
            return;
        }

        if(this.props.item.running === false){
            this.setState(
                produce(draft=>{
                    draft.alert.visible = true;
                    draft.alert.message = 'Auction has ended.';
                    draft.alert.type = 'danger';
                })
            )
            return;
        }

        if(!window.confirm(`Are you sure you want to bid on this item? You can't undo this action `)) return;
        $.ajax({
            url: "http://localhost:8765/app/api/items/"+this.props.item.id+"/bid",
            dataType: 'json',
            type: 'POST',
            data: {
                bidder_id: getUserInfoField("id"),
                amount: this.state.bid
            }

        })
        .then(json => {
            console.log(json)
            this.setState(
                produce(draft=>{
                    draft.bid = json.item.currentBid + 0.5;
                    draft.alert.visible = true;
                    draft.alert.message = 'Bid successful';
                    draft.alert.type = 'success';
                })
            )
        })
        .fail(err=>{
            console.log(err)
        })

    }

    onDismiss(){
        this.setState(
            produce(draft=>{
                draft.alert.visible = false;
            })
        )
    }

    buyHandler(){
        console.log("creep");
        console.log(this.props.item);
        console.log( getUserInfoField("id"));
        console.log(getUserInfo());

        if(this.props.item.running === false){
            this.setState(
                produce(draft=>{
                    draft.alert.visible = true;
                    draft.alert.message = 'Auction has ended.';
                    draft.alert.type = 'danger';
                })
            )
            return;
        }

        if(getUserInfo()===null || getUserInfo()===undefined){
            this.setState(
                produce(draft=>{
                    draft.alert.visible = true;
                    draft.alert.message = 'You must be logged-in to perform this action.';
                    draft.alert.type = 'danger';
                })
            )
            return;
        }


        if(getUserInfoField("access")!=="granted"){
            this.setState(
                produce(draft=>{
                    draft.alert.visible = true;
                    draft.alert.message = 'Your account must be activated by the admin to perform this action.';
                    draft.alert.type = 'danger';
                })
            )
            return;
        }
        

        if(this.props.item.buyPrice === null){
            this.setState(
                produce(draft=>{
                    draft.alert.visible = true;
                    draft.alert.message = 'Item has no buy price';
                    draft.alert.type = 'danger';
                })
            )
            return;
        }

        $.ajax({
            url: "http://localhost:8765/app/api/items/"+this.props.item.id+"/buy",
            dataType: 'json',
            type: 'POST',
            data: {
                bidder_id: getUserInfoField("id")
            }
        })
        .then(json => {
            console.log(json)
            this.props.history.push("/messages/option/"+this.props.item.seller.username)

        })
        .fail(err=>{
            console.log(err)
        })
    }

    componentDidMount(){
        console.log(this.props);
    }

    render() {
        let hasCoords = false;
        if(this.props.item.location.latitude !== 0 && this.props.item.location.longitude !== 0){
            hasCoords = true;
        }
        let bidcardStyle = styles.bidcard;
        if(this.props.item.running === false){
            bidcardStyle =  styles.closed;
        }
        return(
            <div>
                <Alert color={this.state.alert.type} className={styles.alert} isOpen={this.state.alert.visible} toggle={()=>this.onDismiss()}>
                    {this.state.alert.message}
                </Alert>
                <Card className={bidcardStyle}>
                    <Col>
                        <br/>
                        <Row className={infoRow}>
                            <h4>
                                {this.props.item.name }
                            </h4>
                        </Row>
                        <hr/>
                        <br/>
                        <Row className={infoRow}>
                            <span className={itemTextArea}>
                                by {this.props.item.seller.username}
                            </span>
                        </Row>
                        <br/>
                        <Row className={infoRow}>
                            <span className={itemTextArea}>
                                { (this.props.item.running===true) ?
                                     "Auction ends at : "+this.props.item.end
                                     :
                                     "Auction has ended."
                                     }
                            </span>
                            <span>
                                {"$ "}<input className={buy+" "+pairInput} type="number" step="0.5" readOnly value={this.props.item.buyPrice}/>
                                <button  type="button" color="muted" className={"btn btn-outline-secondary "+pairButton}  onClick={()=>this.buyHandler()}>Buy</button>
                            </span>
                        </Row>
                        <br/>
                        <Row className={infoRow}>
                            <span  className={itemTextArea}>
                                Highest Bid : $ {this.props.item.currentBid} by username (bidder review: 3/5)
                            </span>
                            <span>
                                {"$ "}<input className={bid+" "+ pairInput} type="number" step="0.5" min={this.props.item.currentBid+0.5} value={this.state.bid} onChange={(event)=> this.inputChangeHandler(event)}/>
                                <button type="button" color="muted" className={"btn btn-outline-secondary "+pairButton} onClick={()=>this.bidHandler()} > Bid</button>
                            </span>
                        </Row>
                        <br/>
                        <Row className={infoRow}>
                            <span  className={itemTextArea}>
                                Location : {this.props.item.location.name}
                            </span>
                        </Row>
                        <br/>
                        {/*<Row className={infoRow}>*/}
                        {/*    <span  className={itemTextArea}>*/}
                        {/*        Description : {this.props.item.description}*/}
                        {/*    </span>*/}
                        {/*</Row>*/}
                        {/*<br/>*/}
                        <Row className="d-flex justify-content-lg-end">
                            <Button outline color="secondary" onClick={this.toggle}>Details</Button>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Collapse isOpen={this.state.collapse}>

                                    <Nav tabs className="d-flex justify-content-center">
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.togglefunc('1'); }}
                                            >
                                                Auction details
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.togglefunc('2'); }}
                                            >
                                                Location
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col>
                                                    <Card body className="d-flex justify-content-start" style ={{width:'690px'}} >
                                                        <Col>
                                                                <Row><h4>Description:</h4></Row>
                                                                <Row>{this.props.item.description}</Row>
                                                        </Col>

                                                        <Col >
                                                            <Row> <h4>Categories: </h4></Row>
                                                                {this.props.item.categories.map((category,index) =>{
                                                                    return(
                                                                        <Row key={index}>{category}</Row>
                                                                    )}
                                                                )}
                                                        </Col>
                                                        <br/>
                                                        <Col >
                                                            <Row> First bid is: <input type="number" readOnly value={this.props.item.firstBid}/> </Row>
                                                            <Row>Auction started at: {this.props.item.start}</Row>
                                                        </Col>
                                                    </Card>
                                                </Col>

                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row className="d-flex justify-content-center" >
                                                <Col>
                                                    <Row>
                                                        <Card body>
                                                        <Col>
                                                            <CardText>Location: {this.props.item.location.name}</CardText>
                                                        </Col>
                                                            <Col>
                                                            <CardText>Country:{this.props.item.country}</CardText>
                                                        </Col>
                                                        </Card>
                                                    </Row>
                                                    {hasCoords === true &&
                                                    <Row>
                                                        <Card body>
                                                            <Col>
                                                            {this.state.activeTab==='2' &&
                                                                <Map 
                                                                    className = {styles.showmap} 
                                                                    zoom = {15}
                                                                    minZoom={13}
                                                                    maxZoom={17}
                                                                    position={[this.props.item.location.latitude, this.props.item.location.longitude]}
                                                                    coordsHandler={(event)=>console.log(event)}
                                                                >
                                                                    <Marker position={[this.props.item.location.latitude, this.props.item.location.longitude]} />
                                                                </Map>}
                                                            </Col>
                                                        </Card>
                                                    </Row>}
                                                </Col>
                                            </Row>
                                    </TabPane>
                                </TabContent>
                            </Collapse>
                        </Row>
                    </Col>

                </Card>
            </div>
        );
    }
}

export default withRouter(SearchResultItem);