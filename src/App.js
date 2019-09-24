import React from 'react';
import { Route, BrowserRouter as Router, Switch  } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from './Home/Home';
import Logout from './Logout/Logout';
import Welcome from './Welcome/Welcome';
import UnderConstruction from './UnderConstruction';
import AuctionsList from './MyAuctions/AuctionsList';
import NewAuction from './MyAuctions/NewAuction';
import AuctionsPage from './MyAuctions/AuctionsPage';
import Header from './Header/Header';
//import Map from './Map';
//import UserRequestData from './UserRequest/UserRequestData';
import Map from './Map/Map';
import NotFound from './NotFound';
import Search from "./Search/Search";
import Users from "./Users/Users";
import OwnerAuctionItem from "./MyAuctions/OwnerAuctionItem";
import { getUserInfoField } from './Utility/Utility';
import {Row} from "reactstrap";
import MessageForm from "./Messages/MessageForm";
import MessagesSent from "./Messages/MessagesSent";
import MessagesReceived from "./Messages/MessagesReceived";
import MessageOption from "./Messages/MessageOption";
//import { getUserInfo } from './Utility';
class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			access: getUserInfoField("access"),
			//access values: "granted", "pending", "denied", null
			role: getUserInfoField("role") ? getUserInfoField("role") : "guest"
			//role values: "administrator", "common user", "guest"
		}
	}

	logInHandler = (data) => {
		console.log("logInHandler: took the following data");
		console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        
        this.setState({
			access: data.access,
			role: data.role
		});

        //this.props.history.replace("/");
	}
	
	logOutHandler = () => {
        localStorage.removeItem('userInfo');

        this.setState({
			access: "denied",
			role: "guest"
		});

        //this.props.history.goBack();
	}

	commonUserRoutes = () => {
		//routes of registered common user with granted access
		return(
			<Switch>
				<Route path={["/", "/welcome"]} exact component={Welcome}/>
				<Route path="/home" exact component={Home}/>
				<Route path="/login" exact render={() => (<Login logInHandler={this.logInHandler} access={this.state.access} role={this.state.role}/>)}/>
				<Route path="/logout" exact render={() =>(<Logout logOutHandler={this.logOutHandler}/>)}/>
				<Route path="/items/new" exact component={NewAuction}/>
				<Route path="/items" component={AuctionsPage}/>
				<Route path="/ownerauctionitem" exact component = {OwnerAuctionItem}/>
				{/* additional dynamic routes: /items/{id} , /items/{id}/bid , items/{id}/buy */}
				<Route path="/bids" exact component={UnderConstruction}/>
				<Route path="/search" exact component={Search}/>
				{/*<Route path="/messages" exact component={MessageForm}/>*/}
				<Route path="/messages/sent" exact component={MessagesSent}/>
				<Route path="/messages/received" exact component={MessagesReceived}/>
				<Route path="/messages/new" component={MessageForm}/>
				<Route path="/messages/option"  component={MessageOption}/>
				<Route path="/map" exact component={Map}/>
				{/* additional dynamic routes: /messages/{id} , /messages/{username} , /messages/{username}/send */}
				<Route component={NotFound}/>
			</Switch>
		)
	}

	unregisteredUserRoutes = () => {
		//routes of registered common user with granted access
		return(
			<Switch>
				<Route path={["/", "/welcome"]} exact component={Welcome}/>
				<Route path="/home" exact component={Home}/>
				<Route path="/login" exact render={() => (<Login logInHandler={this.logInHandler} access={this.state.access} role={this.state.role}/>)}/>
				<Route path="/logout" exact render={() =>(<Logout logOutHandler={this.logOutHandler}/>)}/>
				<Route path="/search" exact component={Search}/>
				<Route path="/map" exact component={Map}/>
				<Route component={NotFound}/>
			</Switch>
		)
	}

	adminRoutes = () => {
		return(
			<Switch>
				<Route path={["/", "/welcome"]} exact component={Welcome}/>
				<Route path="/home" exact component={Home}/>
				<Route path="/login" exact render={() => (<Login logInHandler={this.logInHandler} access={this.state.access} role={this.state.role}/>)}/>
				<Route path="/logout" exact render={() => (<Logout logOutHandler={this.logOutHandler}/>)}/>
				<Route path="/search" exact component={Search}/>
				<Route path="/admin/users" component={Users}/>
				{/*  additional dynamic routes: /admin/users/{username} */}
				<Route path="/map" exact component={Map}/>
				<Route component={NotFound}/>
			</Switch>
		)
	}

	guestRoutes = () => {
		//routes of registered common user with pending or denied access, or guest
		return(
			<Switch>
				<Route path={["/", "/welcome"]} exact component={Welcome}/>
				{/*<Route path="/home" exact component={Home}/>*/}
				<Route path="/login" exact render={() => (<Login logInHandler={this.logInHandler} role={this.state.role}/>)}/>
				<Route path="/signup" exact render={() => (<Signup logInHandler={this.logInHandler}/>)}/>
				<Route path="/search" exact component={Search}/>
				{/*<Route path="/map" exact component={Map}/>*/}
				<Route component={NotFound}/>
			</Switch>
		)
	}

	userRoutes = () => {
		if(!this.state.access || this.state.role === "guest"){
			return this.guestRoutes();
		}
		else if(this.state.role === "administrator"){
			return this.adminRoutes();
		}
		else if(this.state.role === "common user" && this.state.access === "granted"){
			return this.commonUserRoutes();

		}else if(this.state.role === "common user" && this.state.access !== "granted"){
			return this.unregisteredUserRoutes();
		}
		else{
			return this.guestRoutes();
		}
	}

	render(){

		return (
			<div className="App">
				<Header role={this.state.role} access={this.state.access}/>
                <Row className="justify-content-center">
                    <h1>JUST BID IT</h1>
                </Row>
				<Router>
					{this.userRoutes()}
				</Router>
			</div>
	);}
}

export default App;
