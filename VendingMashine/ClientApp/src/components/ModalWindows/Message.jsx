import React from 'react';

export function Message(props) {
    const handleSubmit = async e => {
        e.preventDefault();
        props.HideMessage();
    }
    return (
        <div className="ModalPage" onClick={handleSubmit}>
                    <div className="modal-content p-3" onClick={e => e.stopPropagation()}>
                        <div className="row justify-content-md-center"><h3>{props.header}</h3></div>
                        <div className="row justify-content-md-center">{props.body}</div>
                        <div className="row mt-3 justify-content-around">
                            <div className="col d-flex justify-content-center "><button className="btn btn-dark instruments" onClick={handleSubmit}>OK</button></div>
                        </div>
                    </div>
                </div>
    );
}