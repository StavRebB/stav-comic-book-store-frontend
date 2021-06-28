import React, { Component } from 'react';
import CheckoutDetails from './CheckoutDetails/CheckoutDetails';
import ItemsToBuy from './ItemsToBuy/ItemsToBuy';
import './ShoppingCart.css';

class ShoppingCart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        productList: this.props.cartContent,
        productNum: 0,
        totalProductsSum: 0,
      }
      this.getTotal = this.getTotal.bind(this)
    }

    getTotal(num) {
        this.setState({
            totalProductsSum: num,
        }, () => {
          localStorage.setItem('finalPrice', this.state.totalProductsSum)
        })
    }

    tryAddToCart = () => {
        this.props.addToCart(true)
    }

    setTheseItems = (arr) => {
      this.props.setItems(arr)
    }
  
    render () {
      return (
        <main className="shoppingCart">
            <div className="items">
                <ItemsToBuy cartContent={this.state.productList} getTotal={this.getTotal} addToCart={this.tryAddToCart} setItems={this.setTheseItems}/>
            </div>
            <div className="checkout">
                <CheckoutDetails totalProductsSum={this.state.totalProductsSum} />
            </div>
        </main>
      )
    }
  }
  
  export default ShoppingCart;
  