import React from 'react';

class ModeForecast extends React.Component {
  render() {
    return (
      <div>
        {this.props.forecasts.length > 0 && (
          <div>
            <h3 className="pl-5">
              Mode Temperature(s) for the next five days:{' '}
              {this.props.showMode(this.props.forecasts)}
              {'\u00b0'}C
            </h3>
          </div>
        )}
      </div>
    );
  }
}

export default ModeForecast;
