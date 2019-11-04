import React from 'react';
import { Link } from 'react-router-dom';

class FoundStatusStatistics extends React.Component {
  render() {
    return (
      <div>
        {this.props.groupedForecasts.length !== 0 ? (
          <h2 className="day-forecast text-center">
            Statistics for {this.props.city.toUpperCase()}
          </h2>
        ) : (
          <div className="not-found-section text-center">
            <h2>No stats found!</h2>
            <img
              className="not-found-logo"
              src="https://stubborn.fun/images/image-s-third-3.png"
              alt="Logo"
            />
            <div>
              <Link to="/">
                <button className="btn btn-primary">Return to Home</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FoundStatusStatistics;
