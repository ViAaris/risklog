import React, {Component} from 'react';
import {Button, Container} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import '../App.css';
import AuthenticationService from "../auth/AuthenticationService";
import BottomBar from "../BottomBar";


class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],

        };

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

        fetch('/api/admin/users', options)
            .then((response) => {
                if (response.status === 405) {
                    AuthenticationService.logout();
                    this.props.history.push('/auth/login');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({users: data})
            });

    }


    async remove(id) {
        await fetch(`/api/admin/users/` + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                let updatedUsers = [...this.state.users].filter(i => i.id !== id);
                this.setState({users: updatedUsers});
            }
        });
    }


    render() {
        const {users} = this.state;


        const userList = users.map(user => {

            return <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.firstName} {user.surname} </td>
                <td>{user.department}</td>


                <td>{user.projects.map(project => {
                    return <td key={project.id}>
                        <div>{project.title}</div>
                    </td>
                })}</td>


                <td>
                    <Button tag={Link} to={"/api/admin/users/" + user.id} className={"btn-edit-pr"}>Edit user</Button>
                </td>
                <td>
                    <Button className={"btn-delete"} onClick={() => this.remove(user.id)}>Delete</Button>
                </td>

            </tr>
        });

        return (


            <div className={"body"}>

                <Container fluid>


                    <h2>Users</h2>
                    <hr></hr>
                    <br/>
                    <table className="table">
                        <thead>

                        <tr>
                            <th>Username</th>
                            <th>Full name</th>
                            <th>Department</th>
                            <th width={500}>Projects</th>
                            <th> </th>
                            <th> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList}
                        </tbody>
                    </table>

                </Container>
                <BottomBar/>
            </div>

        );
    }
}

export default withRouter(Users);