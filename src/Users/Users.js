import React from 'react';
import { withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
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
            <div>
                <Router>
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
                </Router>
                <UsersView users={this.addUsersHandler}/>
            </div>
        )
    }

}

export default withRouter(Users)