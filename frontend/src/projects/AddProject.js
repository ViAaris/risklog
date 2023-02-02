import React, {Component} from 'react';
import {Button, Form} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import '../App.css';
import AuthenticationService from "../auth/AuthenticationService";
import BottomBar from "../BottomBar";


class AddProject extends Component {

    emptyItem = {
        title: "",
        address: "",
        budget: "",
        startingDate: "",
        finishingDate: "",
        contractors: "",
        advisers: ""

    };

    componentDidMount() {

        fetch('/api/admin/projects', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(""),
        }).then(response => {
            if (response.status === 405) {
                AuthenticationService.logout();
                this.props.history.push('/auth/login');
            }
            if (response.status === 403) {
                this.setState({allowed: false});
            }
            return response.json();
        }).then(data => {
            this.setState({serverError: data.message})
        });

        // if((AuthenticationService.getAuthorities())[0] == "ROLE_ADMIN"){
        //     this.setState({allowed: true})
        // }
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            errors: [],
            success: false,
            allowed: true,
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

    async handleSubmit(event) {

        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/admin/projects', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then(response => {
            this.setState({errors: []});

            if (response.status === 200) {
                this.setState({success: true});
            }
            return response.json();
        }).then(data => {
            if (data.fieldErrors) {
                this.setState({errors: data.fieldErrors})
            }
        });
        this.props.history.push('/api/admin/projects');
    }


    render() {
        const {item} = this.state;
        return <div className={"body"}>

            {!this.state.allowed ? <h3>You don't have access for this page</h3>
                :
                <div> {this.state.success ? <div className="input-container ic3">
                        <h3>Project added successfully</h3>
                        <button className="btn-add"><Link to="/api/projects">Back to all projects</Link></button>
                    </div>
                    :
                    <div className="card">

                            <h1 className="title">Add project</h1>
                        {this.state.errors.map((error) => <p style={{color: 'red', fontSize: '12px'}}
                                                             key={error.field}>{"Error in field " + error.field + " : " + error.message}</p>)
                        }
                        <Form className="card-form" onSubmit={this.handleSubmit}>
                            <div className="input1">
                                <input type="text" className="input-field" name="title" id="title" placeholder={"a"}
                                                               value={item.title || ''}
                                                               onChange={this.handleChange} />
                                <label className="input-label">Title</label>
                            </div>
                            <div className="input1">
                                <input type="text" className="input-field" name="address" id="address" placeholder={"a"}
                                       value={item.address || ''}
                                       onChange={this.handleChange}/>
                                <label className="input-label">Address</label>
                            </div>
                            <div className="input1">

                                <input type="text" className="input-field" name="budget" id="budget" value={item.budget || ''}
                                       onChange={this.handleChange} placeholder={"a"}/>
                                <label className="input-label">Budget, kr.</label>
                            </div>

                            <div className={"input1"}>
                                <input className="input-field" type="date" name="startingDate" id="startingDate"
                                       value={item.startingDate || ''}
                                       onChange={this.handleChange} placeholder={"a"}/>
                                <label className="input-label">Starting date</label>
                            </div>


                    <div className="input1">
                    <input className="input-field" type="date" name="finishingDate" id="finishingDate"
                    value={item.finishingDate || ''}
                    onChange={this.handleChange} placeholder={"a"}/>
                        <label className="input-label">Finishing date</label>
                    </div>

                    <div className="input1">

                    <input className="input-field" type="text" name="contractors" id="contractors"
                    value={item.contractors || ''}
                    onChange={this.handleChange} placeholder={"a"}/>
                        <label className="input-label">Contractors</label>

                    </div>
                    <div className="input1">

                    <input className="input-field" type="text" name="advisers" id="advisers"
                    value={item.advisers || ''}
                    onChange={this.handleChange} placeholder={"a"}/>
                        <label className="input-label">Advisers</label>
                    </div>
                            <div className="input-container ic3">
                                <button className="btn">Add</button>
                            </div>
                        </Form>
                    </div>
                    // <div className={"card"}>
                    //     <div className={"card-form"}>

                    //         <Form onSubmit={this.handleSubmit}>
                    //             <h1 className={"title"}>Add new project</h1>
                    //             <div className="input">
                    //                     <input className="input-field" type="text" name="title" id="title"
                    //                            value={item.title || ''}
                    //                            onChange={this.handleChange} autoComplete="title"/>
                    //                     <label className="input-label">Full name</label>
                    //             </div>
                    //             <div className="input">

                                        // <input className="input-field" type="text" name="address" id="address"
                                        //        value={item.address || ''}
                                        //        onChange={this.handleChange} autoComplete="address"/>
                    //
                    //                     <label className="input-label">Full name</label>
                    //
                    //                 {/*<div className="input-container ic2">*/}
                    // //
                    //                     <input className="input" type="text" name="budget" id="budget" value={item.budget || ''}
                    //                            onChange={this.handleChange} autoComplete="budget"/>
                    //                     <div className="cut"></div>

                    //                 {/*</div>*/}
                    //                 {/*<div className="input-container ic2">*/}
                    //

                    //
                    //
                    //                 {/*</div>*/}
                    //                 {/*<div className="input-container ic3">*/}
                    //                 {/*    <button type="submit" className={"btn"}>Save</button>*/}
                    //                 {/*</div>*/}
                    //             </div>
                    //         </Form>
                    //     </div>
                    // </div>
                }<BottomBar/>
                </div>
            }
        </div>
    }

}

export default withRouter(AddProject);