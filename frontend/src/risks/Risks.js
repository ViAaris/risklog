import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import '../App.css';
import {withRouter} from 'react-router-dom';

import cellEditFactory, {Type} from "react-bootstrap-table2-editor";


class Risks extends Component {
    emptyItem = {
        projectId: this.props.match.params.id,
        id: null,
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
        isActive: ''
    };


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
                    data.push(this.emptyItem);
                    this.setState({risks: data});
                    console.log(data);
                } else {
                    this.setState({error: data.error})
                }
            });
    }

    handleChange = (oldValue, newValue, row) => {

        if (row.id === null) {

            fetch('/api/projects/' + this.props.match.params.id + '/risks', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(row),
            }).then((response) => response.json())
                .then(window.location.reload())
                .then((data) => {
                    console.log(data);
                });
        }

        if (row.id !== null && newValue !== oldValue) {

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
        const columns = [
            {
                dataField: 'projectId',
                hidden: true
            },
            {
                dataField: 'title',
                width: '100px',
                sort: true,
                text: 'Title'
            },
            {
                dataField: 'description',
                text: 'Description',
                width: '100px',
                editor: {
                    type: Type.TEXTAREA
                }
            },
            {
                dataField: 'reason',
                text: 'Reason',
                width: '100px',
                editor: {
                    type: Type.TEXTAREA
                }
            },
            {
                dataField: 'category',
                text: 'Risk category',
                width: "col col-lg-2",
                sort: true,
                editor: {
                    type: Type.SELECT,
                    options: [
                        {label: "Organisation and cooperation", value: 'Organisation and cooperation'},
                        {label: "Environment and surroundings", value: 'Environment and surroundings'},
                        {label: "Functionality, test and hand over", value: 'Functionality, test and hand over'},
                        {
                            label: "Building design and technical solutions",
                            value: 'Building design and technical solutions'
                        },
                        {label: "Contract and market situation", value: "Contract and market situation"},
                        {label: "Budget and finance", value: "Budget and finance"},
                        {label: "Authorities and stakeholders", value: "Authorities and stakeholders"},
                        {label: "Client and users", value: "Client and users"}
                    ]
                }
            },
            {
                dataField: 'consequences',
                text: 'Consequences',
                width: "col col-lg-2",
                editor: {
                    type: Type.TEXTAREA
                }
            },
            {
                dataField: 'probability',
                text: 'Probability',
                width: "col col-lg-0.5",
                validator: (newValue) => {
                    if (isNaN(newValue)) {
                        return {
                            valid: false,
                            message: 'Probability should be numeric, in %'
                        };
                    }

                    if (newValue > 100) {
                        return {
                            valid: false,
                            message: 'Enter value in %, 0-100'
                        };
                    }
                },
                formatter:
                    (cell) => {
                        if (cell != null)
                            return `${cell}%`
                    }
            },
            {
                dataField: 'minCost',
                text: 'Min cost',
                width: "col col-lg-0.5",
                validator: (newValue) => {
                    if (isNaN(newValue)) {
                        return {
                            valid: false,
                            message: 'Minimal cost value should be numeric'
                        };
                    }
                },
                type: 'number',
                formatter: (cell) => {
                    if (cell != null) return `${cell} kr.`
                }
            },
            {
                dataField: 'midCost',
                text: 'Mid cost',
                width: "col col-lg-0.5",
                validator: (newValue) => {
                    if (isNaN(newValue)) {
                        return {
                            valid: false,
                            message: 'Mid cost value should be numeric'
                        };
                    }
                },
                type: 'number',
                formatter: (cell) => {
                    if (cell != null) return `${cell} kr.`
                }
            },
            {
                dataField: 'maxCost',
                text: 'Max cost',
                width: "col col-lg-0.5",
                validator: (newValue) => {
                    if (isNaN(newValue)) {
                        return {
                            valid: false,
                            message: 'Maximum cost value should be numeric'
                        };
                    }
                },
                type: 'number',
                formatter: (cell) => {
                    if (cell != null) return `${cell} kr.`
                }
            },
            {//(J10+(K10*0,43)+L10)/2,43*I10
                dataField: 'value',
                text: 'Value',
                width: "col col-lg-0.5",
                type: 'number',
                editable: false,
                formatter: (cell, row) => {
                    console.log(row);
                    if (row.minCost != null && row.midCost != null && row.maxCost != null && row.probability != null)
                        return <div>{`${(row.minCost + (row.midCost * 0.43) + row.maxCost) / 2.43 * row.probability / 100} kr.`}</div>;
                },
            },
            {dataField: 'owner', width: "col col-lg-1", text: 'Owner'},
            {
                dataField: 'actions',
                text: 'Actions',
                width: "col col-lg-1",
                editor: {
                    type: Type.TEXTAREA
                }
            },
            {
                dataField: 'isActive',
                text: 'Is active',
                width: "col col-lg-0.5",
                editor: {
                    type: Type.CHECKBOX,
                    value: 'true:false'
                }
            }
        ];

        const cellEditProp = cellEditFactory({
            mode: 'dbclick',
            blurToSave: true,
            afterSaveCell: this.handleChange,
            //beforeSaveCell: this.handleSet,
        })


        return (
            <div className={"body"}>
                <BootstrapTable class={"table"}
                                keyField="id"
                                data={risks}
                                columns={columns}
                                cellEdit={cellEditProp}
                />
            </div>
        );
    }


}

export default withRouter(Risks);
