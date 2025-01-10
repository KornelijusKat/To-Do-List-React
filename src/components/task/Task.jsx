import { Link, useParams } from "react-router-dom";



const Task = (props) =>{
    const { id }= useParams()
    console.log(props.id)
    return (
        
        <div className="task m-1">
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
        </div>
    );
};


export default Task