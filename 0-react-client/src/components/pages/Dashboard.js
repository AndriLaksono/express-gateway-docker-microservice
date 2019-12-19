import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/indexAction';

class Dashboard extends React.Component {
    async componentDidMount() {
        this.props.getSecret()
    }

    render() {
        return (
            <div>
                Dashboard component.
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        secretMessage: state.dash.secretMessage,
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSecret: () => dispatch(actions.getSecret())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);