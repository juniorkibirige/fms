import React, {Component} from "react";

class TextAreaInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className={`form-group ` + this.props.class}>
                    <label htmlFor={this.props.field}>{this.props.label}:<sup
                        className='text-red'>{this.props.required ? '*' : ''}</sup></label>
                    <textarea
                        className="form-control"
                        name={this.props.field}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        required={this.props.required ?? false}
                        onChange={this.props.onChange}
                    />
                    {
                        this.props.error === true ?
                            <>
                                <div className="text-left text-danger">Required.</div>
                            </>
                            : <></>
                    }
                </div>
            </>
        );
    }
}

export default TextAreaInput
