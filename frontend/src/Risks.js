import React, {Component} from 'react';
import {Button, Container, Table} from 'reactstrap';

import {Link, withRouter} from 'react-router-dom';

import OneRisk from "./OneRisk";
import AddNewRisk from "./AddNewRisk";


class Risks extends Component {

    constructor(props) {
        super(props);
        this.state = {risks: []};

    }

    componentDidMount() {
        fetch(`/api/projects/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState({risks: data}));
    }

    render(){
        const {risks} = this.state;


        const risksList = risks.map(risk => {
            return  (<tr key={risk.id}>
               <OneRisk riskId = {risk.id}/>
            </tr>)
        });



        return (
            <div>
                <Container fluid>
                    <h3>Add new risk</h3>
                    <AddNewRisk/>
                    <Table className="mt-4">
                        <tbody>
                        {risksList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }


}

export default withRouter(Risks);
