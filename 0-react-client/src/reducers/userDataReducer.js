import { 
    USER_GET_DATA, 
    USER_DELETE_DATA, 
    USER_ADD_DATA, 
    ERROR_USER_ADD_DATA, 
    USER_GET_ONE_DATA,
    ERROR_USER_GET_ONE_DATA,
    USER_UPDATE_DATA,
    ERROR_USER_UPDATE_DATA,
    USER_UPDATE_PASS_DATA,
    ERROR_USER_UPDATE_PASS_DATA,
    ERROR_USER_DELETE_DATA,
    ERROR_USER_GET_DATA
} from '../actions/actionTypes';

const DEFAULT_STATE = {
    isError: false,
    message: '',
    users: [],
    usr: null
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case USER_GET_DATA:
            return {
                ...state,
                users: action.payload
            }
        
        case ERROR_USER_GET_DATA:
            return {
                ...state,
                users: [],
                isError: action.payload.error,
                message: action.payload.message
            }

        case USER_DELETE_DATA:
            return {
                ...state,
                isError: action.payload.error,
                message: action.payload.message
            }
        
        case ERROR_USER_DELETE_DATA:
            return {
                ...state,
                isError: action.payload.error,
                message: action.payload.message
            }

        case USER_ADD_DATA:
            return {
                ...state,
                isError: action.payload.error,
                message: action.payload.message
            }

        case ERROR_USER_ADD_DATA:
            return {
                ...state,
                isError: action.payload.error,
                message: action.payload.message
            }

        case USER_GET_ONE_DATA:
            return {
                ...state,
                isError: action.payload.error,
                message: action.payload.message,
                usr: action.payload.user
            }

        case ERROR_USER_GET_ONE_DATA:
            return {
                ...state,
                isError: action.payload.error,
                message: action.payload.message,
            }

        case USER_UPDATE_DATA:
            return {
                ...state,
                isError: action.payload.error,
                message: action.payload.message,
                usr: {
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    age: action.payload.user.age,
                    level: action.payload.user.level,
                    _id: action.payload.user._id,
                }
            }

        case ERROR_USER_UPDATE_DATA:
            return {
                ...state,
                isError: action.payload.error,
                message: action.payload.message
            }

        case USER_UPDATE_PASS_DATA:
            return {
                ...state,
                isError: action.payload.error,
                message: action.payload.message,
            }

        case ERROR_USER_UPDATE_PASS_DATA:
            return {
                ...state,
                isError: action.payload.error,
                message: action.payload.message,
            }

        default:
            return state;
    }
}