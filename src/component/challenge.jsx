import React, { PureComponent } from 'react';
import constFile from '../helper/const';

class Challenge extends PureComponent {
    constructor(props) {
        super(props);
        this.connectSocket = this.connectSocket.bind(this);
        this.processData = this.processData.bind(this);
        this.updatedData = this.updatedData.bind(this);
        this.state = {
            stockObj: {}
        }
    }

    componentDidMount() {
        this.connectSocket();

    }

    connectSocket = function () {
        let socket = new WebSocket(constFile.socketUrl);
        let that = this;
        socket.onopen = function (event) {
            console.log(`Conneted to ${event.currentTarget.url}`);
        }

        socket.onmessage = function (event) {
            //call setState
            console.log(`event is ${event.data}`);
            that.processData(JSON.parse(event.data));

        }
    }

    processData = function (obj) {
        let localStock = Object.assign({}, this.state.stockObj);
        obj.map((item) => {
            if (!localStock[item[0]]) {
                localStock[item[0]] = new this.updatedData(item[1]);
            } else {
                let phase = parseInt(localStock[item[0]].data, 10) < parseInt(item[1], 10) ? 'rising' : 'falling';
                localStock[item[0]] = new this.updatedData(item[1], phase);
            }
        })
        this.setState({
            stockObj: localStock
        })

    }

    updatedData = function (data, phase = 'init') {
        this.data = data.toFixed(2);
        this.time = new Date().toLocaleString();
        this.class = phase;
    }

    render() {
        let headerData = ['Ticker', 'Price', 'Last Updated'];
        debugger;
        return (
            <div className='chartHeader'>
                <div className='header'>
                    {
                        headerData.map((item) => {
                            return <span key={item}>{item}</span>
                        })
                    }
                </div>
                <div className='container'>
                    {
                        Object.keys(this.state.stockObj).map(item => {
                            return <div className={this.state.stockObj[item].class} key={item}> <span>{item}</span><span>{this.state.stockObj[item].data}</span><span>{this.state.stockObj[item].time}</span></div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Challenge;