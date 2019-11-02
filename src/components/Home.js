import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

class Home extends React.Component {
   render() {
        return (
            <div className="container">
                <h1>Weather App</h1>
                <p>Insert the city and counrty to see the forecasts</p>
                <input type="text" value={this.props.city} placeholder="Please enter a city" onChange={this.props.cityName} />
                <input type="text" value={this.props.country} placeholder="Please enter a country" onChange={this.props.countryName} />
                <button type="submit" onClick={this.props.handleSubmit}>Search</button>
                <div>
                    {this.props.groupedForecasts.map((item, index) => {
                        let sumTemp = 0;
                        let sumHumidity = 0;
                        return (
                            <div key={index} className="row">
                               
                                    <div className="col-8">
                                        <h3>{item.date}</h3>
                                        {item.day.map((it, ind) => {
                                        sumTemp += it.main.temp
                                        sumHumidity += it.main.humidity
                                        return (
                                            <div key={ind} className="row">
                                                <div className="col">
                                                    <h5>{format(new Date(it['dt'] * 1000), 'HH:mm')}</h5>
                                                </div>
                                                <div className="col">
                                                    <p key={ind}>{Math.round(it.main.temp)}{'\u00b0'}C</p>
                                                </div>
                                            </div>
                                        )
                                        })}
                                    </div>
                                    <div className="col-4">
                                        <h2>{Math.round(sumTemp/item.day.length)}{'\u00b0'}C</h2>
                                    </div>                
                                    <h2>Humidity: {Math.round(sumHumidity/item.day.length)}</h2>
                            </div>
                                
                        )
                    })}
                </div>
                <Link to="/stats">Statistics</Link>
            </div>
        )
    }
}


export default Home;