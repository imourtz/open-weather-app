import React from 'react';
import Logo from '../icons/logo';

class Welcome extends React.Component {
  render() {
    return (
      <div className="text-center">
        <div className="welcome-section">
          <h1>Weather App</h1>
          <p className="lead">
            Find the weather for the city you like, with a five-day forecast.
          </p>
          <Logo />
        </div>
        <p className="lead">Insert the city and counrty to see the forecasts</p>
        <form className="form-inline d-flex justify-content-center">
          <label className="sr-only" htmlFor="inlineFormCity">
            City
          </label>
          <input
            type="text"
            className="form-control mb-2 mr-sm-2"
            id="inlineFormCity"
            value={this.props.city}
            placeholder="City"
            onChange={this.props.cityName}
            required
          />
          <label className="sr-only" htmlFor="inlineFormCountry">
            Country
          </label>
          <input
            type="text"
            className="form-control mb-2 mr-sm-2"
            id="inlineFormCountry"
            placeholder="Country"
            onChange={this.props.countryName}
          />
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={this.props.handleSubmit}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Welcome;
