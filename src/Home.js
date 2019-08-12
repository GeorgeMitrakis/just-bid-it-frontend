import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component{
    render(){
        return(
            <div>
                Home Page
            </div>
        )
    }
}

export default withRouter(Home);