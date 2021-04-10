import React, {Component} from 'react'

import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';

import {Col, Row} from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import Select from "react-select";
import axios from "axios";

const {SearchBar} = Search;

class DistributionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            distributions: [],
            alert: ''
        }
        document.title = document.title.split(':')[0] + " : Distribution Logs"
        this.refreshData = this.refreshData.bind(this)
        this.actionButtons = this.actionButtons.bind(this)
        this.handleActionButtons = this.handleActionButtons.bind(this)
    }

    handleActionButtons(row) {
        const id = row.id;
        const action = event.target.textContent.toLowerCase()
        switch (action) {
            case 'edit':
                console.log('Edit => ' + id)
                break
            case 'view':
                console.log('View => ' + id)
                break
            case 'delete':
                console.log('Delete => ' + id)
                break
            default:
                alert('Unknown action')
                break
        }
    }

    actionButtons(cell, row) {
        let options = [
            {
                value: 'view',
                label: 'View'
            },
            {
                value: 'edit',
                label: 'Edit'
            },
            {
                value: 'del',
                label: 'Delete'
            },
        ]
        return (
            <>
                <Select
                    className={`basic-single `}
                    classNamePrefix={'select'}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={false}
                    name={this.props.name}
                    defaultValue={options[0]}
                    options={options}
                    onChange={this.handleActionButtons.bind(this, row)}
                    // id={this.props.field}
                    isOptionDisabled={opt => opt.disabled}
                    getOptionLabel={opt => opt.label}
                    getOptionValue={opt => opt.value}
                    data-row={this.props.dataRow}
                />
            </>
        )
    }

    componentDidMount() {
        axios.get('/api/distributions').then(response => {
            this.setState({
                distributions: response.data.distributions,
            });
        });
    }

    refreshData() {
        this.setState({
            refreshing: true
        })
        axios.get('/api/distributions').then(response => {
            setTimeout(() => {
                this.setState({
                    distributions: response.data.distributions,
                    refreshing: false
                });
            }, 2000)
        });
    }

    render() {
        return (
            <>
                {this.state.alert}
                <div className='header' style={{minHeight: `100%`}}>
                    <div className='container-fluid pt-4 pb-2'>
                        <span className="text-2xl text-capitalize">Distribution Logs</span>
                        <small onClick={this.refreshData} style={{cursor: 'pointer'}}><i
                            className={this.state.refreshing ? "ml-2 fa fa-sync text-blue fa-spin" : "ml-2 fa fa-sync text-blue"}/> Reload</small>
                    </div>
                </div>
                <div className="col-md-12 bg-blue-gray-400">
                    <Row className='align-items-center py-4'>
                        <Col>
                            <ToolkitProvider
                                data={this.state.distributions}
                                keyField="id"
                                columns={[
                                    {
                                        dataField: 'id',
                                        text: 'ID',
                                        hidden: false,
                                        headerClasses: `col-1`,
                                    },
                                    {
                                        dataField: 'season',
                                        text: 'Season',
                                        hidden: false,
                                        classes: 'col-md-2 col-sm-3 col-auto',
                                        sort: true,
                                    },
                                    {
                                        dataField: 'beneficiary',
                                        text: 'Beneficiary',
                                        hidden: false,
                                        classes: 'col-md-2 col-sm-3 d-md-table-cell d-sm-table-cell d-none',
                                        headerClasses: 'col-md-2 col-sm-3 d-md-table-cell d-sm-table-cell d-none',
                                    },
                                    {
                                        dataField: 'supplier',
                                        text: 'Supplied By',
                                        hidden: false,
                                        classes: 'col-md-2 col-sm-3 d-md-table-cell d-sm-table-cell d-none',
                                        headerClasses: 'col-md-2 col-sm-3 d-md-table-cell d-sm-table-cell d-none',
                                    },
                                    {
                                        dataField: 'office',
                                        text: 'Office',
                                        hidden: false,
                                        classes: 'col-md-2 col-sm-3 d-md-table-cell d-sm-table-cell d-none',
                                        headerClasses: 'col-md-2 col-sm-3 d-md-table-cell d-sm-table-cell d-none',
                                    },
                                    {
                                        dataField: 'date_of_distribution',
                                        text: 'Date of Distribution',
                                        hidden: false,
                                        classes: 'col-md-2 d-md-table-cell d-none text-center',
                                        headerClasses: 'col-md-2 d-md-table-cell d-none',
                                    },
                                    {
                                        dataField: 'actions',
                                        isDummyField: true,
                                        classes: 'col-md-2 col-sm-3 col-auto',
                                        headerClasses: 'col-md-2 col-sm-2 col-auto',
                                        text: 'Actions',
                                        hidden: false,
                                        formatter: this.actionButtons
                                    },
                                ]}
                                hover
                                search
                            >
                                {
                                    props => (
                                        <>
                                            <Row>
                                                <Col sm={6} xs={'xs-d-none'}/>
                                                <Col xs={12} sm={6}>
                                                    <div id='datatable-basic_filter'
                                                         className='dataTables_filter px-4 pb-1 float-right'>
                                                        <label>
                                                            Search:
                                                            <SearchBar className='form-control-sm'
                                                                       placeholder="" {...props.searchProps} />
                                                        </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <BootstrapTable
                                                ref={el => (this.componentRef = el)}
                                                {...props.baseProps}
                                                classes={`table-white`}
                                                bootstrap4={true}
                                                bordered={true}
                                                filterPosition={'top'}
                                                pagination={paginationFactory({
                                                    showTotal: true,
                                                    sizePerPageList: [{
                                                        text: '5', value: 5
                                                    }, {
                                                        text: '10', value: 10
                                                    }, {
                                                        text: '20', value: 20,
                                                    }, {
                                                        text: '50', value: 50,
                                                    }, {
                                                        text: '100', value: 100,
                                                    }]
                                                })}
                                                noDataIndication={"No Logs"}
                                                id="react-distribution-table"
                                            />
                                        </>
                                    )
                                }
                            </ToolkitProvider>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default DistributionList
