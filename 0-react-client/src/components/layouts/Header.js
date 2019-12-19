import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions/indexAction';
import { connect } from 'react-redux';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.signOut = this.signOut.bind(this);
    }

    signOut = async () => {
        await this.props.signOut();
        if (this.props.isAuth === false) {
            this.props.history.push('/');
        }
    }

    render() {
        
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px'}}>
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">App Sample</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                            {this.props.isAuth ?
                                (<li className="nav-item">
                                    <Link to="/data-user" className="nav-link">Data Users</Link>
                                </li>) : null
                            }
                        </ul>

                        <ul className="nav navbar-nav ml-auto">
                            {
                                !this.props.isAuth ?
                                [<li className="nav-item" key="signup">
                                    <Link to="/signup" className="nav-link">Sign Up</Link>
                                </li>,
                                <li className="nav-item" key="signin">
                                    <Link to="/signin" className="nav-link">Sign In</Link>
                                </li>] : null
                            }
                            {
                                this.props.isAuth ? 
                                <li className="nav-item">
                                    <Link to="/signout" className="nav-link" onClick={this.signOut}>Sign Out</Link>
                                </li> : null
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    };
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signOut: () => dispatch(actions.signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));