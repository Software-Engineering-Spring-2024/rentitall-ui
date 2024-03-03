import React from "react";
import ReactDOM from "react-dom";
import './../styles/Modal.css';
import { GrClose } from "react-icons/gr";

export const Modal = (props) => {
    if(!props.show) return null;

    return ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay">
                <div id="Modal">
                    <button className="close" onClick={props.closeModal}>
                        <GrClose />
                    </button>
                    <div className="modal-title">{props.title}</div>
                    <div>{props.children}</div>
                </div>
            </div>
        </React.Fragment>,
        document.getElementById('modal-root')
    )
}