import React, { Component } from 'react';
import {Button, Container, Form, FormGroup, Table} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import {Link, withRouter} from 'react-router-dom';

import AuthenticationService from "./AuthenticationService";
import {Logout} from "./Logout";





class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = {projects: []};
    }

    componentDidMount() {

        const options = {
            method: "GET",
            withCredentials: true,
            headers: {
                // "X-XSRF-TOKEN": this.csrfToken,
                // "Authorization": AuthenticationService.createBasicAuthToken(this.state.username, this.state.password),
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                // "Access-Control-Allow-Headers":"Authorization, Content-Type, X-XSRF-TOKEN",
                "Access-Control-Allow-Origin": "http://localhost:8081",
                // "X-Requested-With": "XMLHttpRequest",
            }
        };

        fetch('/api/projects', options)
            // .then(function (response) {
            //     console.log(response.status);
            //     if (response.status !== 200) {
            //         this.props.history.push('/auth/login');
            //     }
            //
            // }
            .then((response) =>{
                if(response.status == 405){
                    AuthenticationService.logout();
                    this.props.history.push('/auth/login');
                }
                return response.json();
            })
                .then(data => this.setState({projects: data}));

    }




    render() {
        const {projects} = this.state;

        const useHasRoles =(roleNames)=>{
            const roles = useUser();
            if (typeof roleNames === "string") {
                //check whether current user has specific role or not
                return true/false
                } else if (Array.isArray(roleNames)) {
            // check if current user has all roles specified in roleNames
                // return true/false
                } else {  return false;  }
        }

        const useUser = ()=>{
            //get current user details and roles.
            return {roles:[]}
        }



        const projectList = projects.map(project => {
            return <tr key={project.id}>
                <td style={{whiteSpace: 'nowrap'}}>{project.title} </td>
                <td>{project.address}</td>
                <td>{project.budget}</td>
                <td>{project.startingDate}</td>
                <td>{project.finishingDate}</td>
                <td>{project.team}</td>

                <td>

                        <Button size="sm" color="primary" tag={Link} to={"/api/projects/" + project.id}>Risks</Button>

                </td>
            </tr>
        });

        return (
            <div>


                <Container fluid>

                    {
                        localStorage.getItem(localStorage.getItem("username")) == "ROLE_ADMIN" ?
                            <div className="float-right">
                                <Button color="success" tag={Link} to="/api/admin/new_project">Add Project</Button>
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
                        {/*<Form onSubmit={Logout}>*/}


                        <Form onSubmit={(e) => Logout(e)}>
                            <FormGroup>
                                <Button color="primary" type="submit">logout</Button>{' '}
                            </FormGroup>
                        </Form>
                        {/*<Button color="success" tag={Link} to="/perform_logout">logout</Button>*/}


                    </div>
                </Container>
            </div>
        );
    }
}
export default withRouter(ProjectList);