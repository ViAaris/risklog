import React, {Component, useRef, useState} from 'react';
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
        // contractors: "",
        // advisers: "",
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
                    <h1>Add new project</h1>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={item.title || ''}
                               onChange={this.handleChange} autoComplete="title"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" value={item.address || ''}
                               onChange={this.handleChange} autoComplete="address"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="budget">Budget</Label>
                        <Input type="text" name="budget" id="budget" value={item.budget || ''}
                               onChange={this.handleChange} autoComplete="budget"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="startingdate">Starting date</Label>
                        <Input type="date" name="startingDate" id="startingDate" value={item.startingDate || ''}
                               onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="finishingDate">Finishing date</Label>
                        <Input type="date" name="finishingDate" id="finishingDate" value={item.finishingDate || ''}
                               onChange={this.handleChange} />
                    </FormGroup>

                    {/*<FormGroup>*/}
                    {/*    <Label for="contractors">Contractors</Label>*/}
                    {/*    <Input type="text" name="contractors" id="contractors" value={item.contractors || ''}*/}
                    {/*           onChange={this.handleChange} />*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup>*/}
                    {/*    <Label for="advisers">Advisers</Label>*/}
                    {/*    <Input type="text" name="advisers" id="advisers" value={item.advisers || ''}*/}
                    {/*           onChange={this.handleChange} />*/}
                    {/*</FormGroup>*/}

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}

                    </FormGroup>
                </Form>
            </Container>

        </div>

    }
}

export default withRouter(AddProject);