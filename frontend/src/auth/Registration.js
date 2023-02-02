import React, {Component} from 'react';
import {Button, Form} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import BottomBar from "../BottomBar";


class Registration extends Component {

    emptyItem = {
        username: "",
        firstName: "",
        surname: "",
        password: "",
        department: "",
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            // loading: false, // режим загрузки
            statusCode: null, // статус ответа
            message: "",
            usernameError: '',
            firstnameError: "",
            surnameError: "",
            passwordError: "",
            departmentError: "",
            errors: [],
            success: false,
            failed: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.onDropdownSelected = this.onDropdownSelected.bind(this);
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

        fetch('/auth/reg', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:3000",
            },
            body: JSON.stringify(item),
        }).then((response) => {
            this.setState({
                usernameError: "",
                firstnameError: "",
                surnameError: "",
                passwordError: "",
                departmentError: ""
            });

            if (response.status === 200) {
                this.setState({success: true});
            }
            return response.json();
        }).then(data => {
            if (data.fieldErrors) {
                //this.setState({errors: data.fieldErrors})
                data.fieldErrors.map((error) => {
                    if (error.field === 'username') {
                        this.setState({usernameError: error.message})
                    } else if (error.field === 'password') {
                        this.setState({passwordError: error.message})
                    } else if (error.field === 'firstName') {
                        this.setState({firstnameError: error.message})
                    } else if (error.field === 'surname') {
                        this.setState({surnameError: error.message})
                    } else if (error.field === 'department') {
                        this.setState({departmentError: error.message})
                    }
                })
            }

            console.log(data);
        })
            .catch((error) => {
                console.error(error);
                this.setState({loading: true});
            });

    }

    render() {


        const {item} = this.state;


        return <div className={"body"}>

            {this.state.success ? <div className="input-container ic3">
                <h3>User was registered successfully!</h3>
                    <button className="btn" > <Link to="/auth/login">Log in</Link></button>
                </div>
                :
                <div className={"form reg"}>
            {this.state.errors.map((error) => <p style={{color: 'red', fontSize: '12px'}}
                key={error.field}>{error.field + " " + error.message}</p>)
            }
                <Form onSubmit={this.handleSubmit}>
                <h1 className={"title"}>User Registration</h1>
                <div className="input-container ic1">
                <input id="username" className="input" type="text" placeholder="Username*" name="username"
                value={item.username || ''}
                onChange={this.handleChange} autoComplete="username"/>
                <div className="cut"></div>
            {
                this.state.usernameError ?
                    <div className={"error"}> {this.state.usernameError}</div> : ''
            }
                </div>


                <div className="input-container ic2">
                <input type="text" className="input" name="firstName" id="firstName"
                value={item.firstName || ''}
                onChange={this.handleChange} autoComplete="firstName" placeholder="First name*"/>
                <div className="cut"></div>
            {
                this.state.firstnameError ?
                    <div className={"error"}>{this.state.firstnameError}</div> : ''
            }
                </div>


                <div className="input-container ic2">
                <input type="text" className="input" name="surname" id="surname" value={item.surname || ''}
                onChange={this.handleChange} autoComplete="surname" placeholder="Surname*"/>
            {
                this.state.surnameError ?
                    <div className={"error"}>{this.state.surnameError}</div> : ''
            }
                </div>
                <div className="input-container ic2">
                <input id="password" className="input" type={"password"} name="password"
                value={item.password || ''}
                onChange={this.handleChange} autoComplete="password" placeholder="Password*"/>
                <div className="cut cut-short"></div>
            {
                this.state.passwordError ?
                    <div className={"error"}>{this.state.passwordError}</div> : ''
            }
                </div>

                <div className="input-container ic2">
                <select className="input" value={item.department || ''} placeholder={"Department*"}
                name="department" id="department"
                onChange={this.handleChange}
                        defaultValue={""}>
                <option hidden value="">Department*</option>
                <option value="Risks and planning">Risks and planning</option>
                <option value="Project management">Project management</option>
                </select>
            {
                this.state.departmentError ?
                    <div className={"error"}>{this.state.departmentError}</div> : ''
            }
                </div>

                <div className="input-container ic3">
                <button type="text" className="btn-submit">Submit</button>
                </div>

                </Form>
                <div className={"qst"}><h3>Already have an account?</h3>
                <a href={"/auth/login"}>Log in</a></div>
                </div>
            }  <BottomBar/>
        </div>

    }
}

export default withRouter(Registration);