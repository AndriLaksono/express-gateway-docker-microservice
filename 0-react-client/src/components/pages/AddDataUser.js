import React from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
// redux + action
import * as actions from '../../actions/indexAction';
// load component
import CustomInput from '../custom/CustomInput';

class AddDataUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: null,
            isError: false,
            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount = async () => {
        await this.setState({
            isError: false,
            message: ''
        });
    }

    async onSubmit(formData) {
        await this.setState({ ...this.state, formData: formData })
        // Send dispatch
        await this.props.addUserData(formData);
        await this.setState({
            ...this.state,
            isError: this.props.isError,
            message: this.props.message,
        })
        if (this.props.isError === false) {
            this.props.resetForm()
        }
    }

    render() {

        const { handleSubmit } = this.props; // handle submit dari redux-form

        let errorMessage = null;
        if (this.state.isError === true) {
            errorMessage = (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {this.state.message}
                    </div>
                </div>
            )
        } else if (this.state.isError === false && this.state.message !== '') {
            errorMessage = (
                <div className="form-group">
                    <div className="alert alert-success" role="alert">
                        {this.state.message}
                    </div>
                </div>
            )
        }

        return (
            <div className="row">
                <div className="container">
                    <Link to="/data-user">&larr; back</Link>
                    <h3>Add data</h3>
                </div>
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
                        <fieldset>
                            <Field
                                name="age"
                                type="number"
                                id="age"
                                label="Enter your age"
                                placeholder="Your age (ex. 20)"
                                min="1"
                                component={CustomInput} />
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="level">Level user</label>
                                <Field name="level" className="form-control" component="select" id="level">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </Field>
                            </div>
                        </fieldset>
                        <fieldset>
                            {errorMessage}
                        </fieldset>

                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
                <div className="col">
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.user.message,
        isError: state.user.isError
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addUserData: (data) => dispatch(actions.addUserData(data)),
        resetForm: () => dispatch(reset('addUser'))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: 'addUser' })
)(withRouter(AddDataUser));