import React, {Component} from 'react'
import axios from 'axios'

import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';

import {Col, Row} from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import Select from "react-select";

const rowEvents = {
    onClick: (e, row, rowIndex) => {
        alert(`clicked on ${row} with index: ${rowIndex}`)
    }
}

const {SearchBar} = Search;

class SupplierList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suppliers: [],
            alert: null,
            refreshing: false
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        document.title += " : Suppliers"
        this.actionButtons = this.actionButtons.bind(this)
        this.refreshData = this.refreshData.bind(this)
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

    handleFieldChange() {
        let data = event.target.value
        this.setState({
            newCat: data
        })
    }

    componentDidMount() {
        axios.get('/api/supplier').then(response => {
            this.setState({
                suppliers: response.data.suppliers,
            });
        });
    }

    refreshData() {
        this.setState({
            refreshing: true
        })
        axios.get('/api/supplier').then(response => {
            setTimeout(()=>{
                this.setState({
                    suppliers: response.data.suppliers,
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
                        <span className="text-2xl text-capitalize">Suppliers</span>
                        <small onClick={this.refreshData} style={{cursor: 'pointer'}}><i
                            className={this.state.refreshing ? "ml-2 fa fa-sync text-blue fa-spin" : "ml-2 fa fa-sync text-blue"}/> Reload</small>
                    </div>
                </div>
                <div className="col-md-12 bg-blue-gray-400">
                    <Row className='align-items-center py-4'>
                        <Col>
                            <ToolkitProvider
                                data={this.state.suppliers}
                                keyField="id"
                                columns={[
                                    {
                                        dataField: 'id',
                                        text: 'ID',
                                        hidden: false,
                                        classes: 'col-1',
                                        headerClasses: `col-1`,
                                        style:{
                                            maxWidth: '4%'
                                        },
                                        headerStyle:{
                                            maxWidth: '4%'
                                        }
                                    },
                                    {
                                        dataField: 'name',
                                        text: 'Name',
                                        hidden: false,
                                        classes: 'col-md-2 col-sm-3 col-auto',
                                        sort: true,
                                    },
                                    {
                                        dataField: 'phone',
                                        text: 'Phone No.',
                                        hidden: false,
                                        classes: 'col-md-2 col-sm-3 d-md-table-cell d-sm-table-cell d-none',
                                        headerClasses: 'col-md-2 col-sm-3 d-md-table-cell d-sm-table-cell d-none',
                                    },
                                    {
                                        dataField: 'region',
                                        text: 'Region',
                                        hidden: false,
                                        classes: 'col-md-2 d-md-table-cell d-none',
                                        headerClasses: 'col-md-2 d-md-table-cell d-none',
                                    },
                                    {
                                        dataField: 'district',
                                        text: 'District',
                                        hidden: false,
                                        classes: 'col-md-2 d-md-table-cell d-none',
                                        headerClasses: 'col-md-2 d-md-table-cell d-none',
                                    },
                                    {
                                        dataField: 'actions',
                                        isDummyField: true,
                                        classes: 'col-md-2 col-sm-3 col-auto',
                                        headerClasses: 'col-md-2 col-sm-2 col-auto',
                                        text: '',
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
                                                noDataIndication={"No Suppliers"}
                                                id="react-supplier-table"
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

export default SupplierList
