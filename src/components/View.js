import React, { Component } from "react";
import axios from 'axios';

export default class View extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            lastName: "",
            firstName: "",
            emailId: "",
        };
    }
    

    
    componentDidMount() {
        console.log(this.props.match.params.id);
        axios
            .get("http://localhost:9090/api/v1/employees/" + this.props.match.params.id)
            .then((response) => {
                console.log(response)
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

    
    


    
    render() {
        return (
            <div class="mt-3 container d-flex flex-column justify-content-center align-items-center">
            <div class="card">
                <div class="card-header">
                    <h4>View Employee Details</h4>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{this.state.firstName} {this.state.lastName}</h5>
                    <p class="card-text">Employee Email ID: {this.state.emailId}  </p>
                    <a href="/" class="btn btn-primary">Go Back</a>
                </div>
                </div>
            </div>

            

        )
    }
}
