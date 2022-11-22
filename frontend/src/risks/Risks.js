import React, {Component} from 'react';
import {Button, Container, Table} from 'reactstrap';

import {Link, withRouter} from 'react-router-dom';

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
            <div >


            <div>
                <Container fluid>
                    <Table className="mt-4" border={1} >
                        <thead>
                    <h3>Add new risk</h3>
                        </thead>
                    <AddNewRisk/>

                        <tr>
                    <h3>Risk log</h3>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Reason</th>
                                <th>Category</th>
                                <th>Consequences</th>
                                <th>Probability</th>
                                <th>Min cost</th>
                                <th>Mid cost</th>
                                <th>Max cost </th>
                                <th>Value</th>
                                <th>Owner</th>
                                <th>Actions</th>
                                <th>Active</th>
                                <br/>
                            </tr>
                    </tr>


                        <tbody>
                        {risksList}
                        </tbody>
                    </Table>
                    <br/>
                    <br/>

                    <Button color="primary"  tag={Link} to={"/projects/"}>Go to projects list</Button>
                </Container>
            </div>
            </div>
        );
    }


}

export default withRouter(Risks);
