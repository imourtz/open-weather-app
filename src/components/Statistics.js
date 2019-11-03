import React from 'react';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addedValue: '',
            newForecasts: this.props.groupedForecasts
        }
    }

    showMin = (array) => {
        let min = array[0].main["temp_min"];
        array.map((item, index) => {
            if (item.main["temp_min"]<min) {
                min = item.main["temp_min"]
            }
            return min;
        })
        return min;
    }
    
    showMax = (array) => {
        let max = array[0].main["temp_max"];
        array.map((item, index) => {
            if (item.main["temp_max"]>max) {
                max = item.main["temp_max"]
            }
            return max;
        })
        return max;
    }

    showMean = (array) => {
        let sum = 0;
        array.map((item, index) => {
            sum += item.main.temp
            return sum;
        })
        return sum/array.length;
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
         
            for (i in count)
                if (count.hasOwnProperty(i)) {
                    if (count[i] === maxIndex) {
                        modes.push(Number(i));
                    }
                }
            return modes;
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
            <div>
                {this.props.groupedForecasts.map((item, index) => {
                    return (
                        <div key={index}>
                            <h1>{item.date}</h1>
                                <input type="number" onChange={this.handleChange} />
                                <button onClick={this.handleSubmit.bind(this,index)}>ADD</button>
                            <h3>Min Temperature: {(this.showMin(item.day))}{'\u00b0'}C</h3>
                            <h3>Max Temperature: {(this.showMax(item.day))}{'\u00b0'}C</h3>
                            <h3>Mean Temperature: {Math.round(this.showMean(item.day))}{'\u00b0'}C</h3>
                        </div>
                    )
                })}

                {this.props.forecasts.length > 0 && (
                    <div>
                        <h1>Minimum Temperature for the next five days: {Math.round(this.showMin(this.props.forecasts))}{'\u00b0'}C</h1>
                        <h1>Maximum Temperature for the next five days: {Math.round(this.showMax(this.props.forecasts))}{'\u00b0'}C</h1>
                        <h1>Mean Temperature for the next five days: {Math.round(this.showMean(this.props.forecasts))}{'\u00b0'}C</h1>
                        <h1>Mode (most common) Temperature for the next five days: {this.showMode(this.props.forecasts)}{'\u00b0'}C</h1>
                    </div>
                )}
            </div>
        )
    }
}

export default Statistics;
