import React from 'react';
import './Searchbar.scss'

const AutoCompletePopup = (props) => {
    if (!props.isOpen) return null;
    return (
        <div className="popup-parent">
            <div className="popup">
                <div className="container">
                    <div className="content">
                        {props.items.length!==0 &&
                        props.items.map((item, idx) => {
                            return (
                                <div className="item" key={idx} onClick={()=>props.select(item)}>
                                    {item}
                                </div>
                            );
                        })}
                        {props.items.length===0 && <div className="warning">category not found...</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutoCompletePopup;