import React from 'react';
import './Popup.scss'

const Popup = (props) => {
    if (!props.isOpen) return null;
    return (
        <div className="popup">
            <div className="container">
                <div className="content">
                    {props.categories.size!==0 &&
                    props.categories.map((category, idx) => {
                        return (
                            <div className="category" key={idx}>
                                {category}
                            </div>
                        );
                    })}
                    {props.categories.size===0 && <div className="warning">Nothing Found!</div>}
                </div>
            </div>
        </div>
    );
}

export default Popup;