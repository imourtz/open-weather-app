import React from 'react';

class AddValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    return (
      <div className="input-group mb-3 text-center">
        <input
          type="number"
          placeholder="temperature"
          onChange={this.handleChange}
          value={this.state.addedValue}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            disabled={this.state.inputValue.length === 0}
            onClick={() => this.props.handleSubmit(this.state.inputValue)}
          >
            ADD
          </button>
        </div>
      </div>
    );
  }
}

export default AddValue;
