import React, {Component} from 'react'
import {Card, CardBody, Col, Row} from 'reactstrap'
import axios from 'axios'
import HighCharts from 'highcharts'

const addFunnel = require('highcharts/modules/funnel');

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            perMonth: 0,
            perWeek: 0,
            perDay: 0,
            cityNames: [],
            reloaded: false,
            RankChart: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Complaints by Offending Officer Rank, ' + new Date().getFullYear(),
                    align: 'center',
                },
                subtitle: {
                    text: 'Source: AI Data from database'
                },
                accessiblity: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    // type: 'category',
                    labels: {
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    },
                    crosshair: true,
                    categories: [
                        'IGP',
                        'DIGP',
                        'AIGP',
                        'SCP',
                        'CP',
                        'ACP',
                        'SSP',
                        'SP',
                        'ASP',
                        'IP',
                        'AIP',
                        'SGT',
                        'CPL',
                        'PC',
                        'SPC'
                    ]
                },
                yAxis: {
                    allowDecimals: false,
                    title: {text: 'Number of complaints'}
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true,
                        },
                        pointPadding: .2,
                        borderWidth: 1
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
                    pointFormat: '<tr><td style="color:{point.color};padding:0">{point.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} complaints</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                series: [
                    {
                        data: []
                    }
                ]
                // }]
            },
            byGenderChart: {
                chart: {
                    plotBackground: null,
                    plotBorderWidth: null,
                    plotShadow: true,
                    type: 'pie'
                },
                title: {
                    text: 'Beneficiaries By Gender, ' + new Date().getFullYear(),
                    align: 'center',
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessiblity: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                xAxis: {
                    accessiblity: {
                        rangeDescription: 'Beneficiaries by Gender'
                    }
                },
                legend: {
                    layout: 'horizontal',
                    alight: 'bottom',
                    verticalAlign: 'bottom'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            format: '<b>{point.name}</b> reported: {point.percentage:.2f}%  ',
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Gender',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Empty',
                            y: 100
                        },
                    ]
                }]
            },
            forMonth: {
                chart: {
                    type: 'area',
                    zoomType: 'x'
                },
                accessiblity: {
                    description: 'Number of Distributions per day in ' + this.getMonth(new Date().getMonth())
                },
                title: {
                    text: 'Distributions in ' + this.getMonth(new Date().getMonth()) + ', ' + new Date().getFullYear()
                },
                subtitle: {
                    text: 'Source: Data collected over the month by the system'
                },
                xAxis: {
                    allowDecimals: false,
                    title: {
                        text: 'Number of Days'
                    },
                    labels: {
                        formatter: function () {
                            return this.value
                        }
                    },
                    accessiblity: {
                        rangeDescription: 'Range: 1 to 30.'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Number of Distributions'
                    },
                    labels: {
                        formatter: function () {
                            return this.value
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y:,.0f} distributed</b> on ' + this.getMonth(new Date().getMonth()) + ', {point.x}.'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        }
                    },
                    area: {
                        pointStart: 0,
                        marker: {
                            enabled: true,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 400
                        }
                    }]
                }
            },
            beneficiaries: 0,
            suppliers: 0,
            inputs: 0,
            distributions: 0,
        }
        this.getMonth = this.getMonth.bind(this)
        this.fM = null
        this.aC = null
        this.gC = null
        this.getCounters = this.getCounters.bind(this)
        this.getGenderData = this.getGenderData.bind(this)
        this.getDistributionData = this.getDistributionData.bind(this)
        document.title = document.title.split(':')[0]
    }

    getCounters() {
        axios.get('/api/data/counters')
            .then(value => {
                this.setState({
                    beneficiaries: value.data.beneficiaries,
                    suppliers: value.data.suppliers,
                    inputs: value.data.inputs,
                    distributions: value.data.distributions,
                })
            })
    }

    async getGenderData() {
        await axios.get('/api/data/gender')
            .then(value => {
                this.setState({
                    byGender: value.data.beneficiaries,
                })
            })
    }

    async getDistributionData() {
        await axios.get('/api/data/distribution')
            .then(value => {
                this.setState({
                    distMonth: value.data.distributions,
                })
            })
    }

    getMonth(month) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ]
        return months[month].toString()
    }

    async componentDidMount() {
        history.pushState({}, null, location.origin + '/dashboard')
        await this.getCounters()
        await this.getGenderData()
        await this.getDistributionData()
        addFunnel(HighCharts)
        HighCharts.theme = {
            colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
            ],
            chart: {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 1,
                        y2: 1
                    },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063'
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'

                    }
                }
            },
            yAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#F0F0F3',
                        style: {
                            fontSize: '13px'
                        }
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            legend: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                },
                title: {
                    style: {
                        color: '#C0C0C0'
                    }
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },

            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },

            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },

            // scroll charts
            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#CCC'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },

            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },

            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            }
        };
        // HighCharts.setOptions(HighCharts.theme)
        this.fM = HighCharts.chart('forMonth', this.state.forMonth)
        this.aC = HighCharts.chart('chart', this.state.RankChart)
        this.gC = HighCharts.chart('chart3', this.state.byGenderChart)
        for (const key in this.state.byGender) {
            if (this.state.byGender.hasOwnProperty(key)) {
                const gender = this.state.byGender[key];
                let newPoint = {
                    name: key,
                    y: gender
                }
                this.gC.series[0].addPoint(newPoint)
            }
        }
        for (const key in this.state.distMonth) {
            if (this.state.distMonth.hasOwnProperty(key)) {
                const region = this.state.distMonth[key];
                let newSeries = new Object({
                    name: key.toString(),
                    data: Object.keys(region).map(key => region[key])
                })
                this.fM.addSeries(newSeries, false)
                this.fM.redraw()
            }
        }
        this.gC.series[0].data[0].remove(true)
    }

    render() {
        return (
            <div className='header pb-7' style={{backgroundColor: 'rgba(0, 0, 0, 0.07)'}}>
                <div className='container-fluid'>
                    <div className='header-body'>
                        <Row className='align-items-center py-4'>
                            <Col className="col-sm-3 col-4"/>
                            <Col className="col-sm-3 col-4 d-none d-sm-none d-md-block"/>
                            <Col
                                className="col-sm-3 col-3 offset-2 offset-md-9 offset-5 pr-7 text-right align-items-right">
                            </Col>
                        </Row>
                        <div className="row">
                            <div className="col-sm-6 col-md-3">
                                <div className="card">
                                    <div className="card-body p-3 d-flex align-items-center">
                                        <i className="fa fa-user-plus bg-success p-3 font-2xl mr-3"/>
                                        <div>
                                            <div className="text-value-sm text-success">
                                                {this.state.beneficiaries}
                                            </div>
                                            <div className="text-muted text-uppercase font-weight-bold small">
                                                Beneficiaries
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <div className="card">
                                    <div className="card-body p-3 d-flex align-items-center">
                                        <i className="fa fa-user-friends bg-warning p-3 font-2xl mr-3"/>
                                        <div>
                                            <div className="text-value-sm text-warning">
                                                {this.state.suppliers}
                                            </div>
                                            <div className="text-muted text-uppercase font-weight-bold small">
                                                Suppliers
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-3">
                                <div className="card">
                                    <div className="card-body p-3 d-flex align-items-center">
                                        <i className="fa fa-cubes bg-primary p-3 font-2xl mr-3">

                                        </i>
                                        <div>
                                            <div className="text-value-sm text-primary">
                                                {this.state.inputs}
                                            </div>
                                            <div className="text-muted text-uppercase font-weight-bold small">
                                                Inputs
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-3">
                                <div className="card">
                                    <div className="card-body p-3 d-flex align-items-center">
                                        <i className="fa fa-server bg-danger p-3 font-2xl mr-3">

                                        </i>
                                        <div>
                                            <div className="text-value-sm text-danger">
                                                {this.state.distributions}
                                            </div>
                                            <div className="text-muted text-uppercase font-weight-bold small">
                                                Distributions
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Row className='pb-4'>
                            <div id="forMonth" className='col-sm-12 col-md-12 col-12'
                                 style={{borderRadius: `10px`}}/>
                        </Row>
                        <Row className={""}>
                            <div id="chart" className='d-none pb-4 col-sm-12 col-md-6 col-12'
                                 style={{borderRadius: `10px`}}/>
                            <div id="chart3" className='pb-4 col-sm-12 col-md-6 col-12'
                                 style={{borderRadius: `10px`}}/>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stats
