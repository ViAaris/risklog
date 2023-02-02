import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import '../App.css';
import AuthenticationService from "../auth/AuthenticationService";

import {ApproveRequest} from "./ApproveRequest";
import {DeclineRequest} from "./DeclineRequest";
import BottomBar from "../BottomBar";



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

            return  <tr key={request.id}>

                <td>{request.username} </td>
                <td>{request.projectId}</td>
                <td>{request.status}</td>

                <td>


                    {
                        request.status === "PENDING" ? <td>
                                <button onClick={e => this.declineRequest(e, request)} className={"btn-delete"}
                                        type="submit">Decline</button>{' '}
                                <button onClick={e => this.approveRequest(e, request)} className={"btn-edit-pr"}
                                        type="submit">Approve</button>{' '}

                            </td>
                            :
                            <td>
                                {
                                    request.status === "APPROVED" ? <td>
                                            <button onClick={e => this.declineRequest(e, request)} className={"btn-cancel"}
                                                    type="submit">Cancel access</button>{' '}

                                        </td>
                                        :
                                        <td><button onClick={e => this.approveRequest(e, request)} className={"btn-grand"}
                                                    type="submit">Grand access</button>{' '}

                                        </td>
                                }
                            </td>
                    }
                </td>
            </tr>
        });

        return (
            <div className={"body"}>

                <h2>Requests</h2>
                    <table className="tableRequests">
                        <thead>

                        <tr >
                            <th width={25}>Username</th>
                            <th width={5}>Project id</th>
                            <th width={25}>Status</th>
                            <th width={45}>Action</th>
                        </tr>
                        </thead>
                        <tbody >
                        {requestList}
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                <BottomBar/>
            </div>
        );
    }
}

export default withRouter(AllRequests);