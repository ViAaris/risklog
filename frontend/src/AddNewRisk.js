import React, { Component } from 'react';
//import './components/css/todo.css';
import {Button, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class AddNewRisk extends Component {

    emptyItem = {
        title: '',
        description: '',
        reason: '',
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

    handleSubmit(event) {

        event.preventDefault();
        const {item} = this.state;

        fetch('/api/projects/' + this.props.match.params.id + '/risks', {
            method: 'POST',
            headers: {
                "X-XSRF-TOKEN": this.csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response) => response.json())
            .then(this.props.history.push('/api/projects/' + this.props.match.params.id))
            .then(window.location.reload())
            .then((data) => {

                console.log(data);
            });
    }



    render() {
        const {item} = this.state;
        return <div>

            <Table className="mt-4">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Reason</th>
                    {/*<th>Starting date</th>*/}
                    {/*<th>Finishing date</th>*/}
                    {/*<th>Team</th>*/}
                </tr>
                </thead>

                <tbody>
                <Container>
                    <Form onSubmit={this.handleSubmit}>

                            <td>
                                <Input type="text" name="title" id="title" value={item.title || ''}
                                       onChange={this.handleChange} />
                            </td>


                            <td>
                                <Input type="text" name="description" id="description" value={item.description || ''}
                                       onChange={this.handleChange} />
                            </td>

                            <td>
                                <Input type="text" name="reason" id="reason" value={item.reason || ''}
                                       onChange={this.handleChange} />
                            </td>

                            <td>
                                <Button color="primary" type="submit">Save</Button>{' '}
                            </td>

                    </Form>
                </Container>
                </tbody>

            </Table>

        </div>

    }
}

export default withRouter(AddNewRisk);