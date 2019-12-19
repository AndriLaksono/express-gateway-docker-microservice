import { 
    AUTH_SIGN_UP, 
    AUTH_ERROR, 
    AUTH_SIGN_OUT, 
    AUTH_SIGN_IN, 
    AUTH_SET_SECRET, 
    AUTH_UPDATE_SELF_USER 
} from '../actions/actionTypes';

const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    errorMessage: '',
    user: {
        idUser: '',
        name: '',
        email: '',
        level: null,
        age: null
    }
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case AUTH_SIGN_UP:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                errorMessage: '',
                user: {
                    idUser: action.payload.idUser,
                    name: action.payload.name,
                    email: action.payload.email,
                    level: action.payload.level,
                    age: action.payload.age
                }
            };

        case AUTH_SIGN_OUT:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: false,
                errorMessage: '',
                user: {
                    idUser: '',
                    name: '',
                    email: '',
                    level: null,
                    age: null
                }
            };

        case AUTH_SIGN_IN:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                errorMessage: '',
                user: {
                    idUser: action.payload.idUser,
                    name: action.payload.name,
                    email: action.payload.email,
                    level: action.payload.level,
                    age: action.payload.age
                }
            };
        
        case AUTH_SET_SECRET:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                errorMessage: '',
                user: {
                    idUser: action.payload.idUser,
                    name: action.payload.name,
                    email: action.payload.email,
                    level: action.payload.level,
                    age: action.payload.age,
                }
            }
        
        case AUTH_UPDATE_SELF_USER:
            return {
                ...state,
                user: {
                    idUser: action.payload.user._id,
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    level: action.payload.user.level,
                    age: action.payload.user.age,
                }
            }

        case AUTH_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };
    
        default:
            return state;
    }
}