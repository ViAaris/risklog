import React, { Component } from 'react';
import {Button, Container, Form, FormGroup, Table} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import {Link, withRouter} from 'react-router-dom';

import AuthenticationService from "./AuthenticationService";
import {Logout} from "./Logout";
import {SendRequest} from "./SendRequest";





class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            showMessage: false
        };
       this.requestIsSent = this.requestIsSent.bind(this)
    }

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

        fetch('/api/projects', options)
            .then((response) =>{
                if(response.status == 405){
                    AuthenticationService.logout();
                    this.props.history.push('/auth/login');
                }
                return response.json();
            })
                .then(data => {
                    console.log(data);
                    this.setState({projects: data})
                });

    }

    requestIsSent = (e, id) => {
        this.setState({showMessage: true});
        SendRequest(e, id);
    };




    render() {
        const {projects} = this.state;


        const projectList = projects.map(project => {

            let team = project.team;
            return <tr key={project.id}>
                <td style={{whiteSpace: 'nowrap'}}>{project.title} </td>
                <td>{project.address}</td>
                <td>{project.budget}</td>
                <td>{project.startingDate}</td>
                <td>{project.finishingDate}</td>
                <td>{project.team.map(user => {
                    return <tr key={user.id}>
                    <div>{user.firstName}</div>
                    </tr>
                })}</td>
                <td>

                    <Button size="sm" color="primary" tag={Link} to={"/api/projects/" + project.id + "/risks"}>Risks</Button>

                </td>

                {
                    !this.state.showMessage &&
                    <td>
                        <Button onClick={e => this.requestIsSent(e, project.id)} color="primary" type="submit">Send
                            request</Button>{' '}

                    </td>
                }
                {this.state.showMessage && <p>Your request was sent to the administrator</p>}

            </tr>
        });

        return (
            <div>


                <Container fluid>

                    {
                        AuthenticationService.getAuthorities()[0] === "ROLE_ADMIN" ?
                            <div className="float-right">
                                <Button color="success" tag={Link} to="/api/admin/projects">Add Project</Button>
                            </div>  : ''
                    }


                    <h3>Projects</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Address</th>
                            <th>Budget</th>
                            <th>Starting date</th>
                            <th>Finishing date</th>
                            <th>Team</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectList}

                        </tbody>
                    </Table>

                    <div className="float-right">
                        <Form onSubmit={(e) => Logout(e)}>
                            <FormGroup>
                                <Button color="primary" type="submit">logout</Button>{' '}
                            </FormGroup>
                        </Form>
                    </div>
                </Container>
            </div>
        );
    }
}
export default withRouter(ProjectList);