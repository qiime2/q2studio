import React from 'react';
var moment = require('moment');

class Timer extends React.Component {

    componentDidMount() {
        this.interval = setInterval(() => {
            const diff = Date.now() - +this.props.start;
            const formattedDate = moment.utc(diff).format('HH:mm:ss')
            // var formattedDate = dateFormat(diff, "h:MM:ss");
            this.elem.innerHTML =  formattedDate + "";
        }, 900)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        const start = this.props.start; 
        return (
            <span 
                ref={(e) => {
                    this.elem = e;
                }}
            >
                00:00:00
            </span>
        );
    }

}

Timer.propTypes = {
    start: React.PropTypes.number
};

export default Timer;
