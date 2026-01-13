import { AUTH_ACTIONS } from '../utils/Constants';
export const initialState = {
    isLoggedIn: false,
    loggedInUser: null,
    vObject: null,
    selectedPage: null,
    chartOptions: null,
    selectedChart: null,
    inputControlsData: [],
    loadingDependencies: {},
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
                selectedChart: null,
                inputControlsData: [],
                loadingDependencies: {},
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
        case AUTH_ACTIONS.SET_SELECTED_CHART_OBJECT:
            return {
                ...state,
                selectedChart: action.payload,
            };
        case AUTH_ACTIONS.SET_INPUT_CONTROLS_DATA:
            return {
                ...state,
                inputControlsData: action.payload,
            };
        case AUTH_ACTIONS.SET_LOADING_DEPENDENCIES:
            return {
                ...state,
                loadingDependencies: action.payload,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

