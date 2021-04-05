export const endpoints = {
    auth: {
        LOG_IN: '/sessions',
        LOG_OUT: '/sessions',
    },
    users: {
        SIGN_UP: '/users',
        UPDATE_PROFILE: `/users/:userId`,
        DELETE_ACCOUNT: `/users/:userId`,
        GET_PROFILE: `/users/:userId`,
        ACTIVATE_ACCOUNT: `/activation/:emailToken`,
        FORGOT_PASSWORD: `/forgot`,
        RESET_PASSWORD: `/reset/:emailToken`,
        USER_BY_INVITATION: `/users/:emailToken`,
    },
    enterprises: {
        NEW_ENTERPRISE: '/enterprises'
    },
    employees: {
        ADD: '/employees',
        GET_ALL: '/employees',
        GET: `/employees/:employeeId`,
        EDIT: `/employees/:employeeId`,
        DELETE: `/employees/:employeeId`,
        SEND_INVITATION: '/invitation',
        GET_CUSTOM_FIELDS: '/employees/custom-fields'
    },
    LOCATION_AUTOCOMPLETE: '/locations',
    GET_EMAIL_SERVICE: '/emailServices/:emailToken',
}