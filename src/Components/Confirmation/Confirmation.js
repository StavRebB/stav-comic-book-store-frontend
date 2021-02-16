import React, { Component } from 'react';
import './Confirmation.css';

class Confirmation extends Component {
    constructor() {
        super();
        this.state = {
            orderNum: new Date().getTime()
        }
    }

    componentDidMount = () => {
        localStorage.clear();
    }

  render () {
    return (
    <main className="Confirmation text-center px-24 py-6">
        <div className="bg-gray-300 text-3xl py-10 rounded">
            <h1 className="text-5xl px-5 text-yellow-600">Order Placed!</h1>
            <p>Your order tracking code is: {this.state.orderNum}</p>
        </div>
    </main>
    )
  }
}

export default Confirmation;