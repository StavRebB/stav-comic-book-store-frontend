import React, { Component } from 'react';
import FinalDetails from '../Checkout/FinalDetails/FinalDetails';
import './SignedCheckout.css';
import SignedCheckoutForms from './SignedCheckoutForms/SignedCheckoutForms'

class SignedCheckout extends Component {
  constructor() {
    super();
    this.state = {
      delivery: null,
      curUser: null,
    }
  }

  componentDidMount = async() => {

    let currEmail = localStorage.getItem('currentUser')

    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/members/email/${currEmail}`, {
      method: 'GET'
    });
    let myres = await response.json()

    this.setState({
      curUser: myres
    }, () => {

      this.props.addToOrder("firstName", this.state.curUser.FirstName)
      this.props.addToOrder("email", currEmail)
  
      if(this.state.curUser.LastName !== "none" && this.state.curUser.LastName !== null) {
        let fullname = `${this.state.curUser.FirstName} ${this.state.curUser.LastName}`
        this.props.addToOrder("fullName", fullname) 
        this.props.addToOrder("lastName", this.state.curUser.LastName)
      }
  
      if(this.state.curUser.PhoneNumber !== "none" && this.state.curUser.PhoneNumber !== null) {
        this.props.addToOrder("phoneNum", this.state.curUser.PhoneNumber) 
      }
  
      if(this.state.curUser.Address !== "none" && this.state.curUser.Address !== null) {
        this.props.addToOrder("fullAd", this.state.curUser.Address) 
      }
  
      if(this.state.curUser.City !== "none" && this.state.curUser.City !== null) {
          this.props.addToOrder("city", this.state.curUser.City) 
      }
  
      if(this.state.curUser.Country !== "none" && this.state.curUser.Country !== null) {
          this.props.addToOrder("country", this.state.curUser.Country) 
      }
  
      if(this.state.curUser.ZipCode !== "none" && this.state.curUser.ZipCode !== null) {
        this.props.addToOrder("zipCode", this.state.curUser.ZipCode) 
      }
    })

  }

  setDelivery = (val) => {
    this.setState({
      delivery: val,
    },() => {this.props.addToOrder("delivery",this.state.delivery)})
  }

  setOrder = (name1,val) => {
    this.props.addToOrder(name1,val)
  }

  render () {
      let pending;
      if(this.state.curUser === null) {
        pending=<h1 className="text-9xl text-yellow-600">Loading...</h1>
      } else {
        pending=<SignedCheckoutForms delivery={this.state.delivery} addToOrder={this.setOrder} curUser={this.state.curUser}/>
      }
    return (
    <main className="SignedCheckout text-center">
        <div className="forms">
            {pending}
        </div>
        <div className="checkoutDetails">
            <FinalDetails setDelivery={this.setDelivery}/>
        </div>
    </main>
    )
  }
}

export default SignedCheckout;