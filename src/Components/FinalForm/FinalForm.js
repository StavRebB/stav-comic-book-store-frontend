import React, { Component } from 'react';
import './FinalForm.css';
import formatPrice from '../utility/Price'
import formatPrecent from '../utility/Pecent'

class FinalForm extends Component {
    constructor() {
        super();
        this.state = {
            taxRate: 5,
            totalProductsSum: localStorage.getItem('finalPrice'),
            coupon: ((localStorage.getItem('coupon') && localStorage.getItem('coupon') !== "0") ? `%${localStorage.getItem('coupon')}` : "None"),
            products: [],
            finalPrice: 0,
            bodyRes: null,
            couponid: null,
            delworth: null,
            delMethod: null,
        }
    }

    componentDidMount = () => {
        let finalPrice;
        let addOn = (this.state.totalProductsSum/100) * this.state.taxRate;
        finalPrice = Number(this.state.totalProductsSum) + addOn;
        if (this.state.coupon !== "None") {
            let couponWorth = Number(localStorage.getItem('coupon'))
            let couponAdd = (finalPrice/100) * couponWorth
            finalPrice -= couponAdd;
            this.findCoupon(couponWorth)
        }

        let deliveryFind = this.props.delivery

        this.findDelivery(deliveryFind, finalPrice)
    }

    findCoupon = async(num) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/coupons/finddiscount/${num}`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            couponid: myres[0].id,
        })
    }

    findDelivery = async(delid,finalprice) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/deliveries/${delid}`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            delworth: myres.Price,
            delMethod: `${myres.Name} ($${myres.Price})`,
        }, () => {
            finalprice +=  this.state.delworth
            this.setState({
                finalPrice: finalprice,
            })
        })
    }

    addOrder = async() => {
        let fakeHash = Date.now();
        this.props.orderNum(fakeHash)
        let thisDate = new Date();

        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/orders`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                PayerName: this.props.fullName,
                OrderNum: fakeHash,
                OrderDate: thisDate,
                Email: this.props.email,
                RecieverName: `${this.props.firstName} ${this.props.lastName}`,
                Address: this.props.fullAd,
                ZipCode: this.props.zipCode,
                Country: this.props.country,
                Payment: this.props.payment,
                Products: this.props.items,
                PhoneNumber: this.props.phoneNum,
                Sum: this.state.finalPrice,
                City: this.props.city,
                Delivery: this.props.delivery,
                Coupon: this.state.couponid,
                Refund: false,
                Notes: this.props.notes
            }),
        });

        const body = await response.text();
        this.setState({
            bodyRes: body
        }, () => {
            this.props.history.push('/confirmation')
        })
    }


  render () {

    let offers;
    if (this.props.offers !== false) {
        offers = 
            <p>
                <i className="far fa-check-circle"/>
                You will receive news and special offers in your email
            </p>
    } else {
        offers = 
            <p>
                <i className="far fa-times-circle text-black"/> 
                You will NOT receive news and special offers in your email
            </p>
    }

    let notes;
    if(this.props.notes !== "none") {
        notes = <p>{this.props.notes}</p>
    } else {
        notes = null
    }

    let deliver;
    if(this.state.delMethod === null) {
        deliver = <p>Delivery Method: </p>
    } else {
        deliver = <p>Delivery Method: {this.state.delMethod}</p>
    }

    let paymentMethod;
    if (this.props.payment === "cash") {
        paymentMethod = <p>Payment Method: Cash</p>
    } else if (this.props.payment === "paypal") {
        paymentMethod = <p>Payment Method: PayPal</p>
    } else {
        paymentMethod = <p>Payment Method: Credit Card</p>
    }

    let cardNum;
    let cardSecurity;
    let cardExp;
    if (this.props.payment === "credit") {
        cardNum = <span>Card Number: {this.props.cardNum}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        cardSecurity = <span>Security Number: {this.props.security}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        cardExp = <span>Expiraton Date: {this.props.expDate}&nbsp;&nbsp;&nbsp;&nbsp;</span>
    } else {
        cardNum = null;
        cardSecurity = null;
        cardExp = null;
    }


    return (
    <main className="FinalForm text-left p-12">
        <div className="bg-gray-300 text-3xl px-24 py-6 rounded">
            <div className="payerDetails">
                <h1 className="text-5xl text-yellow-700">Basic Details</h1>
                <span>Name: {this.props.fullName}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>Phone Number: {this.props.phoneNum}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>Email: {this.props.email}</span>
                {offers}
            </div>
            <hr className="border-yellow-800 my-6"/>
            <div className="receiverDetails">
                <h1 className="text-5xl text-yellow-700">Shipping Details</h1>
                <span>First Name: {this.props.firstName}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>Last Name: {this.props.lastName}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>Full Address: {this.props.fullAd}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>City: {this.props.city}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>Zip Code: {this.props.zipCode}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>Country: {this.props.country}</span>
                {notes}
            </div>
            <hr className="border-yellow-800 my-6"/>
            <div className="paymentDetails">
                <h1 className="text-5xl text-yellow-700">Payment Details</h1>
                {paymentMethod}
                {cardNum}
                {cardSecurity}
                {cardExp}
            </div>
            <hr className="border-yellow-800 my-6"/>
            <div className="orderDetail">
                <h1 className="text-5xl text-yellow-700">Order Details</h1>
                <span>Order Price: {formatPrice(Number(this.state.totalProductsSum))}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>Tax Rate: {formatPrecent(this.state.taxRate,null)}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>Coupon: {this.state.coupon}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {this.state.delMethod && deliver}
                <span>Total Price: {formatPrice(this.state.finalPrice)}</span>
            </div>
            <hr className="border-yellow-800 my-6"/>
            <div className="placeOrder text-right">
                    <button className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 hover:bg-yellow-100 hover:text-yellow-800 border border-yellow-800" onClick={() => {this.addOrder()}}>
                        Place Order
                    </button>
            </div>
        </div>
    </main>
    )
  }
}

export default FinalForm;