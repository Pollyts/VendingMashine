import React, { useState } from 'react';
import { DeleteDrink } from '../Functions/FetchDrinks';

export function DeleteButton(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => ( props.drink.id!==null? setShow(true):null );

    const handleSubmit = async e => {
        e.preventDefault();
        await DeleteDrink(props.drink.id);
        props.handleToUpdate();
        handleClose();
    }

    return (
        <>
            <button className="btn btn-dark instruments" onClick={handleShow}>
                Удалить напиток
            </button>

            {show?
            <div className="ModalPage" onClick={handleClose}>
                    <div className="modal-content p-3" onClick={e => e.stopPropagation()}>
                        <div className="row justify-content-md-center"><h3>Удаление напитка {props.drink.name}</h3></div>
                        <div className="row justify-content-md-center">Вы действительно хотите удалить напиток  {props.drink.name}?</div>
                        <div className="row mt-3 justify-content-around">
                            <div className="col-6 d-flex justify-content-center "><button className="btn btn-dark instruments" onClick={handleSubmit}>Да</button></div>
                            <div className="col-6 d-flex justify-content-center "><button className="btn btn-dark instruments" onClick={handleClose}>Отменить</button></div>

                        </div>
                     
                        
                    
                   
            </div>
                </div>
                :null}
        </>
    );
}