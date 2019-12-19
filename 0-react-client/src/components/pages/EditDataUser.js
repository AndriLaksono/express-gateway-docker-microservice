import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
// redux + action
import * as actions from '../../actions/indexAction';

class EditDataUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: null,
            isError: false,
            message: '',
            isLoading: true,
            userValue: null,
            isNotFound: false,
            upPassword: '',
            upPassMsg: '',
            upPassErr: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitUpdatePassword = this.onSubmitUpdatePassword.bind(this);
    }

    componentDidMount = async () => {
        await this.props.getUserDataOne(this.props.match.params.id)
        
        if (this.props.isError) {
            await this.setState({
                ...this.state,
                isError: true,
                message: 'Data not found...',
                isLoading: true,
                isNotFound: true,
            });
        } else {
            await this.setState({
                ...this.state,
                isError: false,
                message: '',
                isLoading: false,
                userValue: {
                    name: this.props.usr.name,
                    email: this.props.usr.email,
                    age: this.props.usr.age ? this.props.usr.age : 0,
                    level: this.props.usr.level,
                    _id: this.props.usr._id,
                },
            });
        }

        console.log("Local state", this.state.userValue);
    }

    async onSubmit(formData) {
        await this.setState({ ...this.state })
        console.log("form data", this.state.userValue);
        
        // Send dispatch
        await this.props.updateUserData(this.state.userValue);

        if (this.props.isError) {
            await this.setState({
                ...this.state,
                isError: this.props.isError,
                message: this.props.message,
                isLoading: false,
            })
        } else {
            
            await this.setState({
                ...this.state,
                isError: this.props.isError,
                message: this.props.message,
                isLoading: false,
                userValue: {
                    name: this.props.usr.name,
                    email: this.props.usr.email,
                    age: this.props.usr.age,
                    level: this.props.usr.level,
                    _id: this.props.usr._id,
                }
            })
        }
    }

    onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            userValue: {
                ...this.state.userValue,
                [name]: value,
            }
        });
    }

    onChangePassHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            [name]: value,
        });
    }

    onSubmitUpdatePassword = async (e) => {
        e.preventDefault()
        let data = {
            password: this.state.upPassword,
            id: this.state.userValue._id
        }
        console.log("Masuk sini...")

        // Send dispatch
        await this.props.updatePassUserData(data);

        if (this.props.isError) {
            await this.setState({
                ...this.state,
                upPassErr: true,
                upPassMsg: this.props.message,
                isLoading: false,
            });
        } else {
            await this.setState({
                ...this.state,
                upPassErr: false,
                upPassMsg: this.props.message,
                isLoading: false,
                upPassword: ''
            });
        }
    }

    render() {

        const { handleSubmit } = this.props; // handle submit dari redux-form

        let errorMessage = null;
        if (this.state.isError === true) {
            errorMessage = (
                <div className="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            )
        } else if (this.state.isError === false && this.state.message !== '') {
            errorMessage = (
                <div className="alert alert-success" role="alert">
                    {this.state.message}
                </div>
            )
        }

        let errorNotFound = null;
        if (this.state.isNotFound) {
            errorNotFound = (
                <div className="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            )
        }

        let loadingMessage = <p>Loading...</p>;
        if (this.state.isLoading === true  && this.state.isNotFound === true) {
            loadingMessage = errorNotFound;
        }

        let errPassMsg = null;
        if (this.state.upPassErr) {
            errPassMsg = (
                <React.Fragment>
                    <div className="alert alert-danger" role="alert">
                        {this.state.upPassMsg}
                    </div>
                </React.Fragment>
            )
        } else if (this.state.upPassErr === false && this.state.upPassMsg !== '') {
            errPassMsg = (
                <React.Fragment>
                    <div className="alert alert-success" role="alert">
                        {this.state.upPassMsg}
                    </div>
                </React.Fragment>
            )
        }

        return (
            <div className="row">
                <div className="container">
                    <Link to="/data-user">&larr; back</Link>
                    <h3>Edit data</h3>
                </div>
                <div className="col">
                    {!this.state.isLoading ?
                        (
                            <form onSubmit={handleSubmit(this.onSubmit)}>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="name">Enter your name</label>
                                        <input 
                                            name="name" 
                                            className="form-control" 
                                            id="name"
                                            type="text"
                                            value={this.state.userValue.name}
                                            onChange={this.onChangeHandler}
                                            required/>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="email">Enter your email</label>
                                        <input
                                            name="email"
                                            className="form-control"
                                            id="email"
                                            type="email"
                                            value={this.state.userValue.email}
                                            onChange={this.onChangeHandler}
                                            required />
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="age">Enter your age</label>
                                        <input
                                            name="age"
                                            className="form-control"
                                            id="age"
                                            type="number"
                                            min="1"
                                            value={this.state.userValue.age}
                                            onChange={this.onChangeHandler}
                                            required />
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="level">Level</label>
                                        <select name="level" className="form-control" value={this.state.userValue.level} id="level" onChange={this.onChangeHandler}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            {parseInt(localStorage.getItem('level')) > 1 ?
                                                (<option value="2">2</option>) : null
                                            }
                                        </select>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div className="form-group">
                                        {errorMessage}
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div className="form-group">
                                        <a href="#!" data-toggle="modal" data-target="#modalUpdatePassword">Update Password</a>
                                    </div>
                                </fieldset>

                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        )  
                        : loadingMessage
                    }
                </div>
                <div className="col">

                </div>

                {/* Modal Update Password */}
                <div className="modal fade" id="modalUpdatePassword" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form onSubmit={this.onSubmitUpdatePassword}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Update Password</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {errPassMsg}
                                    <div className="form-group">
                                        <label htmlFor="password">Enter new password</label>
                                        <input
                                            name="upPassword"
                                            className="form-control"
                                            id="password"
                                            type="password"
                                            value={this.state.upPassword}
                                            onChange={this.onChangePassHandler}
                                            minLength="7"
                                            required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.user.message,
        isError: state.user.isError,
        usr: state.user.usr
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserDataOne: (id) => dispatch(actions.getUserDataOne(id)),
        updateUserData: (data) => dispatch(actions.updateUserData(data)),
        updatePassUserData: (data) => dispatch(actions.updatePassUserData(data)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: 'editUser' })
)(withRouter(EditDataUser));