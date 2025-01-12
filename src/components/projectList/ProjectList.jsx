import { useParams } from "react-router-dom";
import Project from "../project/Project";
import "./_projectList.scss";
const ProjectList = (props) =>{
    return(
        <div className="project-list">
            {props.data?.map(project=> <Project
            id= {project.id}
            name= {project.name}
            description= {project.description}
            from= {project.from}
            to= {project.to}
            uid= {project.uid}
            />)}

        </div>
    )
}

export default ProjectList;