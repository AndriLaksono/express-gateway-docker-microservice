import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions/indexAction';

class DataUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isError: false,
            message: ''
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    async componentDidMount() {
        await this.props.getSecret()
        await this.props.getUserData()
        await this.setState({
            isError: false,
            message: ""
        })
    }

    onDeleteHandler = async (id) => {
        if (window.confirm('Hapus data?')) {
            await this.props.deleteUserData(id);
            await this.props.getUserData();
            await this.setState({
                isError: this.props.isError,
                message: this.props.message
            })
        }
    }

    render() {
        let listUsers = this.props.userData.map((item) => {
            return (
                <tr key={item._id}>
                    <td width="10px">
                        {item._id === this.props.user.idUser ?
                            ("[V]") :  null
                        }
                    </td>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.level}</td>
                    <td>
                        {this.props.user.level >= "1" ?
                            (
                                <Link to={{ pathname: "/edit-user/" + item._id }}>
                                    Edit
                                </Link>
                            ) : null
                        }
                        &nbsp;
                        {item._id !== this.props.user.idUser && (this.props.user.level === "2" || this.props.user.level === 2) ?
                            (<a 
                                style={{ color: "#b32525"}}
                                href="#!" 
                                onClick={() => this.onDeleteHandler(item._id)}>Delete</a>)
                            : null
                        }
                    </td>
                </tr>
                
            )
        });

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

        return (
            <div>
                {errorMessage}
                <div>
                    <Link to="/add-user"> Add User </Link>
                </div>
                <h3>Content (list user)</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th colSpan={2}>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Level</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers}
                    </tbody>
                </table>

                <div style={{ marginTop: "30px", marginBottom: "50px" }}>
                    Ket: <br/>
                    <ul style={{ listStyle: "none"}}>
                        <li>[V] : you</li>
                        <li>Level 0 : add</li>
                        <li>Level 1 : add & edit</li>
                        <li>Level 2 : add, edit & delete</li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        userData: state.user.users,
        message: state.user.message,
        isError: state.user.isError
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSecret: () => dispatch(actions.getSecret()),
        getUserData: () => dispatch(actions.getUserData()),
        deleteUserData: (id) => dispatch(actions.deleteUserData(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataUser);