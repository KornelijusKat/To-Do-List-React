import { Link, useParams } from "react-router-dom";
import "./_task.scss";
import * as service from '../../services/TasksCRUDservice';



const Task = (props) =>{

    const { id }= useParams()
    console.log(props.id)
    const updateStatus= () => {
        const newStatus = !props.status;
        service.updateTaskStatus(id, props.id, newStatus)
    }
    return (
        
        <div className="card task">
            <p><strong>Name:</strong> {props.name}</p>
            <p><strong>description:</strong> {props.description}</p>
            <p><strong>Priority:</strong> {props.priority}</p>
            <p><strong>Due Date:</strong> {props.to}</p>
            <p><strong>------------------------</strong></p>
            <Link
                to={`/project/${id}/updatetask/${props.id}`}
                className="btn btn-sm btn-outline-primary border-0 me-2"
            >
                Update Task
            </Link>
            <button  className="btn btn-sm btn-outline-primary border-0 me-2" onClick={updateStatus}>Change status</button>
        </div>
    );
};


export default Task