import React, {Component} from 'react'

class DistributionCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            errors: {},
            is: [],
            inputs: [],
            alert: null,
        }
        document.title = document.title.split(':')[0] + " : Distribute"
    }

    render() {
        return (
            <>
                <div className="h-full">
                    {this.state.alert}
                    <div className='header'>
                        <div className='container-fluid pt-4 pb-2'>
                            <span className="text-2xl text-capitalize">Distribution</span> <small>Distribute.</small><a
                            href="#"><i className="fa fa-angle-double-left"/> Back to Distribution Logs</a>
                        </div>
                    </div>
                    <div className="col-md-10 bg-blue-gray-400 pb-7">
                        <div className="text-center jumbotron">
                            UNDER DEVELOPMENT
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DistributionCreate
