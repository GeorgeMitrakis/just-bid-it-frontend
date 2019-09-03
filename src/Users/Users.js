import React from 'react';
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsersView from './UsersView';
import UserRequestData from '../UserRequest/UserRequestData';

class Users extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users:[]
        }
    }
    
    addUsersHandler = (users) => {
        this.setState({users:users});
    }

    render(){
        return(
            <Router>
                <Switch>
                    {this.state.users.map((user,index) =>{
                            return(
                                <Route
                                    key={index}
                                    path={"/admin/users/"+user.username}
                                    exact
                                    render={()=>(<UserRequestData user={user}/>)}
                                />
                            )
                        })
                    }    
                    <Route 
                        path="/admin/users"
                        render={()=>(<UsersView users={this.addUsersHandler}/>)}
                    />                    
                </Switch>
            </Router>       
        )
    }

}

export default withRouter(Users)