import React from 'react';
import { Link } from 'react-router-dom';
import { showMean } from '../utils/showMean';

class DayForecasts extends React.Component {
  render() {
    return (
      <div>
        <div className="resulted-forecasts-section">
          {this.props.groupedForecasts.length !== 0 ? (
            <h2 className="day-forecast text-center">
              Results for {this.props.city.toUpperCase()}
            </h2>
          ) : null}
          {this.props.groupedForecasts.map((item, index) => {
            return (
              <div key={index} className="row day-forecast">
                <div className="col-8">
                  <h3>{item.date}</h3>
                  <p className="lead">{this.props.morningTemp(item.day)}</p>
                  <p className="lead">{this.props.nightTemp(item.day)}</p>
                  <p className="lead">
                    Humidity: {this.props.meanHumidity(item.day)}
                  </p>
                </div>
                <div className="col-4 text-right">
                  <h2>
                    {showMean(item.day)}
                    {'\u00b0'}C
                  </h2>
                </div>
              </div>
            );
          })}
          {this.props.groupedForecasts.length > 0 ? (
            <div className="stats-link-button text-center">
              <Link to="/stats">
                <button className="btn btn-primary">See Statistics</button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default DayForecasts;
