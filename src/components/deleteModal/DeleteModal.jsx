import { useGlobalContext } from "../../context/Context";
import React, { useEffect } from "react";
import './_deleteModal.scss'
const DeleteModal = ({deleteRecord}) => {
    const {dispatch} = useGlobalContext()
    const closeModal = () => {
        dispatch({ type: "TOGGLE_MODAL", payload: { showModal: false } });
    };
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Check if the click is outside `.modal-content`
            if (!e.target.closest(".modal-content")) {
                closeModal();
            }
        };

        // Attach the event listener to the document
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return(
        <div className="modal-overlay ">
            <div className="row modal-content">
                <div className="col modal-buttons">
                    <h4>Are you sure you want to delete this task?</h4>
                    <div className="modal-buttons">
                            <button 
                                className="btn btn-danger me-2"
                                onClick={deleteRecord}
                            >
                                Yes, Delete
                            </button>
                            <button 
                                className="btn btn-secondary me-2"
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