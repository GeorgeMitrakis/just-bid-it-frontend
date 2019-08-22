import React from 'react';
import './Header.css';

 class Header extends React.Component {

     constructor(){
         super();

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

     render() {
         return (
             <div className="d-flex justify-content-between">
                <a href="#LOGO">LOGO</a>
                <div  className="dropdown" style = {{background:"grey",width:"200px"}} >
                    <div className="button" onClick={this.showDropdownMenu}> Profile </div>

                    { this.state.displayMenu ? (
                        <div>
                            <ul>
                                <li><a className="active" href="#Create Page">Edit Profile</a></li>
                                <li><a href="#Create Ads">My Bids</a></li>
                                <li><a href="#Manage Ads">My Auctions</a></li>
                                <li><a href="#Activity Logs">Messages</a></li>
                                <li><a href="#Setting">Settings</a></li>
                                <li><a href="#Log Out">Sign Out</a></li>
                            </ul>
                        </div>
                        ):
                        null
                    }
                </div>
             </div>
         );
     }
 }

 export default Header;
