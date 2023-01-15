import React, {Component} from 'react';
import {Button, Form} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';


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
                departmentError: ""});

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

        if (this.state.success) {
            return (<p>User registered successfully!
                <br/>
                <br/>
                <Button size="sm" color="primary" tag={Link} to={"/auth/login"}>Log in</Button>
            </p>);
        }


        const {item} = this.state;


        return <div className={"body"}>
            <div className={"form-box"}>
            {this.state.errors.map((error) => <p style={{color: 'red', fontSize: '12px'}}
                                                 key={error.field}>{error.field + " " + error.message}</p>)
            }


                <Form onSubmit={this.handleSubmit}>
                    <h1>User Registration</h1>

                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" value={item.username || ''}
                               onChange={this.handleChange} autoComplete="username"/>
                        {
                            this.state.usernameError ?
                                <span style={{color: 'red', fontSize: '12px'}}>{this.state.usernameError}</span> : ''
                        }

                        <label for="firstName">First name</label>
                        <input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                               onChange={this.handleChange} autoComplete="firstName"/>
                        {
                            this.state.firstnameError ?
                                <span style={{color: 'red', fontSize: '12px'}}>{this.state.firstnameError}</span> : ''
                        }

                        <label for="surname">Surname</label>
                        <input type="text" name="surname" id="surname" value={item.surname || ''}
                               onChange={this.handleChange} autoComplete="surname"/>
                        {
                            this.state.surnameError ?
                                <span style={{color: 'red', fontSize: '12px'}}>{this.state.surnameError}</span> : ''
                        }

                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" value={item.password || ''}
                               onChange={this.handleChange} autoComplete="password"/>
                        {
                            this.state.passwordError ?
                                <span style={{color: 'red', fontSize: '12px'}}>{this.state.passwordError}</span> : ''
                        }

                        <label for="department">Department :</label>
                        <select value={item.department || ''} name="department" id="department"
                                onChange={this.handleChange}>
                            <option></option>
                            <option value="Risks and planning">Risks and planning</option>
                            <option value="Project management">Project management</option>
                        </select>
                        {
                            this.state.departmentError ?
                                <span style={{color: 'red', fontSize: '12px'}}>{this.state.departmentError}</span> : ''
                        }

                        <button type="submit" className={"btn"}>Save</button>


                </Form>
            </div>

        </div>

    }
}

export default withRouter(Registration);