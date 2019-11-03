import React from 'react';
import { showMean } from '../utils/showMean';
import AddValue from './AddValue';
import { Link } from 'react-router-dom';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedForecasts: this.props.groupedForecasts,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  showMin = array => {
    const allForecasts = array.map(item => item.main.temp);
    return Math.min.apply(null, allForecasts);
  };

  showMax = array => {
    const allForecasts = array.map(item => item.main.temp);
    return Math.max.apply(null, allForecasts);
  };

  showMean = array => {
    return showMean(array);
  };

  showMode = () => {
    const allTemps = [];
    this.state.updatedForecasts.map(item => {
      return item.day.map(it => {
        return allTemps.push(Math.round(it.main.temp));
      });
    });
    var modes = [],
      count = [],
      i,
      number,
      maxIndex = 0;
    for (i = 0; i < allTemps.length; i += 1) {
      number = allTemps[i];
      count[number] = (count[number] || 0) + 1;
      if (count[number] > maxIndex) {
        maxIndex = count[number];
      }
    }

    for (i in count) {
      if (count.hasOwnProperty(i)) {
        if (count[i] === maxIndex) {
          modes.push(Number(i));
        }
      }
    }
    return modes.join(`${'\u00b0'}C and `);
  };

  handleSubmit(value, index) {
    const temp = parseFloat(value);
    const newForecasts = [...this.state.updatedForecasts];
    const updatedForecasts = [...this.state.updatedForecasts[index].day];
    updatedForecasts.push({ main: { temp, temp_min: temp, temp_max: temp } });
    newForecasts[index].day = updatedForecasts;
    this.setState({
      updatedForecasts: newForecasts,
    });
  }

  render() {
    return (
      <div className="container">
        {this.props.groupedForecasts.length !== 0 ? (
          <h2 className="day-forecast">
            Statistics for {this.props.city.toUpperCase()}
          </h2>
        ) : (
          <div className="stats-link-button">
            <h2>No stats found!</h2>
            <Link to="/">
              <button className="btn btn-primary">Return to Home</button>
            </Link>
          </div>
        )}
        {this.props.groupedForecasts.map((item, index) => {
          return (
            <div key={index} className="row day-forecast">
              <div className="col">
                <h1>{item.date}</h1>
                <AddValue
                  handleSubmit={value => this.handleSubmit(value, index)}
                />
              </div>
              <div className="col">
                <h3>
                  Min Temperature: {this.showMin(item.day)}
                  {'\u00b0'}C
                </h3>
                <h3>
                  Max Temperature: {this.showMax(item.day)}
                  {'\u00b0'}C
                </h3>
                <h3>
                  Mean Temperature: {Math.round(this.showMean(item.day))}
                  {'\u00b0'}C
                </h3>
              </div>
            </div>
          );
        })}

        {this.props.forecasts.length > 0 && (
          <div>
            <h3>
              Mode Temperature(s) for the next five days:{' '}
              {this.showMode(this.props.forecasts)}
              {'\u00b0'}C
            </h3>
          </div>
        )}
      </div>
    );
  }
}

export default Statistics;
