import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';





class OneRisk extends Component {


    emptyItem = {
        id: '',
        title: '',
        description: '',
        reason: '',
        // category: '',
        // consequences: '',
        // probability: '',
        // minCost: '',
        // midCost: '',
        // maxCost: '',
        // value: '',
        // owner: '',
        // actions: '',
        // isActive: ''
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

    render() {
        const {item} = this.state;
        const columns = [
            { field: 'id', fieldName: '#' },
            { field: 'title', fieldName: 'Title' },
            { field: 'description', fieldName: 'Description' },
            { field: 'reason', fieldName: 'Reason' },
        ];


        return <div>


            {/*<Container>*/}

            {/*    <Form onSubmit={this.handleSubmit}>*/}

            {/*            <FormGroup>*/}
            {/*                <Input type="text" name="title" id="title" value={item.title || ''}*/}
            {/*                       onChange={this.handleChange}/>*/}
            {/*            </FormGroup>*/}
            {/*        </td>*/}

            {/*        <td>*/}
            {/*            <FormGroup>*/}
            {/*                <Input type="text" name="description" id="description" value={item.description || ''}*/}
            {/*                       onChange={this.handleChange}/>*/}
            {/*            </FormGroup>*/}
            {/*        </td>*/}

            {/*        <td>*/}
            {/*            <FormGroup>*/}
            {/*                <Input type="text" name="reason" id="reason" value={item.reason || ''}*/}
            {/*                       onChange={this.handleChange}/>*/}
            {/*            </FormGroup>*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <Input type="text" name="category" id="category" value={item.category || ''}*/}
            {/*                   onChange={this.handleChange} />*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <Input type="text" name="consequences" id="consequences" value={item.consequences || ''}*/}
            {/*                   onChange={this.handleChange} />*/}
            {/*        </td>*/}
            {/*        <th>*/}
            {/*            <Input type="text" name="probability" id="probability" value={item.probability || ''}*/}
            {/*                   onChange={this.handleChange} />*/}
            {/*        </th>*/}
            {/*        <th>*/}
            {/*            <Input type="text" name="minCost" id="minCost" value={item.minCost || ''}*/}
            {/*                   onChange={this.handleChange} />*/}
            {/*        </th>*/}
            {/*        <th>*/}
            {/*            <Input type="text" name="midCost" id="midCost" value={item.midCost || ''}*/}
            {/*                   onChange={this.handleChange} />*/}
            {/*        </th>*/}
            {/*        <th>*/}
            {/*            <Input type="text" name="maxCost" id="maxCost" value={item.maxCost || ''}*/}
            {/*                   onChange={this.handleChange} />*/}
            {/*        </th>*/}
            {/*        <th>*/}
            {/*            <Input type="text" name="value" id="value" value={item.value || ''}*/}
            {/*                   onChange={this.handleChange} />*/}
            {/*        </th>*/}
            {/*        <th>*/}
            {/*            <Input type="text" name="owner" id="owner" value={item.owner || ''}*/}
            {/*                   onChange={this.handleChange} />*/}
            {/*        </th>*/}
            {/*        <th>*/}
            {/*            <Input type="text" name="actions" id="actions" value={item.actions || ''}*/}
            {/*                   onChange={this.handleChange} />*/}
            {/*        </th>*/}
            {/*        <th>*/}
            {/*            <Input type="text" name="isActive" id="isActive" value={item.isActive || ''}*/}
            {/*                   onChange={this.handleChange} />*/}
            {/*        </th>*/}
            {/*        <td>*/}
            {/*            <FormGroup>*/}
            {/*                <Button color="primary" type="submit">Save</Button>{' '}*/}
            {/*            </FormGroup>*/}
            {/*        </td>*/}
            {/*    </Form>*/}
            {/*</Container>*/}


        </div>
    }
}


export default withRouter(OneRisk);