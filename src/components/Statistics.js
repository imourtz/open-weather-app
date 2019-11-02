import React from 'react';

class Statistics extends React.Component {
    render() {
        return (
            <div>
                {this.props.groupedForecasts.map((item, index) => {
                    return (
                        <div key={index}>
                            <h1>{item.date}</h1>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Statistics;