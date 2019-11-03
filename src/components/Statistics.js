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
    return Math.round(Math.min.apply(null, allForecasts));
  };

  showMax = array => {
    const allForecasts = array.map(item => item.main.temp);
    return Math.round(Math.max.apply(null, allForecasts));
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
        {this.props.forecasts.length > 0 && (
          <div>
            <h3 className="pl-5">
              Mode Temperature(s) for the next five days:{' '}
              {this.showMode(this.props.forecasts)}
              {'\u00b0'}C
            </h3>
          </div>
        )}
        {this.props.groupedForecasts.map((item, index) => {
          return (
            <div className="my-3">
              <div key={index} className="row day-forecast">
                <div className="col-8">
                  <h2>{item.date}</h2>
                </div>
                <div className="col-4">
                  <AddValue
                    handleSubmit={value => this.handleSubmit(value, index)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="mx-5">
                  <h2 className="display-5 text-center">
                    {this.showMin(item.day)} {'\u00b0'}C
                  </h2>
                  <h3 className="text-center">Min</h3>
                </div>
                <div className="mx-5">
                  <h2 className="display-5 text-center">
                    {Math.round(this.showMean(item.day))} {'\u00b0'}C
                  </h2>
                  <h3 className="text-center">Mean</h3>
                </div>
                <div className="mx-5">
                  <h2 className="display-5 text-center">
                    {this.showMax(item.day)} {'\u00b0'}C
                  </h2>
                  <h3 className="text-center">Max</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Statistics;
