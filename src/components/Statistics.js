import React from 'react';
import {showMean} from '../utils/showMean';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addedValue: '',
            newForecasts: this.props.groupedForecasts
        }
    }

    showMin = (array) => {
        const allForecasts = array.map((item) => item.main.temp);
        return Math.min.apply(null, allForecasts);
    }
    
    showMax = (array) => {
        const allForecasts = array.map((item) => item.main.temp);
        return Math.max.apply(null, allForecasts);    
    }

    showMean = (array) => {
        return showMean(array)
    }

    showMode = () => {
            const allTemps = []
            this.state.newForecasts.map((item) => {
                return item.day.map((it) => {
                    return allTemps.push(Math.round(it.main.temp))
                })
            })
            var modes = [], count = [], i, number, maxIndex = 0;
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
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            addedValue: e.target.value
        })
    }

    handleSubmit(index) {
        const temp = parseFloat(this.state.addedValue)
        const newForecasts = [...this.state.newForecasts];
        const updatedForecasts = [...this.state.newForecasts[index].day]
        updatedForecasts.push({main: {temp, temp_min: temp, temp_max: temp}});
        newForecasts[index].day = updatedForecasts;
        
        this.setState({
          newForecasts: newForecasts  
        })
    }

    render() {
        return (
            <div className="container">
                {this.props.groupedForecasts.map((item, index) => {
                    return (
                        <div key={index} className="row day-forecast">
                            <div className="col">
                                <h1>{item.date}</h1>
                                <p className="lead">Insert temperature: </p>
                                <input type="number" onChange={this.handleChange} />
                                <button disabled={this.state.addedValue.length === 0} onClick={this.handleSubmit.bind(this,index)}>ADD</button>
                            </div>
                            <div className="col">
                                <h3>Min Temperature: {(this.showMin(item.day))}{'\u00b0'}C</h3>
                                <h3>Max Temperature: {(this.showMax(item.day))}{'\u00b0'}C</h3>
                                <h3>Mean Temperature: {Math.round(this.showMean(item.day))}{'\u00b0'}C</h3>
                            </div>
                        </div>
                    )
                })}

                {this.props.forecasts.length > 0 && (
                    <div>
                        <h3>Mode Temperature(s) for the next five days: {this.showMode(this.props.forecasts)}{'\u00b0'}C</h3>
                    </div>
                )}
            </div>
        )
    }
}

export default Statistics;
