import React, { Component } from 'react';
import FirstForm from './FirstForm/FirstForm';
import FinalDetails from './FinalDetails/FinalDetails';
import './Checkout.css';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      delivery: null,
    }
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
    return (
    <main className="Checkout text-center">
        <div className="forms">
            <FirstForm 
              delivery={this.state.delivery} 
              addToOrder={this.setOrder}
            />
        </div>
        <div className="checkoutDetails">
            <FinalDetails setDelivery={this.setDelivery}/>
        </div>
    </main>
    )
  }
}

export default Checkout;