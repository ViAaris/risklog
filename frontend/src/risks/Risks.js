import React, {Component} from 'react';
import {Container, Table} from 'reactstrap';

import {withRouter} from 'react-router-dom';

import OneRisk from "./OneRisk";
import AddNewRisk from "./AddNewRisk";



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
        fetch(`/api/projects/${this.props.match.params.id}/risks`,
            {
                method: "GET",
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:8081",
                }
            }
                )
            .then(response =>{
                if(response.status !== 200){
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
            let id = risk.id;
            return  (<tr key={risk.id}>
               <OneRisk projectId = {this.props.match.params.id} riskId = {id}/>
            </tr>)
        });



        return (
            <div>


            <div>
                <Container fluid>
                    <h3>Add new risk</h3>
                    <AddNewRisk/>
                    <br/>
                    <br/>
                    <hr/>
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
