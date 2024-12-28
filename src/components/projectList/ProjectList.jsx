import Project from "../project/Project";
const ProjectList = (props) =>{
    return(
        <>
            {props.projects?.map(project=> <Project
            id= {project.id}
            />)}

        </>
    )
}

export default ProjectList;