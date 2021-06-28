import React, { Component } from 'react';
import './FinalDetails.css';
import formatPrice from '../../utility/Price'
import formatPrecent from '../../utility/Pecent'

class FinalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taxRate: 5,
            totalProductsSum: localStorage.getItem('finalPrice'),
            totalPrice: 0,
            coupon: ((localStorage.getItem('coupon')!==null) ? `${localStorage.getItem('coupon')}%` : " None"),
            delivery: " None",
            priceWithDelivery: 0,
            deliveries: []
        }
    }

    componentDidMount = () => {

        this.setDeliveries()

        let addOn = (this.state.totalProductsSum/100) * this.state.taxRate;
        let finalPrice = Number(this.state.totalProductsSum) + addOn;
        if (this.state.coupon !== " None") {
            let couponSum = Number(localStorage.getItem('coupon'))
            let couponAdd = (finalPrice/100) * couponSum
            finalPrice -= couponAdd;
        }
        this.setState({
            totalPrice: finalPrice,
            priceWithDelivery: finalPrice,
        })
    }

    setDeliveries = async() => {
        const response = await fetch("/deliveries", {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            deliveries: myres
        })
    }

    validateDelivery = (event) => {
        let newPrice = Number(this.state.totalPrice) + Number(event.target.value)
        this.setState({
            delivery: event.target.title,
            priceWithDelivery: newPrice
        }, () => {this.props.setDelivery(event.target.id)})
    }

    render () {

        let notice;
        if (this.state.delivery === "none") {
            notice = <p className="pl-3 text-red-600 py-2">Please choose one of the above options</p>
        } else {
            notice = null;
        }

        return (
        <div className="m-5">
            <div className="bg-gray-300 text-3xl p-0 rounded border border-yellow-700 text-center my-36">
                <h1 className="bg-yellow-700 m-0 pt-1 pl-3 text-white text-3xl rounded-t-sm">
                    Shipment Details
                </h1>
                <p className="pl-3 pt-5">Items: 
                    <span>
                        {formatPrice(Number(this.state.totalProductsSum))}
                    </span>
                </p>
                <p className="pl-3">
                    Taxes: 
                    <span>
                        {formatPrecent(this.state.taxRate,null)}
                    </span>
                </p>
                <p className="pl-3">
                    Coupon: 
                    <span>
                        {this.state.coupon}
                    </span>
                </p>
                <p className="pl-3">
                    Delivery: 
                    <span>
                        {this.state.delivery}
                    </span>
                </p>
                <hr className="mx-6 border-yellow-800"/>
                <h1>Choose a delivery method:</h1>
                {this.state.deliveries && this.state.deliveries.map((delivery) => (
                    <span>
                        <input 
                            type="radio" 
                            id={delivery.id} 
                            name="delivery" 
                            value={delivery.Price} 
                            title={delivery.Name}
                            required 
                            onChange={(event) => {this.validateDelivery(event)}}
                        />
                        <label htmlFor={delivery.id}>{delivery.Name} - {delivery.Duration} - {delivery.Price}$</label>
                        <br/>
                    </span>
                ))}
                {notice}
                <hr className="mx-6 border-yellow-800"/>
                <p className="pl-3 py-5">
                    Total sum: 
                    <span>
                        {formatPrice(Number(this.state.priceWithDelivery))}
                    </span>
                </p>
            </div>
        </div>
        )
    }
}

export default FinalDetails;