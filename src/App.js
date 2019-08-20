import React from 'react';
import Mycmp from './Mycmp';
import { Route, BrowserRouter as Router, Redirect, withRouter, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Logout from './Logout';
import Welcome from './Welcome';
import UnderConstruction from './UnderConstruction';

import { getUserInfoField } from './Utility';
import { getUserInfo } from './Utility';

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
				<Route path="/items" exact component={UnderConstruction}/>
				{/* additional dynamic routes: /items/{id} , /items/{id}/bid , items/{id}/buy */}
				<Route path="/bids" exact component={UnderConstruction}/>
				<Route path="/search" exact component={UnderConstruction}/>
				<Route path="/messages" exact component={UnderConstruction}/>
				<Route path="/messages/sent" exact component={UnderConstruction}/>
				<Route path="/messages/received" exact component={UnderConstruction}/>
				{/* additional dynamic routes: /messages/{id} , /messages/{username} , /messages/{username}/send */}
				<Redirect to="/"/>
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
				<Route path="/search" exact component={UnderConstruction}/>
				<Route path="/admin/users" exact component={UnderConstruction}/>
				{/*  additional dynamic routes: /admin/users/{username} */}
				<Redirect to="/"/>
			</Switch>
		)
	}

	guestRoutes = () => {
		//routes of registered common user with pending or denied access, or guest
		return(
			<Switch>
				<Route path={["/", "/welcome"]} exact component={Welcome}/>
				<Route path="/home" exact component={Home}/>
				<Route path="/login" exact render={() => (<Login logInHandler={this.logInHandler} role={this.state.role}/>)}/>
				<Route path="/signup" exact render={() => (<Signup logInHandler={this.logInHandler}/>)}/>
				<Route path="/search" exact component={UnderConstruction}/>
				{/* additional dynamic routes: /items/{id} */}
				<Redirect to="/"/>
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
		}
		else{
			return this.guestRoutes();
		}
	}

	render(){

		return (
			<div className="App">
				<Router>
					{this.userRoutes()}
				</Router>
			</div>
	);}
}

export default App;
