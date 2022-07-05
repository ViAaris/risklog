import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import ProjectList from "./ProjectList";

class OneRisk extends Component {

    emptyItem = {
        title: '',
        description: '',
        reason: '',
        // category: '',
        // consequences: '',
        // changingDate: '',
        // probability: '',
        // minCost: '',
        // midCost: '',
        // maxCost: '',
        // value: '',
        // owner: '',
        // actions: '',
        // isActive: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*Let's add the componentDidMount function to check whether we're dealing with the create or edit feature;
    in the case of editing, it'll fetch our client from the API:*/
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const risks = await (await fetch(`/api/projects/${this.props.match.params.id}/risks/`)).json();
            this.setState({item: risks});
        }
    }
    /*Then in the handleChange function, we'll update our component
    state item property that will be used when submitting our form:*/
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }
    /*In handeSubmit, we'll call our API, sending the request to a PUT or POST method depending on the feature we're invoking.
    For that, we can check if the id property is filled:*/
    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/projects/' + this.props.match.params.id + '/risks/' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push(`/api/projects/${this.props.match.params.id}`);
    }

//our render function will be handling our form:
    render() {
        const {item} = this.state;
        const title = <h2>Risk log</h2>;

        return <div>

                <Table>
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
                    <tr>
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
                    </td></tr>

                </Form>
                    </Container>
                    </tbody>

                </Table>

        </div>
    }
}


export default withRouter(OneRisk);