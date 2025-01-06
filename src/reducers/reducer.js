const reducer = (state, action) => {
    switch(action.type){
        case "TOGGLE_AUTH_VIEW": {
            return { ...state, isLogin: !state.isLogin}
        }
        case "ADD_PROJECT":
            return {
                ...state,
                projects: [...state.projects, action.payload],
            }
        case "UPDATE_PROJECT":
            return {
                ...state,
                projects: state.projects.map(project =>
                    project.id === action.payload.id ? action.payload : project
                )
            }
        default:
            throw new Error(`No such action type: ${action.type}`)
    }
}
export default reducer