import React from 'react';
import './Header.css';
import Logo from './bid.svg';
import {Navbar}from 'reactstrap';

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
        if(this.props.role === "common user"){
            return this.commonUserOptions();
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
        <Navbar className="bg-light justify-content-between">
            <div className="d-flex justify-content-between">
                <a href="/home">
                <img source={Logo} style={{width: 50, height: 50}}/>
                </a>
            </div>
            { this.props.access === "granted" ? (
                <div  className="dropdown" style = {{width:"200px"}} >
                    <div className="button" onClick={this.showDropdownMenu}> Profile </div>
                    { this.state.displayMenu ? (
                        <div>
                            {this.userOptions()}
                        </div>
                        ):
                        null
                    }
                </div>):
                null
            }


            </Navbar>
        );
    }
}

export default Header;
