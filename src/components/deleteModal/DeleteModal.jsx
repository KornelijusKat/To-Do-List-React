import { useGlobalContext } from "../../context/Context";
import React, { useEffect } from "react";
import './_deleteModal.scss'
const DeleteModal = ({deleteRecord}) => {
    const {dispatch} = useGlobalContext()
    const closeModal = () => {
        dispatch({ type: "TOGGLE_MODAL", payload: { showModal: false } });
    };
    return(
        <div className="modal-overlay">
            <div className="row modal-content">
                <div className="col modal-buttons">
                    <h4>Are you sure you want to delete this task?</h4>
                    <div className="modal-buttons">
                            <button 
                                className="btn btn-danger"
                                onClick={deleteRecord}
                            >
                                Yes, Delete
                            </button>
                            <button 
                                className="btn btn-secondary"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                </div>
            </div>
        </div>   
    )
}
export default DeleteModal