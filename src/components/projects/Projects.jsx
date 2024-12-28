import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as service from "../../services/ProjectCRUDservices"
import { useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../services/AuthServices"
import Header from "../app/header/Header";
import ProjectList from "../projectList/ProjectList";

const Projects = () =>{
    const[projects, setProjects] = useState([])
    const[user, loading, error] = useAuthState(auth)
    
    useEffect(()=>{
        if(loading) return;
        if(user){
            service.getAllProjects(projects=>
                setProjects(projects), user
            )}
    },[user,loading])

    console.log(projects)
    console.log('hi')
    return(
        <div className="container">
            <Header/>
            {/* Reiks pataisyti kai prijungsim projects, kad jei nera rodytu "No Projects" ar pns */}
            {projects.length > 0? <h1>Yra</h1> : 
                <div className="mt-4">
                    <ProjectList data={projects}/>
                </div>
            }
        </div>
    )
}

export default Projects;