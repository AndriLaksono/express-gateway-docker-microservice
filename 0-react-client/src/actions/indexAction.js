import Axios from 'axios';
import { 
    AUTH_SIGN_UP, 
    AUTH_SIGN_OUT, 
    AUTH_SIGN_IN, 
    AUTH_ERROR, 
    DASHBOARD_GET_DATA, 
    AUTH_SET_SECRET, 
    USER_GET_DATA,
    USER_DELETE_DATA,
    USER_ADD_DATA,
    ERROR_USER_ADD_DATA,
    USER_GET_ONE_DATA,
    ERROR_USER_GET_ONE_DATA,
    USER_UPDATE_DATA,
    ERROR_USER_UPDATE_DATA,
    AUTH_UPDATE_SELF_USER,
    USER_UPDATE_PASS_DATA,
    ERROR_USER_UPDATE_PASS_DATA,
    ERROR_USER_DELETE_DATA,
    ERROR_USER_GET_DATA,
} from './actionTypes';
/*
    ActionCreators -> create/return Action ({}) -> dispatch -> middlewares -> reducers

*/

export const signUp = data => {
    /*
        1. Use the data and to make http request to our backend and send it along [v]
        2. take the backend response (jwtToken is here!) [v]
        3. Dispatch 'user just signed up' (with jwtToken) [v]
        4. Save JwtToken into our localstorage [v]
    */ 
    return async dispatch => {
        try {
            const res = await Axios.post("http://localhost:8080/users/signup", data);

            dispatch({
                type: AUTH_SIGN_UP,
                payload: {
                    token: res.data.token,
                    idUser: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    level: res.data.level,
                    age: res.data.age
                }
            });

            Axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;

            localStorage.setItem('JWT_TOKEN', res.data.token);
            localStorage.setItem('idUser', res.data.id);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('level', res.data.level);
            localStorage.setItem('age', res.data.age);
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: "Email sudah digunakan"
            });
        }
    }
}

export const oauthFacebook = data => {
    return async dispatch => {
        try {
            const res = await Axios.post("http://localhost:8080/users/oauth/facebook", { access_token: data });
            
            dispatch({
                type: AUTH_SIGN_UP,
                payload: {
                    idUser: res.data.id,
                    token: res.data.token,
                    name: res.data.name,
                    email: res.data.email,
                    level: res.data.level,
                    age: res.data.age
                }
            });

            Axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;

            localStorage.setItem('JWT_TOKEN', res.data.token);
            localStorage.setItem('idUser', res.data.id);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('level', res.data.level);
            localStorage.setItem('age', res.data.age);
        } catch (error) {
            console.log(error);
        }
    }
}

export const signOut = () => {
    return dispatch => {
        Axios.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem("JWT_TOKEN");
        localStorage.removeItem("idUser");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("level");
        localStorage.removeItem("age");

        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        })
    }
}

export const signIn = (data) => {
    return async dispatch => {
        try {
            const res = await Axios.post("http://localhost:8080/users/signin", data);

            dispatch({
                type: AUTH_SIGN_IN,
                payload: {
                    idUser: res.data.id,
                    token: res.data.token,
                    name: res.data.name,
                    email: res.data.email,
                    level: res.data.level,
                    age: res.data.age
                }
            });

            Axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;

            localStorage.setItem('JWT_TOKEN', res.data.token);
            localStorage.setItem('idUser', res.data.id);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('level', res.data.level);
            localStorage.setItem('age', res.data.age);
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email dan password tidak cocok'
            })
        }
    }
}

export const getSecret = () => {
    return async dispatch => {
        try {
            const res = await Axios.get('http://localhost:8080/users/secret')
            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data.message
            })
        } catch (error) {
            console.log("error getsecret", error);
        }
    }
}

// set secret token after redirect from server (action signin/signup with google)
export const setSecret = (data) => {
    return async dispatch => {
        try {
            const res = await Axios.post('http://localhost:8080/users/get-user-google', data);
            
            dispatch({
                type: AUTH_SET_SECRET,
                payload: {
                    idUser: res.data.id,
                    token: res.data.token,
                    name: res.data.name,
                    email: res.data.email,
                    level: res.data.level,
                    age: res.data.age
                }
            });

            Axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;

            localStorage.setItem('JWT_TOKEN', res.data.token);
            localStorage.setItem('idUser', res.data.id);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('level', res.data.level);
            localStorage.setItem('age', res.data.age);
        } catch (error) {
            console.log("error setsecret", error);
        }
    }
}

// === action CRUD === //
export const getUserData = () => {
    return async dispatch => {
        try {
            const res = await Axios.get('http://localhost:8080/users/get-user-data')
            dispatch({
                type: USER_GET_DATA,
                payload: res.data.users
            })
        } catch (error) {
            dispatch({
                type: ERROR_USER_GET_DATA,
                payload: {
                    error: true,
                    message: "Ada kesalahan saat memuat data.."
                }
            })
        }
    }
}

export const deleteUserData = (id) => {
    return async dispatch => {
        try {
            const res = await Axios.post('http://localhost:8080/users/delete-user-data', {id: id});
            dispatch({
                type: USER_DELETE_DATA,
                payload: {
                    error: res.data.error,
                    message: res.data.message,
                }
            })
        } catch (error) {
            dispatch({
                type: ERROR_USER_DELETE_DATA,
                payload: {
                    error: true,
                    message: "Ada kesalahan saat menghapus data. Silahkan coba lagi..."
                }
            })
        }
    }
}

export const addUserData = (data) => {
    return async dispatch => {
        try {
            const res = await Axios.post('http://localhost:8080/users/add-user-data', data);
            dispatch({
                type: USER_ADD_DATA,
                payload: {
                    error: res.data.error,
                    message: res.data.message
                }
            });
        } catch (error) {
            dispatch({
                type: ERROR_USER_ADD_DATA,
                payload: {
                    error: true,
                    message: "Ada kesalahan saat menambahkan data, pastikan email belum digunakan. silahkan coba lagi.."
                }
            });
        }
    }
}

export const getUserDataOne = (id) => {
    return async dispatch => {
        try {
            const res = await Axios.get('http://localhost:8080/users/get-one-user-data/'+id);
            dispatch({
                type: USER_GET_ONE_DATA,
                payload: {
                    error: res.data.error,
                    message: "",
                    user: res.data.user
                }
            });
        } catch (error) {
            dispatch({
                type: ERROR_USER_GET_ONE_DATA,
                payload: {
                    error: true,
                    message: "Data tidak tersedia"
                }
            });
        }
    }
}

export const updateUserData = (data) => {
    return async dispatch => {
        try {
            const res = await Axios.post('http://localhost:8080/users/update-user-data', data);
            dispatch({
                type: USER_UPDATE_DATA,
                payload: {
                    error: res.data.error,
                    message: res.data.message,
                    user: res.data.updatedUser
                }
            });
            if (data._id === localStorage.getItem('idUser')) {
                dispatch({
                    type: AUTH_UPDATE_SELF_USER,
                    payload: {
                        user: res.data.updatedUser
                    }
                });
                
                localStorage.setItem('email', res.data.updatedUser.email);
                localStorage.setItem('level', res.data.updatedUser.level);
                localStorage.setItem('age', res.data.updatedUser.age);
                localStorage.setItem('name', res.data.updatedUser.name);
            }
        } catch (error) {
            dispatch({
                type: ERROR_USER_UPDATE_DATA,
                payload: {
                    error: true,
                    message: "Ada kesalahan saat mengupdate data, pastikan email belum digunakan. silahkan coba lagi.."
                }
            });
        }
    }
}

export const updatePassUserData = (data) => {
    return async dispatch => {
        try {
            const res = await Axios.post('http://localhost:8080/users/update-pass-user-data', data);
            dispatch({
                type: USER_UPDATE_PASS_DATA,
                payload: {
                    error: res.data.error,
                    message: res.data.message,
                }
            });
        } catch (error) {
            dispatch({
                type: ERROR_USER_UPDATE_PASS_DATA,
                payload: {
                    error: true,
                    message: "Ada kesalahan saat mengupdate password. silahkan coba lagi.."
                }
            });
        }
    }
}