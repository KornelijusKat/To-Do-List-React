import { Link } from "react-router-dom";
import * as tasksService from "../../services/TasksCRUDservice.js"
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/Context.jsx";
import "./_project.scss";

const Project =(props) =>{
    const [taskCount, setTaskCount] = useState(null)
    const [taskFinished, setTaskFinished] = useState(null)
    const {dispatch} = useGlobalContext()
    const openDeleteModal = () => {
        dispatch({ 
            type: "TOGGLE_MODAL", 
            payload: { showModal: true, Id: props.id },
        });
    };
    useEffect(() => {
        const fetchTaskCount = async () => {
            try {
                const counter = await tasksService.countTasks(props.id);
                const finishCounter = await tasksService.countFinishedTasks(props.id)
                setTaskCount(counter);
                setTaskFinished(finishCounter)
            } catch (error) {
                console.error(error);
                setCount(0);
                setTaskFinished(0)
            }
        };
        fetchTaskCount();
    }, [props.id]);
    return(
        <>
            <div className="col project" key={props.id}>
            <div className="card h-100 project-card">
    <div className="card-body d-flex justify-content-between align-items-start project-card-body">
        <div className="project-details">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text mb-1 project-date"><strong>Start Date:</strong> {props.from}</p>
            <p className="card-text mb-1 project-date"><strong>End Date:</strong> {props.to}</p>
            <p className="card-text text-secondary project-tasks">{taskCount == 0 
            ? <Link to={`/projects/${props.id}/addtask`} style={{ textDecoration: 'none' }}> Create a task </Link> 
            : taskCount !== null 
            ? `Tasks: ${taskFinished}/${taskCount}` 
            : "Loading..."}</p>
        </div>
        <div className="project-actions">
            <Link
                to={`/updateproject/${props.id}`}
                className="btn btn-sm btn-outline-primary border-0 me-2 project-action-btn"
            >
                <i className="bi bi-pencil"></i>
            </Link>
            <Link
                to={`/projectview/${props.id}`}
                className="btn btn-sm btn-outline-primary border-0 me-2 project-action-btn"
            >
                <i className="bi bi-clipboard"></i>
            </Link>
            <button
                className="btn btn-sm btn-danger project-delete-btn"
                disabled={taskCount !== 0} // Disable if taskCount is not 0
                onClick={() => openDeleteModal()}
                            >
                Delete 
            </button>
        </div>
    </div>
</div>

            </div>
        </>
    )
}

export default Project