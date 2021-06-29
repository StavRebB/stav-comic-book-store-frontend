import React, { Component } from 'react';
import './Confirmation.css';

class Confirmation extends Component {
    constructor() {
        super();
        this.state = {
            orderNum: new Date().getTime(),
            body: null
        }
    }

    componentDidMount = () => {
        this.confirmationEmail()
        localStorage.setItem('shoppingCart',(JSON.stringify([])));
        localStorage.setItem('shoppingLength',0);
        localStorage.setItem('finalPrice',0);
        localStorage.setItem('coupon',0);
        this.props.addToCart()
    }

    confirmationEmail = async() => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/mail/sendmailtoclient`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                clientmail: this.props.email,
                subject: `Your Order Has Been Made`,
                content: `
                Hello,
                Your Order has been confirmed and processing had begun.
                You can track your order through the code: ${this.props.orderNum}

                Yours,
                FunnyBooks.com
                `,
            }),
        });

        const body = await response.text();
        this.setState({
            body: body
        })
    }

  render () {
    return (
    <main className="Confirmation text-center px-24 py-6">
        <div className="bg-gray-300 text-3xl py-10 rounded">
            <h1 className="text-5xl px-5 text-yellow-600">Order Placed!</h1>
            <p>Your order tracking code is: {this.props.orderNum}</p>
            <p>A confirmation email had been sent to the address you supplied.</p>
        </div>
    </main>
    )
  }
}

export default Confirmation;