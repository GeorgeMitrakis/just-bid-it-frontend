import React from 'react';


const Example = (props, children)=>{
    return(
        <div>
            Hello {props.username}
            <button onClick={props.onButtonClick}>PRESS ME</button>
        </div>
    )
}

export default Example;