const reducer = (state, action) => {
    switch(action.type){
        case "TOGGLE_AUTH_VIEW": {
            return { ...state, isLogin: !state.isLogin}
        }
        case "SET_PROJECTS":
            return { ...state, projects: action.payload }
        case "ADD_PROJECT":
            return {
                ...state,
                projects: [...state.projects, action.payload],
            }
        case "UPDATE_TASK":
            return{
                ...state,
                projects: state.projects.map(project =>
                    project.id === action.payload.id ? {
                        ...project,
                        tasks: project.tasks.map(task =>
                            task.id === action.payload.taskId
                                ?{ ...task, ...action.payload.data}
                                : task
                        )
                    }
                    : project 
                )
            }
        case "UPDATE_PROJECT":
            return {
                ...state,
                projects: state.projects.map(project =>
                    project.id === action.payload.id ? action.payload : project
                )
            }
        case "TOGGLE_MODAL":
            return {
                ...state,
                showModal: action.payload?.showModal ?? !state.showModal,
                modalId: action.payload?.Id || null,
            };

        default:
            throw new Error(`No such action type: ${action.type}`)
    }
}
export default reducer