import React, { Component } from 'react';
import './CheckoutDetails.css';
import formatPrice from '../../utility/Price'
import formatPrecent from '../../utility/Pecent'
import { Link } from "react-router-dom";

class CheckoutDetails extends Component {
    constructor() {
      super();
      this.couponRef = React.createRef()
      this.state = {
        productList: [],
        productNum: 0,
        taxRate: 5,
        totalPrice: 0,
        coupon: "",
        couponNotice: null,
        discount: 0,
        couponList: []
      }

    }

    componentDidUpdate = () => {
        this.updatePrice();
    }

    componentDidMount = () => {
        this.setCoupon()
    }

    setCoupon = () => {
        let hasCoupon = localStorage.getItem('coupon')
        if (hasCoupon && hasCoupon !== 0 && hasCoupon !== "0") {
            this.setState({
                couponNotice: <p className="pl-3">Discount: %{hasCoupon}</p>,
                discount: Number(hasCoupon),
            }, () => {this.updatePrice()})
        } else {
            this.setState({
                couponNotice: null
            })
        }
    }

    getCoupons = async() => {
        const response = await fetch("/coupons", {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            couponList: myres
        })
    }

    updatePrice = () => {
        let sum = this.props.totalProductsSum;
        let tax = (sum/100) * this.state.taxRate
        let total = sum + tax;
        let newTotal;
        if (this.state.discount !== 0) {
            let discount = (total/100) * this.state.discount;
            newTotal = total - discount
        } else {
            newTotal = total;
        }   
        if (newTotal !== this.state.totalPrice) {
            this.setState({
                totalPrice: newTotal,
            })
        }
    }

    getCoupon = (event) => {
        let couponText = event.target.value
        this.setState({
            coupon: couponText,
        })
    }

    checkCoupon = async() => {
        this.couponRef.current.value = ""

        const response = await fetch(`/coupons/findcode/${this.state.coupon}`, {
            method: 'GET'
        });
        let myres = await response.json()
        if(myres.length) {
            this.setState({
                couponNotice: <p className="pl-3">Discount: %{myres[0].Discount}</p>,
                discount: myres[0].Discount
            }, () => {
                this.updatePrice()
                localStorage.setItem('coupon',myres[0].Discount);
            })
        } else {
            this.setState({
                couponNotice: <p className="pl-3 text-red-500">INVALID COUPON</p>,
            })
            setTimeout(() => {this.setState({couponNotice: null,})}, 5000);
        }
    }

    render () {

        let checkoutBtn;
        if(this.props.totalProductsSum > 0) {
            checkoutBtn =                 <p className="pl-3">
                <Link to="/signedInCheckout">
                    <button className="bg-yellow-800 border border-yellow-800 hover:bg-yellow-100 hover:text-yellow-800 text-white active:bg-yellow-800 uppercase text-2xl px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 mt-2">
                        Checkout
                    </button>
                </Link>
            </p>
        } else {
            checkoutBtn =                 <p className="pl-3">
                <button className="bg-yellow-800 border border-yellow-800 text-white uppercase text-2xl px-6 py-3 rounded shadow outline-none mr-1 mb-2 mt-2 opacity-75 cursor-auto" disabled>
                    Checkout
                </button>
            </p>
        }

      return (
        <div className="CheckoutDetails m-5">
            <div className="details bg-gray-300 text-3xl p-0 rounded border border-yellow-700 text-center">
                <h1 className="bg-yellow-700 m-0 pt-1 pl-3 text-white text-3xl rounded-t-sm">
                    Shipment Details
                </h1>
                <p className="pl-3 pt-5">
                    Items: 
                    <span>
                        {formatPrice(this.props.totalProductsSum)}
                    </span>
                </p>
                <p className="pl-3">
                    Taxes: 
                    <span>
                        {formatPrecent(this.state.taxRate,null)}
                    </span>
                </p>
                {this.state.couponNotice}
                <hr className="mt-5 mb-5 border-yellow-800"/>
                <label htmlFor="coupon" className="pl-3">Enter Coupon:</label>
                <br/>
                <span className="pl-3">
                    <input 
                        type="text" 
                        id="coupon" 
                        ref={this.couponRef}
                        onChange={(event) => {this.getCoupon(event)}} 
                    />
                </span>
                <br/>
                <p className="pl-3 pb-5">
                    <button 
                        className="bg-yellow-600 text-white active:bg-yellow-600 uppercase text-xl px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 mt-2" 
                        onClick={() => {this.checkCoupon()}}
                    > 
                        Enter
                    </button>  
                </p>
                <hr className="mx-6 border-yellow-800"/>
                <p className="pl-3 py-5">
                    Total sum: 
                    <span>
                        {formatPrice(this.state.totalPrice)}
                    </span>
                </p>
                <hr className="mx-6 border-yellow-800"/>
                {checkoutBtn}
            </div>
        </div>
      )
    }
  }
  
  export default CheckoutDetails;