import React, {Component} from 'react';
import {Button, Container, Form, FormGroup, Table} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

import AuthenticationService from "../auth/AuthenticationService";
import {Logout} from "../auth/Logout";
import {SendRequest} from "./SendRequest";
import {ApproveRequest} from "./ApproveRequest";
import {DeclineRequest} from "./DeclineRequest";


class AllRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            showMessage: false,
            requestId: "",
        };

    }

    approveRequest = (e, request) => {
        ApproveRequest(e, request);
    };

    declineRequest = (e, request) => {
        DeclineRequest(e, request);
    };


    componentDidMount() {

        const options = {
            method: "GET",
            withCredentials: true,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:8081",
            }
        };

        fetch('/api/admin/requests', options)
            .then((response) => {
                if (response.status === 405) {
                    AuthenticationService.logout();
                    this.props.history.push('/auth/login');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({requests: data})
            });

    }


    render() {
        const {requests} = this.state;


        const requestList = requests.map(request => {

            return <tr key={request.id}>
                <td>{request.username} </td>
                <td>{request.projectId}</td>
                <td>{request.status}</td>

                <td>


                    {
                        request.status === "PENDING" ? <td>
                                <Button onClick={e => this.declineRequest(e, request)} color="primary"
                                        type="submit">Decline</Button>{' '}
                                <Button onClick={e => this.approveRequest(e, request)} color="primary"
                                        type="submit">Approve</Button>{' '}

                            </td>
                            :
                            <td>
                                {
                                    request.status === "APPROVED" ? <td>
                                            <Button onClick={e => this.declineRequest(e, request)} color="primary"
                                                    type="submit">Cancel access</Button>{' '}

                                        </td>
                                        :
                                        <td><Button onClick={e => this.approveRequest(e, request)} color="primary"
                                                    type="submit">Grand access</Button>{' '}

                                        </td>
                                }
                            </td>
                    }



                </td>



            </tr>
        });

        return (
            <div>


                <Container fluid>


                    <h3>Requests</h3>
                    <hr></hr>
                    <br/>
                    <Table className="mt-4">
                        <thead>

                        <tr>
                            <th>Username</th>
                            <th>Project id</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requestList}
                        </tbody>
                    </Table>
                    <br/>
                    <br/>
                </Container>
            </div>
        );
    }
}

export default withRouter(AllRequests);