import { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom"
import { showById } from "../../services/ProjectCRUDservices";
import Loading from "../loading/Loading";
import Tasks from "../tasks/Tasks";
import "./_projectView.scss";

const ProjectView = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [project, setProject] = useState(null);
    const [filter, setFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState('all');
    useEffect(()=>{
        showById(setProject, id)
    },[id])

    const handleNavigateHome = () =>{
        navigate('/projects');
    }

    if (!project) {
        return(<Loading/>);
    }
    return(
    <div className="project-view-container">
        <div className="header">
            <button className="btn btn-back" onClick={handleNavigateHome}>Back</button>
            <h1>Project Details</h1>
        </div>
        <div className="card">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text"><strong>Start Date:</strong> {project.from}</p>
                <p className="card-text"><strong>End Date:</strong> {project.to}</p>
                <p className="card-text"><strong>Description:</strong> {project.description || "No description available"}</p>
        </div>
        <div className="tasks-section">
        <h2> Tasks </h2>
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter tasks by due date or priority"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-container">
        <button
            className={`btn ${statusFilter === "all" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setStatusFilter("all")}
        >
            All
        </button>
        <button
            className={`btn ${statusFilter === false ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setStatusFilter(false)}
        >
            incomplete
        </button>
        <button
            className={`btn ${statusFilter === true ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setStatusFilter(true)}
        >
            Completed
        </button>
    </div>
    {console.log(statusFilter)}
        <div className="tasks-container">
            <Tasks projectId={id} filter={filter} statusFilter={statusFilter}></Tasks>
        </div>
        </div>
    </div>
    )
}

export default ProjectView