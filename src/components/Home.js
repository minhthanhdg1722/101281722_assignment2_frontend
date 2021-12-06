import React, { Component } from 'react'
import {
    BrowserRouter as
    Router,
    Link,
    Switch,
    Route
} from "react-router-dom";
import axios from 'axios';
import Edit from './Edit';

const Employee = (props) => (
    <tr>
        <td>{props.employee.firstName}</td>
        <td>{props.employee.lastName}</td>
        <td>{props.employee.emailId}</td>
        <td>
            <a href={"/add-employee/" + props.employee.id}>Edit</a> | 
        <a onClick={() => {
                props.deleteEmployee(props.employee.id);
            }}
            href="/"
        >
            Delete 
        </a> | 
        <a href={"/view-employee/" + props.employee.id}>View</a>
        </td>
    </tr>
);

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:9090/api/v1/employees")
            .then((response) => {
                this.setState({ employees: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    

    deleteEmployee(id) {
        axios.delete("http://localhost:9090/api/v1/employees/" + id).then((response) => {
            console.log(response.data);
            });
        
            this.setState({
            employee: this.state.employees.filter((el) => el.id !== id),
            });
        }


        employeeList() {
            return this.state.employees.map((e) => {
                return (
                    <Employee
                        employee={e}
                        deleteEmployee={this.deleteEmployee}
                        key={e.id}
                    />
                );
                });
            }
    render() {
        return (
            <div className="container d-flex flex-column justify-content-center align-items-center">
            <h1 class="text-center">Employee List</h1>
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>{this.employeeList()}</tbody>
                </table>
            </div>
        )
    }
}
