import React from 'react';
import styles from "../Search/Searchbar.module.scss";

const AutoCompletePopup = (props) => {
    if (!props.isOpen) return null;
    return (
        <div className={styles.popupParent}>
            <div className={styles.popup}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        {props.messages.length!==0 &&
                        props.messages.map((item, idx) => {
                            return (
                                <div
                                    className={styles.item}
                                    key={idx}
                                    onClick={()=>props.select(item)}
                                >
                                    {item}
                                </div>
                            );
                        })}
                        {props.messages.length===0 && <div className="warning">user not found...</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutoCompletePopup;