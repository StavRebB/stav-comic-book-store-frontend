import React, { Component } from 'react';
import formatPrice from '../../utility/Price';
import formatStars from '../../utility/Stars';
import './itemView.css';
import { Link } from 'react-router-dom';

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCartMessage: null,
            productsList: null,
        }
    }

    addToStorage = (itemId) => {
        let myCart = JSON.parse(localStorage.getItem('shoppingCart'));
        if(myCart == null) {
            myCart = [];
        }
        myCart.push(itemId);
        let myList = Array.from(new Set(myCart));
        let lengthList = myList.length
        localStorage.setItem('shoppingCart',JSON.stringify(myList))
        localStorage.setItem('shoppingLength',lengthList)
        this.setState({
            addCartMessage: 
                <h1 className="text-3xl text-yellow-300 text-center pb-5 pt-5">
                    <i className="fas fa-check-square"></i> 
                    Item added to cart!
                </h1>
        })
        setTimeout(() => {
            this.setState({
                addCartMessage: null
            })
        }, 10000);
    }

  render () {
    return (
        <div>
            {this.state.addCartMessage}
            <ul className="items">
            {this.props.products.map(product => (
                    <li key={product.id}>
                        <div className="product rounded bg-gray-600">
                            <span>
                                <img src={`/photos/photoSrc/products/${product.MainImage}`} width="150" alt={product.Title}></img>
                                <Link to={"/item/" + product.id}>
                                <p className="item-title text-yellow-400 text-2xl">
                                    {product.Title}
                                </p>
                                </Link>
                            </span>
                            <p className="text-center text-yellow-400">
                                {formatStars(product.Stars)}
                            </p>
                            <div className="product-price">
                                <div className="text-gray-300 text-3xl">
                                    {formatPrice(product.CurrentPrice)}
                                </div>
                                <div className="item-buttons">
                                    <button 
                                        className="button primary bg-yellow-600 text-yellow-100 border hover:border-yellow-600 hover:bg-yellow-100 hover:text-yellow-600 active:bg-yellow-600 font-bold uppercase text-xl px-2 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1" 
                                        type="button" 
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => {
                                            (this.addToStorage(product.ISBN10));
                                            (this.props.addToCart(true))
                                        }}
                                    >
                                        <i className="fas fa-cart-arrow-down"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
  }
}

export default ItemView;