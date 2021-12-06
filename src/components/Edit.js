import React, { Component } from "react";
import axios from 'axios';

export default class Edit extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmailId = this.onChangeEmailId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            lastName: "",
            firstName: "",
            emailId: "",
            employees: [],
        };
    }
    
    componentDidMount() {
        axios
            .get("http://localhost:9090/api/v1/employees/" + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    firstName: response.data[0].firstName,
                    lastName: response.data[0].lastName,
                    emailId: response.data[0].emailId,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value,
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value,
        });
    }

    onChangeEmailId(e) {
        this.setState({
            emailId: e.target.value,
        });
    }


    onSubmit(e) {
        e.preventDefault();
        const employee = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            emailId: this.state.emailId
        };
        console.log(employee);

        axios
            .put(
                "http://localhost:9090/api/v1/employees/" + this.props.match.params.id,
                employee
            )
            .then((res) => console.log(res.data));
            this.props.history.push("/");
    }

    render() {
        return (
                <div class="container d-flex flex-column justify-content-center align-items-center" style={{ marginTop: 20 }}>
                <h3 class="text-center">Update Employee</h3>
                <form onSubmit={this.onSubmit}>
                <div class="mb-3">
                    <label class="form-label">First Name: </label>
                    <input
                    type="text"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    />
                </div>
                <div class="mb-3">
                    <label>Last Name: </label>
                    <input
                    type="text"
                    className="form-control"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    />
                </div>
                <div class="mb-3">
                    <label>Email: </label>
                    <input
                    type="email"
                    className="form-control"
                    value={this.state.emailId}
                    onChange={this.onChangeEmailId}
                    />
                </div>
                <div >
                    <input
                    type="submit"
                    value="Update Employee"
                    className="btn btn-primary"
                    
                    />

                    <a href="/" class="btn bg-danger mx-2 text-white">Cancel</a>
                </div>
                </form>
        </div>
        )
    }
}
