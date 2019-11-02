import React from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Statistics from './components/Statistics';

const { getCode } = require('country-list');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecasts: [],
      groupedForecasts: [],
      city: 'athens',
      country: 'greece'
    }
    this.cityName = this.cityName.bind(this);
    this.countryName = this.countryName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  cityName(e) {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }

  countryName(e) {
    e.preventDefault();
    const countryCode = getCode(e.target.value)
    this.setState({
      country: countryCode
    })
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { data: weather } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&appid=e39862b019a92f21bc77b2e6f1aad3eb&units=metric`)
    this.setState({
      forecasts: weather.list
    })
    const groups = this.state.forecasts.reduce((groups, day) => {
      const date = format(new Date(day['dt'] * 1000), 'EEEE dd/MM');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(day);
      return groups;
    }, {});
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        day: groups[date]
      };
    });
    this.setState({
      groupedForecasts: groupArrays
    })
    console.log(this.state.groupedForecasts);
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>

            <Switch>
              <Route path="/stats">
                <Statistics groupedForecasts={this.state.groupedForecasts} />
              </Route>
              <Route path="/">
                <Home 
                  cityName={this.cityName}
                  city={this.state.city}
                  country={this.state.country}
                  countryName={this.countryName}
                  handleSubmit={this.handleSubmit}
                  groupedForecasts={this.state.groupedForecasts}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
