import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// redux + action
import * as actions from '../../actions/indexAction';

export default (OriginalComponent) => {
    class MixedCompoenent extends React.Component {

        async checkAuth() {
            let search = window.location.search;
            let params = new URLSearchParams(search);
            let token = decodeURIComponent(params.get('token'));
            let id = decodeURIComponent(params.get('_id'));
            let data = {
                token,
                id
            }
            
            if (token !== 'null') {
                await this.props.setSecret(data);
                this.props.history.push('/dashboard');
            }
            
            if (!this.props.isAuth && !this.props.jwtToken) {
                this.props.history.push('/');
            }
        }

        componentDidMount() {
            this.checkAuth();
        }

        componentWillMount() {
            this.checkAuth();
        }

        render() {
            return <OriginalComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            isAuth: state.auth.isAuthenticated,
            jwtToken: state.auth.token,
            user: state.auth.user
        }
    }

    function mapDispatchToProps(dispatch) {
        return {
            setSecret: (token) => dispatch(actions.setSecret(token))
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(MixedCompoenent));
};