import React, {Component} from 'react';
import {Button, Container, Table} from 'reactstrap';

import {Link, withRouter} from 'react-router-dom';

import OneRisk from "./OneRisk";
import AddNewRisk from "./AddNewRisk";
import * as state from "react-dom/test-utils";


class Risks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            risks: [],
            serverStatus: '',
            error:''
        };

    }

    componentDidMount() {
        fetch(`/api/projects/${this.props.match.params.id}`)
            .then(response =>{
                if(response.status != 200){
                    this.setState({serverStatus: response.status})
                }
                return response.json()
            } )
            .then(data => {
                if(!this.state.serverStatus){
                    this.setState({risks: data});
                }else{
                    this.setState({error: data.error})
                }
            });
    }

    render(){

        if(this.state.serverStatus){
        return (
            <p>{this.state.error}</p>
        )
    }
        const {risks} = this.state;


        const risksList = risks.map(risk => {
            return  (<tr key={risk.id}>
               <OneRisk riskId = {risk.id}/>
            </tr>)
        });



        return (
            <div>


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
            </div>
        );
    }


}

export default withRouter(Risks);
