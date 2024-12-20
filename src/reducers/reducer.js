const reducer = (state, action) => {
    switch(action.type){
        case "TOGGLE_AUTH_VIEW": {
            return { ...state, isLogin: !state.isLogin}
        }
        default:
            throw new Error(`No such action type: ${action.type}`)
    }
}
export default reducer