import React from 'react';
import './Header.css';
import logo from '../images/bid1.jpg';
import {Navbar}from 'reactstrap';
import { getUserInfo, getUserInfoField } from '../Utility/Utility';

class Header extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            displayMenu: false,
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

    };

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    unregisteredUserOptions = () => {
        return(
            <ul>
                <li><a href="/logout">Logout</a></li>
            </ul>
        );
    }
    commonUserOptions = () =>{
        return(
            <ul>
                <li><a href="/bids">My Bids</a></li>
                <li><a href="/items">My Auctions</a></li>
                <li><a href="/messages">Messages</a></li>
                <li><a href="/logout">Logout</a></li>
            </ul>
        );
    }

    adminOptions = () =>{
        return(
            <ul>
                <li><a href="/admin/users">Users</a></li>
                <li><a href="#">Export items in XML</a></li>
                <li><a href="#">Export items in JSON</a></li>
                <li><a href="/logout">Logout</a></li>
            </ul>
        );
    }

    userOptions = () =>{
        if(this.props.role === "common user" && this.props.access === "granted"){
            return this.commonUserOptions();
        }
        else if(this.props.role === "common user"){
            return this.unregisteredUserOptions();
        }
        else if(this.props.role === "administrator"){
            return this.adminOptions();
        }
        else{
            return null;
        }
    }

    render() {
        return (
        <div className="navbar-style">
            <Navbar className="bg-light d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                    <a href="/home">
                        <img src={logo} style={{width: 100, height: 62} } className="img-fluid img-thumbnail"/>
                    </a>
                </div>
                { getUserInfo() ? (
                    <div>
                        Welcome dear {" "+getUserInfoField("username")+" "}
                        <div className="dropdown" style = {{width:"150px"}} >
                            <div className="button" onClick={this.showDropdownMenu}> Profile </div>
                            { this.state.displayMenu ? (
                                <div>
                                    {this.userOptions()}
                                </div>
                                ):
                                null
                            }
                        </div>
                    </div>):
                    null
                }
            </Navbar>
        </div>
        );
    }
}

export default Header;
