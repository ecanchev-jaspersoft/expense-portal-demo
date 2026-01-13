import { AUTH_ACTIONS } from '../utils/Constants';
export const initialState = {
    isLoggedIn: false,
    loggedInUser: null,
    vObject: null,
    selectedPage: null,
    chartOptions: null,
    selectedChartName: null,
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
                chartOptions: null,
                selectedChartName: null,
            };
        case AUTH_ACTIONS.SET_V_OBJECT:
            return { ...state, vObject: action.payload };
        case AUTH_ACTIONS.SET_SELECTED_PAGE:
            return {
                ...state,
                selectedPage: action.payload,
            };
        case AUTH_ACTIONS.SET_CHART_OPTIONS:
            return {
                ...state,
                chartOptions: action.payload,
            };
        case AUTH_ACTIONS.SET_SELECTED_CHART:
            console.log('STATE: ', state);
            return {
                ...state,
                selectedChartName: action.payload,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
