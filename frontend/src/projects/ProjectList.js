import React, {Component} from 'react';
import {Button, Container, Form, FormGroup} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import '../App.css';
import AuthenticationService from "../auth/AuthenticationService";
import {Logout} from "../auth/Logout";
import {SendRequest} from "../requests/SendRequest";
import BottomBar from "../BottomBar";


class ProjectList extends Component {
    authorities = [];

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            showMessage: false,
            requestId: "",
            allowedProjects: this.authorities
        };
        this.requestIsSent = this.requestIsSent.bind(this)

    }


    componentDidMount() {
        AuthenticationService.getAuthorities().forEach((authority, index) => {
            if (index !== 0) {
                this.authorities.push(authority);
            }
        })
        console.log(this.authorities);

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
            .then((response) => {
                if (response.status === 405) {
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
        this.setState({showMessage: true, requestId: id});
        SendRequest(e, id);
    };

    async remove(id) {
        await fetch(`/api/admin/projects/` + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                let updatedProjects = [...this.state.projects].filter(i => i.id !== id);
                this.setState({projects: updatedProjects});
            }
        });
    }

    isFound(val) {
        let res;
        this.authorities.map(element => {

            //console.log(element, val, parseInt(element) === parseInt(val))
            res = (parseInt(element) === parseInt(val));
        });
        console.log(!res);
        return !res;
    }

    render() {

        const {projects} = this.state;


        const projectList = projects.map(project => {

            return <tr key={project.id}>
                <td>{project.title} </td>
                <td>{project.address}</td>
                <td>{project.budget}</td>
                <td>{project.startingDate}</td>
                <td>{project.finishingDate}</td>

                <td>{project.team.map(user => {
                    return <td key={user.id}>
                        <div>{user.fullName}</div>
                    </td>
                })}</td>
                <td>{project.contractors}</td>
                <td>{project.advisers}</td>

                <td>

                    {this.state.showMessage && this.state.requestId === project.id
                                    ?
                                    <p>Your request was sent to the administrator</p>
                                    :

                                    this.isFound(project.id) && AuthenticationService.getAuthorities()[0] !== "ROLE_ADMIN"
                                        ?

                                            <Button className={"btn-risks"}
                                                    onClick={e => this.requestIsSent(e, project.id)}
                                                    type="submit">
                                                Require access
                                            </Button>
                                         :
                                                <Button className={"btn-risks"} tag={Link}
                                                        to={"/api/projects/" + project.id + "/risks"}>Risk
                                                    log</Button>



                    }
                </td>


                    {

                        AuthenticationService.getAuthorities()[0] === "ROLE_ADMIN"
                        ? <td><div className={"buttons"}>
                            <a href={'/api/admin/projects/' + project.id} className={"btn-edit-pr"}>Edit</a>
                            <a className={"btn-delete"} onClick={() => this.remove(project.id)}>Delete</a>
                        </div></td>:null

                    }



            </tr>
        });

        return (


            <div className={"body"}>

                <div className={"main"}>
                    <ul>
                        {AuthenticationService.getAuthorities()[0] === "ROLE_ADMIN" ?
                            <li>
                                <a href={"/api/admin/projects"}><span>Add project</span></a>
                            </li> : ""}
                    </ul>
                </div>
                <div className={"projects"}>

                    <h1>Projects</h1>
                    <table className="table">
                        <thead>

                        <tr>
                            <th>Title</th>
                            <th>Address</th>
                            <th>Budget, kr.</th>
                            <th>Starting date</th>
                            <th>Finishing date</th>
                            <th width={500}>Team</th>
                            <th>Contractors</th>
                            <th>Advisers</th>
                            <th>Risks</th>
                            {AuthenticationService.getAuthorities()[0] === "ROLE_ADMIN" ?
                                 <th> Edit/delete </th> : ''}
                        </tr>
                        </thead>
                        <tbody>
                        {projectList}
                        </tbody>
                    </table>

                    <br/>
                    <br/>
                    <div>

                    </div>

                </div>
                <BottomBar/>
            </div>

        );
    }
}

export default withRouter(ProjectList);