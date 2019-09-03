import React from 'react';
import { withRouter , Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import {Table} from 'reactstrap';
import UserRequestData from '../UserRequest/UserRequestData';
import $ from "jquery";


class UsersView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            users:[]
        }
    }
    componentDidMount(){
        this.showUsers();
    }

    showUsers(){
        $.ajax({
            url: "http://localhost:8765/app/api/admin/users",
            dataType: 'json',
            type: 'GET'

        })
        .then(json => {
            console.log("Search Ajax success!");
            console.log(json)
            this.setState({users:json.users})
            this.props.users(json.users);
            console.log("Search Ajax end");
        })
        .fail(err=>{
            console.log(err)
        })
    }


    render(){
        return(
            <div>
                <h2 className="text-center">User Details</h2>
                <Table className="table table-striped">
                    <thead>
                    <tr>
                        <th className="hidden">User id</th>
                        <th>UserName</th>
                        <th>Status</th>
                        <th>Seller rating</th>
                        <th>Bidder rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((user,index) =>{
                        return(<tr key={index}>
                            <td>{user.id}</td>
                            <td>
                                <a href={"/admin/users/"+user.username} >{user.username}</a>
                            </td>
                            <td>{user.access}</td>
                            <td>{user.sellerRating}</td>
                            <td>{user.bidderRating}</td>
                        </tr>)
                    })
                    }

                    </tbody>

                </Table>
            </div>
        );
    }

}







export default withRouter(UsersView);