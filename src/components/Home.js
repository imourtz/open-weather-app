import React from 'react';
import { format } from 'date-fns';
import Welcome from '../components/Welcome';
import { Link } from 'react-router-dom';
import { showMean } from '../utils/showMean';

class Home extends React.Component {
  meanHumidity = array => {
    const sum = array.reduce((total, item) => {
      return total + item.main.humidity;
    }, 0);
    return Math.round(sum / array.length);
  };

  morningTemp = array => {
    const morningTemps = [];
    array.map(item => {
      if (format(new Date(item['dt'] * 1000), 'HH:mm') <= '12:00') {
        morningTemps.push(item.main.temp);
      }
      return morningTemps;
    });
    if (morningTemps.length !== 0) {
      return ` Morning Temperature: ${Math.min.apply(
        null,
        morningTemps
      )}${'\u00b0'}C - ${Math.max.apply(null, morningTemps)}${'\u00b0'}C`;
    } else {
      return null;
    }
  };

  nightTemp = array => {
    const nightTemps = [];
    array.map(item => {
      if (format(new Date(item['dt'] * 1000), 'HH:mm') >= '18:00') {
        nightTemps.push(item.main.temp);
      }
      return nightTemps;
    });
    if (nightTemps.length !== 0) {
      return `Night Temperature: ${Math.min.apply(
        null,
        nightTemps
      )}${'\u00b0'}C - ${Math.max.apply(null, nightTemps)}${'\u00b0'}C`;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="container">
        <Welcome
          city={this.props.city}
          cityName={this.props.cityName}
          handleSubmit={this.props.handleSubmit}
        />

        <hr />
        {this.props.notFound ? (
          <div className="text-center not-found-section">
            <img
              className="not-found-logo"
              src="https://stubborn.fun/images/image-s-third-2.png"
              alt="not-fount logo"
            />
            <h3>Oops! No results for your search! Check the inserted city.</h3>
          </div>
        ) : (
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
                    <p className="lead">{this.morningTemp(item.day)}</p>
                    <p className="lead">{this.nightTemp(item.day)}</p>
                    <p className="lead">
                      Humidity: {this.meanHumidity(item.day)}
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
        )}
      </div>
    );
  }
}

export default Home;
