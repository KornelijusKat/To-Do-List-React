import { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom"
import { showById } from "../../services/ProjectCRUDservices";
import Loading from "../loading/Loading";
import Tasks from "../tasks/Tasks";

const ProjectView = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [project, setProject] = useState(null);


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
    <div className="container">
        <div className="row m-5">
            <button className="col-1 btn btn-primary" onClick={handleNavigateHome}>Back</button>
            <h1 className=" col-9 d-flex justify-content-center">Project Details</h1>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text"><strong>Start Date:</strong> {project.from}</p>
                <p className="card-text"><strong>End Date:</strong> {project.to}</p>
                <p className="card-text"><strong>Description:</strong> {project.description || "No description available"}</p>
            </div>
        </div>
        <h2 className="d-flex justify-content-center mt-1"> Tasks </h2>
        <div className="row d-flex">
            <Tasks projectId={id}></Tasks>
        </div>
    </div>
    )
}

export default ProjectView