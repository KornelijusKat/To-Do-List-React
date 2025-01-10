import * as service from "../../services/TasksCRUDservice"
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../../services/AuthServices"
import Task from "../task/Task";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";

const Tasks = ({projectId}) => {
    const [tasks, setTasks] = useState([]);
    const [user, loading] = useAuthState(auth);
    useEffect(()=>{
        if(loading) return;
        if (user && projectId) {
            service.getAllTasks(projectId, (task) => setTasks(task));
        }
    },[user, loading, projectId])

    if(loading) return (<Loading/>)
    return (
        
        <div>
            <Link
                to={`/projects/${projectId}/addtask`}
                className="btn btn-sm btn-outline-primary border-0 me-2"
            >
                Add Task
            </Link>
            {tasks?.map(task => (
                <Task
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    description={task.description}
                    priority={task.priority}
                    to={task.to}
                />
            ))}
        </div>
    );
    
}

export default Tasks