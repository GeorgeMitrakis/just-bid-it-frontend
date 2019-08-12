import React from 'react';
import Mycmp from './Mycmp';
import { Route, BrowserRouter as Router, Redirect, withRouter, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Welcome from './Welcome';

class App extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
		<div className="App">
			<Router>
				<Switch>
					<Route path={["/", "/welcome"]} exact component={Welcome}/>
					<Route path="/home" exact component={Home}/>
					<Route path="/login" exact component={Login}/>
					<Route path="/signup" exact component={Signup}/>
					<Redirect to="/"/>
				</Switch>
			</Router>
		</div>
	);}
}

export default App;
