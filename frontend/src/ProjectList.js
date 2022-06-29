import React, { Component } from 'react';
import { Button, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';


class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = {projects: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/api/projects')
            .then(response => response.json())
            .then(data => this.setState({projects: data}));
    }
    async remove(id) {
        await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedEmployees = [...this.state.projects].filter(i => i.id !== id);
            this.setState({projects: updatedEmployees});
        });
    }


    render() {
        const {projects, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
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
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/auth/reg">Add Client</Button>
                    </div>
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
                </Container>
            </div>
        );
    }
}
export default withRouter(ProjectList);