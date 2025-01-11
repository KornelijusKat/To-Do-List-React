import * as service from "../../services/TasksCRUDservice"
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../../services/AuthServices"
import Task from "../task/Task";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import "./_tasks.scss";
import * as taskFilter from '../../helpers/filterTasks'

const Tasks = ({projectId, filter, statusFilter}) => {
    const [tasks, setTasks] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [filteredTasks, setFilteredTasks] = useState([]);
    useEffect(()=>{
        if(loading) return;
        if (user && projectId) {
            console.log(filter)
            service.getAllTasks(projectId, (task) => {setTasks(task)
            setFilteredTasks(tasks)}); 
        }
        console.log(tasks)
    },[user, loading, projectId])
    useEffect(() => {
        let filtered = tasks;
        if (statusFilter !== "all") {
            filtered = taskFilter.filterByTaskStatus(statusFilter, filtered);
          
            console.log(filtered)
            console.log('hi')
          }
        if (filter) {
          filtered = taskFilter.filterByPriorityAndDueDate(filter, filtered);
        }
        setFilteredTasks(filtered); 
      }, [filter, statusFilter, tasks]);
    
    if(loading) return (<Loading/>)
    return (
        
        <div>
            <Link
                to={`/projects/${projectId}/addtask`}
                className="add-task-btn"
            >
                Add Task
            </Link>
            <div className="tasks-container">
            {filteredTasks?.map(task => (
                <Task
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    description={task.description}
                    priority={task.priority}
                    to={task.to}
                    status={task.status}
                />
            ))}
            </div>
        </div>
    );
    
}

export default Tasks