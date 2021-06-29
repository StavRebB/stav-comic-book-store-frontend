import React, { Component } from 'react';
import './ProductSlider.css';
import formatPrice from '../../utility/Price';
import formatStars from '../../utility/Stars';
import Modal from './ProductQuickview/ProductQuickview.js';

class ProductSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            myTitle: null,
            products: null,
            moreProds: null,
            bought: null,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    };

    componentDidMount = () => {
        if (this.props.slideId === "top") {
            this.getTops()
        } else if (this.props.slideId === "new") {
            this.getNews()
        } else if (this.props.slideId === "slide") {
            this.getSpecials()
        }
        this.props.addSum()
    }

    getTops = async() => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products/tops`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            products: myres.slice(0,6)
        })
    }

    getNews = async() => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products/news`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            products: myres.slice(0,6)
        })
    }

    getSpecials = async() => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products/specials`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            products: myres.slice(0,6)
        })
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
        setTimeout(() => {
            window.location.reload()
        }, 1000);
        this.setState(this.state)
    }


    showModal = (e) => {
        this.setState({ show: true, myTitle:e.target.textContent });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        return (
            <div>
                <div className="slider mx-auto my-10">

                    <div className="slides">
                        {this.state.products && this.state.products.map( (product, index) => {
                            return (
                                <div className="text-xl" id={`${this.props.slideId}-${index}`} key={product.ISBN10}>
                                    <img src={product.MainImage ? `${process.env.REACT_APP_SERVER_DOMAIN}/photos/photoSrc/products/${product.MainImage}` : "https://via.placeholder.com/150x250"} width="100px" alt="somepic" className="itemImage h-auto w-1/3 mx-auto mt-4" />
                                    <p className="mx-auto text-xl text-yellow-700 cursor-pointer" onClick={this.showModal}>
                                        {product.Title}
                                    </p>
                                    <p>
                                        {formatPrice(product.CurrentPrice)}
                                    </p>
                                    <p className="text-yellow-500">
                                        {formatStars(product.Stars)}
                                    </p>
                                </div>
                            )
                        },this)}
                    </div>
                </div>
                <div>
                    <Modal show={this.state.show} handleClose={this.hideModal} title={this.state.myTitle} products={this.state.products} addToStorage={this.addToStorage} />
                </div>
            </div>
        )
    }
}

export default ProductSlider;
