import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Axios from 'axios';

// reducer / redux
import reducer from './reducers/indexReducer';

// load component
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Dashboard from './components/pages/Dashboard';
import authGuard from './components/HOC/authGuard';
import DataUser from './components/pages/DataUser';
import AddDataUser from './components/pages/AddDataUser';
import Page404 from './components/pages/Page404';
import EditDataUser from './components/pages/EditDataUser';

const jwtToken = localStorage.getItem('JWT_TOKEN');
Axios.defaults.headers.common['Authorization'] = jwtToken;

// devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
    <Provider store={createStore(reducer, {
        auth: {
            token: jwtToken,
            isAuthenticated: jwtToken ? true : false,
            user: {
                idUser: localStorage.getItem("idUser"),
                name: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                level: localStorage.getItem("level"),
                age: localStorage.getItem("age"),
            }
        }
    }, composeEnhancers(applyMiddleware(reduxThunk)))}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/dashboard" component={authGuard(Dashboard)} />
                    <Route exact path="/data-user" component={authGuard(DataUser)} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/add-user" component={AddDataUser} />
                    <Route exact path="/edit-user/:id" component={EditDataUser} />
                    <Route component={Page404}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));
serviceWorker.unregister();
