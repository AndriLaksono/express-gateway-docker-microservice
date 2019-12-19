import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
// redux + action
import * as actions from '../../actions/indexAction';
// load component
import CustomInput from '../custom/CustomInput';
import FacebookLogin from 'react-facebook-login';

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: null,
            res: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    componentDidMount() {
        if (this.props.isAuth) {
            return this.props.history.push('/');
        }
    }

    async onSubmit(formData) {
        await this.setState({ ...this.state, formData: formData })
        
        // call action creatorCreator
        await this.props.signIn(this.state.formData);
        if (this.props.errorMessage === '' || this.props.errorMessage === undefined) {
            this.props.history.push('/dashboard');
        }
    }

    async responseFacebook(res) {
        await this.setState({ ...this.state, res: res.accessToken });
        await this.props.oauthFacebook(res.accessToken);
        if (this.props.errorMessage === '' || this.props.errorMessage === undefined) {
            this.props.history.push('/dashboard');
        }
    }

    render() {

        const { handleSubmit } = this.props; // handle submit dari redux-form

        return (
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="email"
                                type="email"
                                id="email"
                                label="Enter yout email"
                                placeholder="example@email.com"
                                component={CustomInput} />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                label="Enter your password"
                                placeholder="Your password"
                                component={CustomInput} />
                        </fieldset>

                        {this.props.errorMessage ?
                            <div className="alert alert-danger">
                                {this.props.errorMessage}
                            </div>
                            : null
                        }

                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>
                <div className="col">
                    <div className="text-center">
                        <div className="alert alert-primary">
                            Atau SignIn dengan
                        </div>
                        <FacebookLogin
                            appId="2670223643059773"
                            fields="name,email,picture"
                            textButton="Facebook"
                            callback={this.responseFacebook}
                            cssClass="btn btn-outline-primary"
                        />
                        &nbsp;
                        <a href="/users/auth/google" className="btn btn-outline-danger">Google</a>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage,
        isAuth: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: data => dispatch(actions.signIn(data)),
        oauthFacebook: res => dispatch(actions.oauthFacebook(res)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), // disini juga bisa langsung diselipin actions
    reduxForm({ form: 'signin' })
)(withRouter(SignIn));