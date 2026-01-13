export const DATE_PICKER_ID = 'date-picker-dashboard-view';
export const FORBIDDEN_INPUT_CONTROLS = ['ACCOUNT_NUMBER', 'STATEMENT_TIME'];

export const BOOLEAN_TEXT = {
    TRUE: 'TRUE',
    FALSE: 'FALSE',
};

export const PAGE_TYPES = {
    PAGE_REPORT: 'pageReport',
    DASHBOARD: 'dashboard',
};

export const CHART_TYPES = {
    REPORT: 'report',
    ADHOC_VIEW: 'adhocView',
};

export const CHART_NAMES = {
    FINANCIAL_HEALTH: 'Financial Health & Performance',
    CUSTOMER_MARKET: 'Customer & Market Groth',
    OPERATIONAL_EFFICIENCY: 'Operational Efficiency',
    PEOPLE_TALENT: 'People & Talent',
};

export const DOM_ELEMENT_IDS = {
    VIZ_CONTAINER: 'viz-container',
    INPUT_CONTROLS_CONTAINER: 'theInputControls',
};

export const EXPORT_FORMATS = {
    PDF: 'pdf',
};

export const USER_ROLES = {
    REGULAR: 'REGULAR',
    ADMIN: 'ADMIN',
};

export const AUTH_ACTIONS = {
    SET_V_OBJECT: 'SET_V_OBJECT',
    SET_SELECTED_PAGE: 'SET_SELECTED_PAGE',
    SET_SELECTED_CHART_OBJECT: 'SET_SELECTED_CHART_OBJECT',
    SET_INPUT_CONTROLS_DATA: 'SET_INPUT_CONTROLS_DATA',
    SET_LOADING_DEPENDENCIES: 'SET_LOADING_DEPENDENCIES',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

export const CHARTS = [
    {
        name: 'Account Statement',
        resource: '/public/Demo_Example/Reports/Account_Statement/Account_Statement',
        type: 'report',
    },
    {
        name: 'Invoice A',
        resource: '/public/Demo_Example/Reports/Invoice/Invoice_A',
        type: 'report',
    },
    {
        name: 'Invoice B',
        resource: '/public/Demo_Example/Reports/Invoice/Invoice_B',
        type: 'report',
    },
    {
        name: 'Invoice C',
        resource: '/public/Demo_Example/Reports/Invoice/Invoice_C',
        type: 'report',
    },
    {
        name: 'Invoice D',
        resource: '/public/Demo_Example/Reports/Invoice/Invoice_D',
        type: 'report',
    },
    {
        name: 'Rental Contract',
        resource: '/public/Demo_Example/Reports/Rental_Contract/Rental_Contract',
        type: 'report',
    },
    {
        name: 'Ticket',
        resource: '/public/Demo_Example/Reports/Tickets/Ticket',
        type: 'report',
    },
    {
        name: 'Financial Health & Performance',
        resource: '/public/Demo_Example/Embedded_Dashboards/Financial_Health___Performance',
        type: 'report',
    },
    {
        name: 'Customer & Market Groth',
        resource: '/public/Demo_Example/Embedded_Dashboards/Customer___Market_Growth',
        type: 'report',
    },
    {
        name: 'Operational Efficiency',
        resource: '/public/Demo_Example/Embedded_Dashboards/Financial_Health___Performance',
        type: 'report',
    },
    {
        name: 'People & Talent',
        resource: '/public/Demo_Example/Embedded_Dashboards/Customer___Market_Growth',
        type: 'report',
    },
];