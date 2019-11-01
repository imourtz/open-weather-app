import React from 'react';
import axios from 'axios';
// import { format, compareAsc } from 'date-fns'
// import parse from 'date-fns/parse';
// import toDate from 'date-fns/toDate';
import { format } from 'date-fns';


const { getCode } = require('country-list');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecasts: [],
      city: 'athens',
      country: 'greece',
      dates: []
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
    let dateArray = []
    e.preventDefault();
    const { data: weather } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&appid=e39862b019a92f21bc77b2e6f1aad3eb&units=metric`)
    this.setState({
      forecasts: weather.list
    })

    let formattedDate = this.state.dates;
    this.state.forecasts.map((item, index) => {
      // return dateArray.push(format(parseISO(item["dt_txt"]), 'dd/MM/yyyy'))
      // const parsed = parse(item['dt'], 't', new Date());
      const parsed = new Date(item['dt'] * 1000);
      console.log(parsed) 
      const formatted = format(parsed, 'EEEE dd/MM HH:mm')
      formattedDate.push(formatted)
      console.log(formatted) 
      console.log('---------------') 
    })
    this.setState({
      dates: formattedDate
    })
    console.log(this.state.forecasts)
    console.log(this.state.dates)
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.city} placeholder="Please enter a city" onChange={this.cityName} />
        <input type="text" value={this.state.country} placeholder="Please enter a country" onChange={this.countryName} />
        <button type="submit" onClick={this.handleSubmit}>Search</button>
        <div>
          {this.state.forecasts.map((item, index) => {
            // console.log(item)
            // this.compareDates(item)
            return (
              <div key={index}>
                {/* {parse(item["dt_txt"], 'MM/DD/YYYY', new Date())} */}
                {/* {item["dt_txt"].split(" ",1)} */}
                {/* <h3>{item["dt_txt"]}</h3> */}
                {/* {format(parseISO(item["dt_txt"]), 'dd/MM/yyyy')} */}
                <h3>{this.state.dates[index]}</h3>
                <p>{item.main.temp}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;
