import React from 'react';

class CustomInput extends React.Component {
    render() {
        const { input: { value, onChange } } = this.props;
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}> {this.props.label} </label>
                <input 
                    className="form-control"
                    name={this.props.name}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    value={value}
                    onChange={onChange}
                    required={this.props.required}
                    min={this.props.min ? this.props.min : null}
                    />
            </div>
        )
    }
}

export default CustomInput;