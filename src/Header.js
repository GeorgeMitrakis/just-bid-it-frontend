import React from 'react';
import './Header.css';
import Logo from "./resourses/icons/bid.png";
import {Navbar}from 'reactstrap';

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
             <Navbar className="bg-light justify-content-between">
             <div className="d-flex justify-content-between">
                 <a href="Home.js">
                 <img style={{width: 50, height: 50}}
                     source={Logo} alt="website logo"
                 />
                 </a>
             </div>
                         <div  className="dropdown" style = {{width:"200px"}} >
                             <div className="button" onClick={this.showDropdownMenu}> Profile </div>

                             { this.state.displayMenu ? (
                                 <div>
                                     <ul>
                                         <li><a href="#">Edit Profile</a></li>
                                         <li><a href="#">My Bids</a></li>
                                         <li><a href="#">My Auctions</a></li>
                                         <li><a href="#">Messages</a></li>
                                         <li><a href="#Setting">Settings</a></li>
                                         <li><a href="Log Out">Sign Out</a></li>
                                     </ul>
                                 </div>
                                 ):
                                 null
                             }

                         </div>


             </Navbar>
         );
     }
 }

 export default Header;
