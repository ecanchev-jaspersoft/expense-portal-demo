export const initialState = {
    isLoggedIn: false,
    vObject: null,
    selectedPage: null,
};

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                vObject: null,
                selectedPage: null,
            };
        case 'SET_V_OBJECT':
            return { ...state, vObject: action.payload };
        case 'SET_SELECTED_PAGE':
            return {
                ...state,
                selectedPage: action.payload,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
