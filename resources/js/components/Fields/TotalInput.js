import React, {Component} from "react";

class TotalInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className={`form-group ` + this.props.class}>
                    <label htmlFor={this.props.field}>{this.props.label}:<sup
                        className='text-red'>{this.props.required ? '*' : ''}</sup></label>
                    {
                        <input type={`text`} className="form-control text-center"
                               name={'total'}
                               data-row={this.props.dataRow}
                               readOnly={this.props.readOnly}
                               value={this.props.value}
                               placeholder={this.props.placeholder}
                               required={this.props.required ?? false}
                        />
                    }
                </div>
            </>
        );
    }
}

export default TotalInput
