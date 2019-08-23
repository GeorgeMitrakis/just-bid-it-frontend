import React from 'react';
import {Button}from 'reactstrap';
import {withRouter}from 'react-router-dom';

 const NotFound = (props) =>{
    return(
        <div>
            <h1 className="mt-2">
                404 page not found
            </h1>
            <Button color="link" onClick={() => props.history.goBack() }>Go back</Button>
        </div>
    );
}

export default withRouter(NotFound);