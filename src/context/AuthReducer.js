import { AUTH_ACTIONS } from '../utils/Constants';
export const initialState = {
    isLoggedIn: false,
    loggedInUser: null,
    vObject: null,
    selectedPage: null,
};

export const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN:
            return { ...state, isLoggedIn: true, loggedInUser: action.payload };
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                loggedInUser: null,
                vObject: null,
                selectedPage: null,
            };
        case AUTH_ACTIONS.SET_V_OBJECT:
            return { ...state, vObject: action.payload };
        case AUTH_ACTIONS.SET_SELECTED_PAGE:
            return {
                ...state,
                selectedPage: action.payload,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
