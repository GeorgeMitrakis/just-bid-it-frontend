import React from 'react';
import styles from './Searchbar.module.scss';

const AutoCompletePopup = (props) => {
    if (!props.isOpen) return null;
    return (
        <div className={styles.popupParent}>
            <div className={styles.popup}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        {props.items.length!==0 &&
                        props.items.map((item, idx) => {
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
                        {props.items.length===0 && <div className="warning">category not found...</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutoCompletePopup;