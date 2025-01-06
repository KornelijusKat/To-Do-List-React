import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as service from "../../services/ProjectCRUDservices"
import { useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../services/AuthServices"
import Header from "../app/header/Header";
import ProjectList from "../projectList/ProjectList";
import Loading from "../loading/Loading";

const Projects = () =>{
    const[projects, setProjects] = useState([])
    const[user, loading, error] = useAuthState(auth)
    
    useEffect(()=>{
      
        if(user){
            service.getAllProjects(projects=>
                setProjects(projects), user
            )}
    },[user,loading])
    return(
        <div className="container">
            <Header/>
            {projects.length > 0? 
                <div className="mt-4">
                    <ProjectList data={projects}/>
                </div> : 
                <div className="mt-4">
                    <h1>No projects</h1>
                </div>
            }
        </div>
    )
}

export default Projects;