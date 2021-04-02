import React, {Component} from 'react'
import {
    Row, Col,
    Card, CardBody, Jumbotron
} from 'reactstrap'
import axios from 'axios'
import HighCharts from 'highcharts'
import {Link} from 'react-router-dom'

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
            OffenceChart: {
                chart: {
                    plotBackground: null,
                    plotBorderWidth: null,
                    plotShadow: true,
                    type: 'pie'
                },
                title: {
                    text: 'Complaints by Offense Type, ' + new Date().getFullYear(),
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
                        rangeDescription: 'Reports by Offense Type'
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
                    name: 'Gender Range',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Female',
                            y: 13.29
                        }
                    ]
                }]
            },
            forMonth: {
                chart: {
                    type: 'area',
                    zoomType: 'x'
                },
                accessiblity: {
                    description: 'Number of complaints per day in ' + this.getMonth(new Date().getMonth())
                },
                title: {
                    text: 'Complaints in ' + this.getMonth(new Date().getMonth()) + ', ' + new Date().getFullYear()
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
                        text: 'Number of Crimes'
                    },
                    labels: {
                        formatter: function () {
                            return this.value
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y:,.0f} crimes</b> on ' + this.getMonth(new Date().getMonth()) + ', {point.x}.'
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
            }
        }
        this.getMonth = this.getMonth.bind(this)
        this.fM = null
        this.aC = null
        this.gC = null
        document.title = document.title.split(':')[0]
    }

    getMonth(month) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ]
        return months[month].toString()
    }

    componentDidMount() {
        history.pushState({}, null, location.origin + '/dashboard')
        addFunnel(HighCharts)
        // HighCharts.theme = {
        //     colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        //         '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
        //     ],
        //     chart: {
        //         backgroundColor: {
        //             linearGradient: {
        //                 x1: 0,
        //                 y1: 0,
        //                 x2: 1,
        //                 y2: 1
        //             },
        //             stops: [
        //                 [0, '#2a2a2b'],
        //                 [1, '#3e3e40']
        //             ]
        //         },
        //         style: {
        //             fontFamily: '\'Unica One\', sans-serif'
        //         },
        //         plotBorderColor: '#606063'
        //     },
        //     title: {
        //         style: {
        //             color: '#E0E0E3',
        //             textTransform: 'uppercase',
        //             fontSize: '20px'
        //         }
        //     },
        //     subtitle: {
        //         style: {
        //             color: '#E0E0E3',
        //             textTransform: 'uppercase'
        //         }
        //     },
        //     xAxis: {
        //         gridLineColor: '#707073',
        //         labels: {
        //             style: {
        //                 color: '#E0E0E3'
        //             }
        //         },
        //         lineColor: '#707073',
        //         minorGridLineColor: '#505053',
        //         tickColor: '#707073',
        //         title: {
        //             style: {
        //                 color: '#A0A0A3'
        //
        //             }
        //         }
        //     },
        //     yAxis: {
        //         gridLineColor: '#707073',
        //         labels: {
        //             style: {
        //                 color: '#E0E0E3'
        //             }
        //         },
        //         lineColor: '#707073',
        //         minorGridLineColor: '#505053',
        //         tickColor: '#707073',
        //         tickWidth: 1,
        //         title: {
        //             style: {
        //                 color: '#A0A0A3'
        //             }
        //         }
        //     },
        //     tooltip: {
        //         backgroundColor: 'rgba(0, 0, 0, 0.85)',
        //         style: {
        //             color: '#F0F0F0'
        //         }
        //     },
        //     plotOptions: {
        //         series: {
        //             dataLabels: {
        //                 color: '#F0F0F3',
        //                 style: {
        //                     fontSize: '13px'
        //                 }
        //             },
        //             marker: {
        //                 lineColor: '#333'
        //             }
        //         },
        //         boxplot: {
        //             fillColor: '#505053'
        //         },
        //         candlestick: {
        //             lineColor: 'white'
        //         },
        //         errorbar: {
        //             color: 'white'
        //         }
        //     },
        //     legend: {
        //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //         itemStyle: {
        //             color: '#E0E0E3'
        //         },
        //         itemHoverStyle: {
        //             color: '#FFF'
        //         },
        //         itemHiddenStyle: {
        //             color: '#606063'
        //         },
        //         title: {
        //             style: {
        //                 color: '#C0C0C0'
        //             }
        //         }
        //     },
        //     credits: {
        //         style: {
        //             color: '#666'
        //         }
        //     },
        //     labels: {
        //         style: {
        //             color: '#707073'
        //         }
        //     },
        //
        //     drilldown: {
        //         activeAxisLabelStyle: {
        //             color: '#F0F0F3'
        //         },
        //         activeDataLabelStyle: {
        //             color: '#F0F0F3'
        //         }
        //     },
        //
        //     navigation: {
        //         buttonOptions: {
        //             symbolStroke: '#DDDDDD',
        //             theme: {
        //                 fill: '#505053'
        //             }
        //         }
        //     },
        //
        //     // scroll charts
        //     rangeSelector: {
        //         buttonTheme: {
        //             fill: '#505053',
        //             stroke: '#000000',
        //             style: {
        //                 color: '#CCC'
        //             },
        //             states: {
        //                 hover: {
        //                     fill: '#707073',
        //                     stroke: '#000000',
        //                     style: {
        //                         color: 'white'
        //                     }
        //                 },
        //                 select: {
        //                     fill: '#000003',
        //                     stroke: '#000000',
        //                     style: {
        //                         color: 'white'
        //                     }
        //                 }
        //             }
        //         },
        //         inputBoxBorderColor: '#505053',
        //         inputStyle: {
        //             backgroundColor: '#333',
        //             color: 'silver'
        //         },
        //         labelStyle: {
        //             color: 'silver'
        //         }
        //     },
        //
        //     navigator: {
        //         handles: {
        //             backgroundColor: '#666',
        //             borderColor: '#AAA'
        //         },
        //         outlineColor: '#CCC',
        //         maskFill: 'rgba(255,255,255,0.1)',
        //         series: {
        //             color: '#7798BF',
        //             lineColor: '#A6C7ED'
        //         },
        //         xAxis: {
        //             gridLineColor: '#505053'
        //         }
        //     },
        //
        //     scrollbar: {
        //         barBackgroundColor: '#808083',
        //         barBorderColor: '#808083',
        //         buttonArrowColor: '#CCC',
        //         buttonBackgroundColor: '#606063',
        //         buttonBorderColor: '#606063',
        //         rifleColor: '#FFF',
        //         trackBackgroundColor: '#404043',
        //         trackBorderColor: '#404043'
        //     }
        // };
        // HighCharts.setOptions(HighCharts.theme)
        // this.fM = HighCharts.chart('forMonth', this.state.forMonth)
        // this.aC = HighCharts.chart('chart', this.state.RankChart)
        // this.gC = HighCharts.chart('chart3', this.state.OffenceChart)
        let s = this.state.OffenceChart.series[0].data;
        s = []
        axios.get('/api/form_105').then(response => {
            // Setting up regional chart
            for (const key in response.data.byRegion) {
                if (response.data.byRegion.hasOwnProperty(key)) {
                    const region = response.data.byRegion[key];
                    let newSeries = new Object({
                        name: key.toString(),
                        data: Object.keys(region).map(key => region[key])
                    })
                    // this.fM.addSeries(newSeries, false)
                    // this.fM.redraw()
                }
            }
            // Setting up gender pie chart
            for (const key in response.data.byGender) {
                if (response.data.byGender.hasOwnProperty(key)) {
                    const gender = response.data.byGender[key];
                    let newPoint = {
                        name: key,
                        y: gender
                    }
                    // this.gC.series[0].addPoint(newPoint)
                }
            }
            // this.gC.series[0].data[0].remove(true)

            //Setting up age chart
            // this.aC.update({
            //     series: [
            //         {
            //             data: response.data.byRank
            //         }
            //     ]
            // }, true, true)
            //
            // this.aC.redraw()
            this.setState(prevState => ({
                ...prevState,
                perMonth: response.data.perMonth,
                perWeek: response.data.perWeek,
                perDay: response.data.perDay
            }))
        })
    }

    render() {
        return (
            <div className='header bg-white pb-7'>
                <div className='container-fluid'>
                    <div className='header-body'>
                        <Row className='align-items-center py-4'>
                            <Col className="col-sm-3 col-4"/>
                            <Col className="col-sm-3 col-4 d-none d-sm-none d-md-block"/>
                            <Col
                                className="col-sm-3 col-3 offset-2 offset-md-9 offset-5 pr-7 text-right align-items-right">
                                {/*<Link className="btn btn-outline-default btn-info"*/}
                                {/*      to='/dashboard/complain?prev=dashboard' data-toggle='buttons'>Add Complaint</Link>*/}
                            </Col>
                        </Row>
                        <Row className={"d-none"}>
                            <Col className='col-xl-4 col-md-4 col-12'>
                                <Card className='card-stats bg-gradient-purple' style={{marginBottom: 30 + 'px'}}>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <h5 className='card-title text-uppercase text-muted mb-0 text-white'>Total
                                                    Complaints</h5>
                                                <span
                                                    className='h2 font-weight-bold mb-0 text-white'>{this.state.perDay}&nbsp;
                                                    <span className='text-nowrap text-sm'>Today</span></span>
                                            </Col>
                                            <Col className='col-auto'>
                                                <div
                                                    className='icon icon-shape bg-gradient-blue text-white rounded-circle shadow'>
                                                    <i className='ni ni-chart-pie-35'></i>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className='col-xl-4 col-md-4 col-12'>
                                <Card className='card-stats bg-gradient-blue' style={{marginBottom: 30 + 'px'}}>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <h5 className='card-title text-uppercase text-muted mb-0 text-white'>Total
                                                    Complaints</h5>
                                                <span
                                                    className='h2 font-weight-bold mb-0 text-white'>{this.state.perWeek}&nbsp;
                                                    <span className='text-nowrap text-sm'>This Week</span></span>
                                            </Col>
                                            <Col className='col-auto'>
                                                <div
                                                    className='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                                                    <i className='ni ni-chart-pie-35'></i>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className='col-xl-4 col-md-4 col-12'>
                                <Card className='card-stats bg-gradient-red' style={{marginBottom: 30 + 'px'}}>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <h5 className='card-title text-uppercase text-muted mb-0 text-white'>Total
                                                    Complaints</h5>
                                                <span
                                                    className='h2 font-weight-bold mb-0 text-white'>{this.state.perMonth}&nbsp;
                                                    <span className='text-nowrap text-sm'>This Month</span></span>
                                            </Col>
                                            <Col className='col-auto'>
                                                <div
                                                    className='icon icon-shape bg-gradient-blue text-white rounded-circle shadow'>
                                                    <i className='ni ni-chart-pie-35'></i>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='pb-4 d-none'>
                            <div id="forMonth" className='col-sm-12 col-md-12 col-12'
                                 style={{borderRadius: `10px`}}/>
                        </Row>
                        <Row className={"d-none"}>
                            <div id="chart" className='pb-4 col-sm-12 col-md-6 col-12'
                                 style={{borderRadius: `10px`}}/>
                            <div id="chart3" className='pb-4 col-sm-12 col-md-6 col-12'
                                 style={{borderRadius: `10px`}}/>
                        </Row>
                        <Row>
                            <Jumbotron fluid={true} className={`col-12 p-4`}>
                                <h1>Welcome,</h1>
                            </Jumbotron>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stats
