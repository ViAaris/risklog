import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input} from 'reactstrap';



class OneRisk extends Component {


    emptyItem = {
        title: '',
        description: '',
        reason: ''
    };

    projectId;
    riskId;

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.riskId = this.props.riskId;
        this.projectId = this.props.projectId;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*Let's add the componentDidMount function to check whether we're dealing with the create or edit feature;
    in the case of editing, it'll fetch our client from the API:*/
    async componentDidMount() {
        const risk = await (await fetch(`/api/projects/${this.projectId}/risks/${this.riskId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:8081",
                }
            })).json();
        this.setState({item: risk});
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

        await fetch('/api/projects/' + this.projectId + '/risks/' + this.riskId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response) => {
            return response.json();

        }).then(data => {
            console.log(data);
        }).then(window.location.reload())
            .catch((error) => {
                console.error(error);
                this.setState({loading: true});
            });
    }

//our render function will be handling our form:
    render() {
        const {item} = this.state;

        return <div>

            <Container>

                <Form onSubmit={this.handleSubmit}>
                    {/*<FormGroup>*/}
                    {/*    <Input type="hidden" name="projectId" id="projectId" value={this.props.match.params.id}*/}
                    {/*           onChange={this.handleChange} />*/}
                    {/*</FormGroup>*/}
                    <td>
                        <FormGroup>
                            <Input type="text" name="title" id="title" value={item.title || ''}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </td>

                    <td>
                        <FormGroup>
                            <Input type="text" name="description" id="description" value={item.description || ''}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </td>

                    <td>
                        <FormGroup>
                            <Input type="text" name="reason" id="reason" value={item.reason || ''}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </td>

                    <td>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                        </FormGroup>
                    </td>
                </Form>
            </Container>
        </div>
    }
}


export default withRouter(OneRisk);