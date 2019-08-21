import React from 'react';

import { withRouter } from 'react-router-dom';


 class Header extends React.Component {

     render() {
         return (
             <div>
                 <>
                     <h1> welcome to just bid it </h1>
                     <img
                         style={{width: 50, height: 50}}
                         source={{uri: 'https://images.assetsdelivery.com/compings_v2/friendesigns/friendesigns1606/friendesigns160600754.jpg'}}
                     />
                 </>

             </div>
         );
     }
 }

 export default Header;