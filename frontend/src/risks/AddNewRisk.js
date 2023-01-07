import React, { Component } from 'react';
import {Button, Container, Form, Input, Table} from 'reactstrap';
import { withRouter } from 'react-router-dom';

class AddNewRisk extends Component {

    emptyItem = {
        title: '',
        description: '',
        reason: '',
        category: '',
        consequences: '',
        probability: '',
        minCost: '',
        midCost: '',
        maxCost: '',
        value: '',
        owner: '',
        actions: '',
        isActive: '',
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
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response) => response.json())
            .then(this.props.history.push('/api/projects/' + this.props.match.params.id + "/risks"))
            //.then(window.location.reload())
            .then((data) => {

                console.log(data);
            });
    }



    render() {
        const {item} = this.state;
        return <div>

            <Table className="mt-4" >
                <thead>

                </thead>
                <Container >

                    <Form onSubmit={this.handleSubmit} >

                            <th>
                                <Input type="text" name="title" id="title" value={item.title || ''}
                                       onChange={this.handleChange} />
                            </th>


                            <th>
                                <Input type="text" name="description" id="description" value={item.description || ''}
                                       onChange={this.handleChange} />
                            </th>

                            <th>
                                <Input type="text" name="reason" id="reason" value={item.reason || ''}
                                       onChange={this.handleChange} />
                            </th>
                        <th>
                            <Input type="text" name="category" id="category" value={item.category || ''}
                                   onChange={this.handleChange} />
                        </th>
                        <th>
                            <Input type="text" name="consequences" id="consequences" value={item.consequences || ''}
                                   onChange={this.handleChange} />
                        </th>
                        <th>
                            <Input type="text" name="probability" id="probability" value={item.probability || ''}
                                   onChange={this.handleChange} />
                        </th>
                        <th>
                            <Input type="text" name="minCost" id="minCost" value={item.minCost || ''}
                                   onChange={this.handleChange} />
                        </th>
                        <th>
                            <Input type="text" name="midCost" id="midCost" value={item.midCost || ''}
                                   onChange={this.handleChange} />
                        </th>
                        <th>
                            <Input type="text" name="maxCost" id="maxCost" value={item.maxCost || ''}
                                   onChange={this.handleChange} />
                        </th>
                        <th>
                            <Input type="text" name="value" id="value" value={item.value || ''}
                                   onChange={this.handleChange} />
                        </th>
                        <th>
                            <Input type="text" name="owner" id="owner" value={item.owner || ''}
                                   onChange={this.handleChange} />
                        </th>
                        <th>
                            <Input type="text" name="actions" id="actions" value={item.actions || ''}
                                   onChange={this.handleChange} />
                        </th>
                        <th>
                            <Input type="text" name="isActive" id="isActive" value={item.isActive || ''}
                                   onChange={this.handleChange} />
                        </th>
                            <th>
                                <Button color="primary" type="submit">Save</Button>{' '}
                            </th>

                    </Form>
                </Container>



            </Table>

        </div>

    }
}

export default withRouter(AddNewRisk);