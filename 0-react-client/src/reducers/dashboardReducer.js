import { DASHBOARD_GET_DATA } from '../actions/actionTypes';
const DEFAULT_STATE = {
    secretMessage: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case DASHBOARD_GET_DATA:
            return {
                ...state,
                secretMessage: action.payload,
            };

        default:
            return state;
    }
}