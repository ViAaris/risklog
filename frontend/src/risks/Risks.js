import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import '../App.css';
import {withRouter} from 'react-router-dom';
import AddNewRisk from "./AddNewRisk";
import AppNavbar from "../AppNavbar";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";




class Risks extends Component {


    constructor(props) {
        super(props);
        this.state = {
            risks: [],


            serverStatus: '',
            error: ''
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
            .then(response => {
                if (response.status !== 200) {
                    this.setState({serverStatus: response.status})
                }
                return response.json()
            })
            .then(data => {
                if (!this.state.serverStatus) {
                    this.setState({risks: data});
                    console.log(data);
                } else {
                    this.setState({error: data.error})
                }
            });
    }

    handleChange=(oldValue, newValue, row, column) =>{

        if (newValue!==oldValue) {

        fetch('/api/projects/' + this.props.match.params.id + '/risks/' + row.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(row),
        }).then((response) => {
            return response.json();

        }).then(data => {
            console.log(data);
        });
        }
    }

    render() {

        if (this.state.serverStatus) {
            return (
                <p>{this.state.error}</p>
            )
        }

        const {risks} = this.state;
        // const risksList = risks.map(r => {
        //     let id = r.id;
        //     return (<tr key={id}>
        //         <td>{r.title}</td>
        //         <td>{r.description}</td>
        //         <td>{r.reason}</td>
        //         {/*<OneRisk projectId={this.props.match.params.id} riskId={id}/>*/}
        //     </tr>)
        // });

        const columns = [

            { dataField: 'title',
                text: 'Title' },
            { dataField: 'description',
                text: 'Description',
                editor: {
                    type: Type.TEXTAREA
                } },
            { dataField: 'reason',
                text: 'Reason',
                editor: {
                    type: Type.TEXTAREA
                } },
            {dataField:'category',
                text:'Risk category',
                sort: true,
                editor:{
                    type:Type.SELECT,
                    options:[
                        {label: "Organisation and cooperation",value:'Organisation and cooperation' },
                        {label: "Environment and surroundings",value:'Environment and surroundings' },
                        {label: "Functionality, test and hand over",value:'Functionality, test and hand over' },
                        {label: "Building design and technical solutions",value:'Building design and technical solutions' },
                        {label: "Contract and market situation", value: "Contract and market situation"},
                        {label: "Budget and finance", value: "Budget and finance"},
                        {label: "Authorities and stakeholders", value: "Authorities and stakeholders"},
                        {label: "Client and users", value: "Client and users"}
                    ]
                }},
            { dataField: 'consequences',
                text: 'Consequences',
                editor: {
                    type: Type.TEXTAREA
                } },
            { dataField: 'probability', text: 'Probability', formatter:(cell)=>{if(cell!=null)return `${cell}%`} },
            { dataField: 'minCost',
                text: 'Min cost',
                type: 'number',
                formatter:(cell)=>{if(cell!=null)return `${cell} kr.`}
            },
            { dataField: 'midCost',
                text: 'Mid cost',
                type: 'number',
                formatter:(cell)=>{if(cell!=null)return `${cell} kr.`}
            },
            { dataField: 'maxCost',
                text: 'Max cost',
                type: 'number',
                formatter:(cell)=>{if(cell!=null)return `${cell} kr.`}
            },
            {//(J10+(K10*0,43)+L10)/2,43*I10
                dataField: 'value',
                text: 'Value',
                type: 'number',
                editable: false,
                formatter: (cell, row) => {
                    console.log(row);
                    if(row.minCost != null && row.midCost != null && row.maxCost != null && row.probability != null)
                    return <div>{`${ (row.minCost + (row.midCost * 0.43) + row.maxCost) / 2.43 * row.probability/100  } kr.`}</div>;
                },
            },
            { dataField: 'owner', text: 'Owner' },
            { dataField: 'actions',
                text: 'Actions',
                editor: {
                    type: Type.TEXTAREA
                } },
            { dataField: 'isActive',
                text: 'Is active',
                editor: {
                    type: Type.CHECKBOX,
                    value: 'true:false'
                }
            }
        ];

        const cellEditProp = cellEditFactory({
            mode:'dbclick',
            blurToSave: true,
            afterSaveCell: this.handleChange,
            //beforeSaveCell: this.handleSet,
        })


        return (
            <div className={"body"}>
                <AppNavbar/>


                    <AddNewRisk/>
                    <BootstrapTable
                        keyField="id"
                        data={ risks}
                        columns={ columns }
                        cellEdit={ cellEditProp }

                    />
                        {/*<table className="tableRisk" border={1}>*/}
                        {/*    <thead>*/}
                        {/*    <h2>Risk log</h2>*/}
                        {/*    <h3>Add new risk</h3>*/}
                        {/*    <tr>*/}
                        {/*        <th>Title</th>*/}
                        {/*        <th>Description</th>*/}
                        {/*        <th>Reason</th>*/}
                        {/*        <th>Category</th>*/}
                        {/*        <th>Consequences</th>*/}
                        {/*        <th>Probability</th>*/}
                        {/*        <th>Min cost</th>*/}
                        {/*        <th>Mid cost</th>*/}
                        {/*        <th>Max cost</th>*/}
                        {/*        <th>Value</th>*/}
                        {/*        <th>Owner</th>*/}
                        {/*        <th>Actions</th>*/}
                        {/*        <th>Active</th>*/}
                        {/*        <br/>*/}
                        {/*    </tr>*/}
                        {/*    <AddNewRisk/>*/}
                        {/*    </thead>*/}

                        {/*    <tbody>*/}
                        {/*    {risksList}*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}



            </div>
        );
    }


}

export default withRouter(Risks);
