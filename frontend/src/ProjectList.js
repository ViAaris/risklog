import React, { Component } from 'react';
import {Button, Container, Form, FormGroup, Table} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import {Link, withRouter} from 'react-router-dom';

import AuthenticationService from "./AuthenticationService";
import {Logout} from "./Logout";
import {SendRequest} from "./SendRequest";
import {bgBG} from "@mui/material/locale";





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
                <td>{project.title} </td>
                <td>{project.address}</td>
                <td>{project.budget}</td>
                <td>{project.startingDate}</td>
                <td>{project.finishingDate}</td>

                <td>{project.team.map(user => {
                    return <td key={user.id}>
                    <div>{user.username} |</div>
                    </td>
                })}</td>
                <td>{project.contractors}</td>
                <td>{project.advisers}</td>


                <td>
                    <Button color="primary"  tag={Link} to={"/api/projects/" + project.id + "/risks"}>Risks</Button>
                </td>


                {
                    !this.state.showMessage &&
                    <td>
                        <Button onClick={e => this.requestIsSent(e, project.id)} color="primary" type="submit">Send
                            request</Button>{' '}

                    </td>
                }
                <td>{this.state.showMessage && <p>Your request was sent to the administrator</p>}</td>

                <td>{
                    AuthenticationService.getAuthorities()[0] === "ROLE_ADMIN" ?
                        <div className="float-right">
                            <Button color="success" tag={Link} to={'/api/admin/projects/'+ project.id}>Edit Project</Button>
                        </div>  : ''
                }</td>

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
                    <hr></hr>
                    <br/>
                    <Table className="mt-4">
                        <thead>

                        <tr>
                            <th>Title</th>
                            <th>Address</th>
                            <th>Budget</th>
                            <th>Starting date</th>
                            <th>Finishing date</th>
                            <th width={500}>Team</th>
                            <th>Contractors</th>
                            <th>Advisers</th>
                            <th>Risks</th>
                            <th>Request access</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectList}
                        </tbody>
                    </Table>
                    <br/>
                    <br/>
                    <div className="float-right">
                        <Form onSubmit={(e) => Logout(e)}>
                            <FormGroup>
                                <Button type="submit">Logout</Button>{' '}
                            </FormGroup>
                        </Form>
                    </div>
                </Container>
            </div>
        );
    }
}
export default withRouter(ProjectList);