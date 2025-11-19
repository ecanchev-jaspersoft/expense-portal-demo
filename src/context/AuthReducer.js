export const initialState = {
    isLoggedIn: false,
    vObject: null,
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
            };
        case 'SET_V_OBJECT':
            return { ...state, vObject: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
