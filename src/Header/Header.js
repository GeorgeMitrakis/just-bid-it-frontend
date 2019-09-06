import React from 'react';
import styles from './Header.module.css';
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
            <ul className={styles.ul}>
                <li className={styles.li}><a  className={styles.a} href="/logout">Logout</a></li>
            </ul>
        );
    }
    commonUserOptions = () =>{
        return(
            <ul className={styles.ul}>
                <li className={styles.li}><a  className={styles.a} href="/bids">My Bids</a></li>
                <li className={styles.li}><a  className={styles.a} href="/items">My Auctions</a></li>
                <li className={styles.li}><a  className={styles.a} href="/messages">Messages</a></li>
                <li className={styles.li}><a  className={styles.a} href="/logout">Logout</a></li>
            </ul>
        );
    }

    adminOptions = () =>{
        return(
            <ul className={styles.ul}>
                <li className={styles.li}><a  className={styles.a} href="/admin/users">Users</a></li>
                <li className={styles.li}><a  className={styles.a} href="#">Export items in XML</a></li>
                <li className={styles.li}><a  className={styles.a} href="#">Export items in JSON</a></li>
                <li className={styles.li}><a  className={styles.a} href="/logout">Logout</a></li>
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
        <div className={styles.navbarStyle}>
            <Navbar className="bg-light d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                    <a  className={styles.a} href="/home">
                        <img src={logo} style={{width: 100, height: 62} } className="img-fluid img-thumbnail"/>
                    </a>
                </div>
                { getUserInfo() ? (
                    <div>
                        Welcome dear {" "+getUserInfoField("username")+" "}
                        <div className={"dropdown "+styles.dropdown} >
                            <div className={styles.button} onClick={this.showDropdownMenu}> Profile </div>
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
