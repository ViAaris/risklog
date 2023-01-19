import React, {Component} from "react";
import {Button, Form} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
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
        return <div className={"body"}>

            {this.state.errors.map((error) => <p style={{color: 'red', fontSize: '12px'}}
                                                 key={error.field}>{"Error in field " + error.field + " : " + error.message}</p>)
            }

            {/*{this.state.updated && <div>Project updated successfully</div>}*/}
            <div className={"form-box"}>
                <Form onSubmit={this.handleSubmit}>
                    <h1>Edit project id# {this.props.match.params.id}</h1>

                        <label for="id">ID</label>
                        <input type="text" name="id" id="id" value={item.id || ''}
                               onChange={this.handleChange} />

                        <label for="title">Title</label>
                        <input type="text" name="title" id="title" value={item.title || ''}
                               onChange={this.handleChange} autoComplete="title"/>

                        <label for="address">Address</label>
                        <input type="text" name="address" id="address" value={item.address || ''}
                               onChange={this.handleChange} autoComplete="address"/>

                        <label for="budget">Budget</label>
                        <input type="text" name="budget" id="budget" value={item.budget || ''}
                               onChange={this.handleChange} autoComplete="budget"/>

                        <label for="startingDate">Starting date</label>
                        <input type="date" name="startingDate" id="startingDate" value={item.startingDate || ''}
                               onChange={this.handleChange} />

                        <label for="finishingDate">Finishing date</label>
                        <input type="date" name="finishingDate" id="finishingDate" value={item.finishingDate || ''}
                               onChange={this.handleChange} />

                        <label for="contractors">Contractors</label>
                        <input type="text" name="contractors" id="contractors" value={item.contractors || ''}
                               onChange={this.handleChange} />

                        <label for="advisers">Advisers</label>
                        <input type="text" name="advisers" id="advisers" value={item.advisers || ''}
                               onChange={this.handleChange} />

                        <button className={"btn"} type="submit">Save</button>


                </Form>
            </div>

        </div>

    }
}

export default withRouter(EditProject);