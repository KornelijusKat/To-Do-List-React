import { Link, useParams } from "react-router-dom";
import "./_task.scss";
import * as service from '../../services/TasksCRUDservice';
import { useGlobalContext } from "../../context/Context";


const Task = (props) =>{
    const { id }= useParams()
    const { dispatch} = useGlobalContext()
    console.log(props.id)
    const openDeleteModal = () => {
        dispatch({ 
            type: "TOGGLE_MODAL", 
            payload: { showModal: true, Id: props.id },
        });
    };
    const updateStatus = () => {
        const newStatus = !props.status;
        service.updateTaskStatus(id, props.id, newStatus)
    }
    return (
        <div className="card task">
            <div className="task-content">
                <p><strong>Name:</strong> {props.name}</p>
                <p><strong>description:</strong> {props.description}</p>
                <p><strong>Priority:</strong> {props.priority}</p>
                <p><strong>Due Date:</strong> {props.to}</p>
                <p><strong>------------------------</strong></p>
            </div>
            <div className="task-actions">
                <Link
                    to={`/project/${id}/updatetask/${props.id}`}
                    className="btn btn-sm btn-outline-primary border-0 me-2"
                >
                    Update Task
                </Link>
                <button  className="btn btn-sm btn-outline-primary border-0 me-2" onClick={updateStatus}>Change status</button>
                <button  className="btn btn-sm btn-outline-primary border-0 me-2" onClick={openDeleteModal} >Delete Task</button>
           
            </div>
        </div>
    );
};


export default Task