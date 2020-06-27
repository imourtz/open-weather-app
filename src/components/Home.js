import React from 'react';
import { format } from 'date-fns';
import Welcome from '../components/Welcome';
import DayForecasts from './DayForecasts';

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
      const date = format(new Date(item['dt'] * 1000), 'HH:mm');
      if (date <= '12:00') {
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
      const date = format(new Date(item['dt'] * 1000), 'HH:mm');
      if (date >= '18:00') {
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
          <DayForecasts
            groupedForecasts={this.props.groupedForecasts}
            city={this.props.city}
            morningTemp={this.morningTemp}
            nightTemp={this.nightTemp}
            meanHumidity={this.meanHumidity}
          />
        )}
      </div>
    );
  }
}

export default Home;
