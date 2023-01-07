import React, {Component} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import AppNavbar from "../AppNavbar";
import '../App.css';
class EditProject extends Component {

    emptyItem = {
        id:"",
        title: "",
        address: "",
        budget: "",
        startingDate: "",
        finishingDate: "",
        team:[],
        contractors: "",
        advisers: ""
    };

    async componentDidMount() {
        // fetch('/api/admin/projects/' + this.props.match.params.id, {
        //     method: 'PUT',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(""),
        // }).then(response=>{
        //     if (response.status == 403) {
        //         this.setState({allowed: false});
        //     }
        //     return response.json();
        // }).then(data=>{
        //     this.setState({serverError: data.message})
        // });

        // if((AuthenticationService.getAuthorities())[0] == "ROLE_ADMIN"){
        //     this.setState({allowed: true})
        // }

        const project = await (await fetch(`/api/projects/${this.props.match.params.id}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:8081",
                }
            })
            .then(response=>{
                if (response.status === 403) {
                    this.setState({allowed: false});
                }
                return response.json();
            }));
        this.setState({item: project});

    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            errors: [],
            success: false,
            allowed:true,
            serverMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleSubmit(event) {

        event.preventDefault();
        const {item} = this.state;

        fetch('/api/admin/projects/' + this.props.match.params.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then(response=>{
            this.setState({errors:[]});
            if (response.status === 200) {
                this.setState({success: true});
            }
            return response.json();
        }).then(data=>{
            if (data.fieldErrors) {
                this.setState({errors: data.fieldErrors})
            }
        });

    }



    render() {
        if (this.state.success) {
            return (<p>Project updated successfully!
                <br/>
                <br/>
                <Button size="sm" color="primary" tag={Link} to={"/api/projects"}>Back to all projects</Button>
            </p>);
        }
        const {item} = this.state;
        if(!this.state.allowed){
            return <p>You don't have access for this page</p>
        }
        return <div>
            <AppNavbar/>
            {this.state.errors.map((error) => <p style={{color: 'red', fontSize: '12px'}}
                                                 key={error.field}>{error.field + " " + error.message}</p>)
            }

            {/*{this.state.updated && <div>Project updated successfully</div>}*/}
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <h1>Edit project id# {this.props.match.params.id}</h1>
                    <FormGroup>
                        <Label for="id">ID</Label>
                        <Input type="text" name="id" id="id" value={item.id || ''}
                               onChange={this.handleChange} />
                    </FormGroup>
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
                        <Label for="startingDate">Starting date</Label>
                        <Input type="date" name="startingDate" id="startingDate" value={item.startingDate || ''}
                               onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="finishingDate">Finishing date</Label>
                        <Input type="date" name="finishingDate" id="finishingDate" value={item.finishingDate || ''}
                               onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="contractors">Contractors</Label>
                        <Input type="text" name="contractors" id="contractors" value={item.contractors || ''}
                               onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="advisers">Advisers</Label>
                        <Input type="text" name="advisers" id="advisers" value={item.advisers || ''}
                               onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}

                    </FormGroup>
                </Form>
            </Container>

        </div>

    }
}

export default withRouter(EditProject);