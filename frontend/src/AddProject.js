import React, { Component } from 'react';
//import './components/css/todo.css';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class AddProject extends Component {

    emptyItem = {
        title: "",
        address: "",
        budget: "",
        startingDate: "",
        finishingDate: "",
        contractors: [],
        advisers: [],
        team: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {

        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/admin/new_project', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/api/admin/new_project');
    }



    render() {
        const {item} = this.state;
        return <div>

            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <h1>User Registration</h1>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="username" id="username" value={item.username || ''}
                               onChange={this.handleChange} autoComplete="username"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="firstName">First name</Label>
                        <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                               onChange={this.handleChange} autoComplete="firstName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Surname</Label>
                        <Input type="text" name="surname" id="surname" value={item.surname || ''}
                               onChange={this.handleChange} autoComplete="surname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" value={item.password || ''}
                               onChange={this.handleChange} autoComplete="password"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="department">Department :</Label>
                        <select value={item.department || ''} name="department" id="department"
                                onChange={this.handleChange}  >
                            <option>Select Department</option>
                            <option value="Risks and planning">Risks and planning</option>
                            <option value="Project management">Project management</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}

                    </FormGroup>
                </Form>
            </Container>

        </div>

    }
}

export default withRouter(Registration);