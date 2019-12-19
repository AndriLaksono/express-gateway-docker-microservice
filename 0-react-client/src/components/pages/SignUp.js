import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
// redux + action
import * as actions from '../../actions/indexAction';
// load component
import CustomInput from '../custom/CustomInput';
import FacebookLogin from 'react-facebook-login';

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: null,
            res: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    async onSubmit (formData) {
        await this.setState({ ...this.state, formData: formData })
        
        console.log('onSubmit bro', this.state.formData);
        // call action creatorCreator
        await this.props.signUp(this.state.formData);
        if (this.props.errorMessage === '' || this.props.errorMessage === undefined) {
            this.props.history.push('/dashboard');
        }
    }

    async responseFacebook(res) {
        await this.setState({ ...this.state, res: res.accessToken });

        console.log("Response Facebook", res.accessToken);
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
                                required={true}
                                name="name"
                                type="test"
                                id="name"
                                label="Enter your name"
                                placeholder="John Doe"
                                component={CustomInput} />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="email"
                                type="email"
                                id="email"
                                label="Enter your email"
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

                        <button type="submit" className="btn btn-primary">SignUp</button>
                    </form>
                </div>
                <div className="col">
                    <div className="text-center">
                        <div className="alert alert-primary">
                            Atau SignUp dengan
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
        errorMessage: state.auth.errorMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signUp: data => dispatch(actions.signUp(data)),
        oauthFacebook: res => dispatch(actions.oauthFacebook(res)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), // disini juga langsung bisa diselipin action
    reduxForm({ form: 'signup' })
)(SignUp);