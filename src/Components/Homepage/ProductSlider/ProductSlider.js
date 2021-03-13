import React, { Component } from 'react';
import './ProductSlider.css';
import formatPrice from '../../utility/Price';
import formatStars from '../../utility/Stars';
import Modal from './ProductQuickview/ProductQuickview.js';
import axios from 'axios';
import {db} from '../../../firebase'

class ProductSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            myTitle: null,
            products: null
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    };

    componentDidMount = () => {
        db.ref('products').on('value', (snapshot)=>{
            let arr = [];
            for (let obj in snapshot.val()) {
                arr.push(snapshot.val()[obj])
            }

            let currArr = [];
            for (let object of arr) {
                if(this.props.slideId === "slide") {
                    if (object.special === true && currArr.length < 6) {
                        currArr.push(object)
                        console.log(currArr)
                    }
                } else if (this.props.slideId === "new" && currArr.length < 6) {
                    if (object.new === true) {
                        currArr.push(object)
                        console.log(currArr)
                    }
                } else if (this.props.slideId === "top" && currArr.length < 6) {
                    if (object.top === true) {
                        currArr.push(object)
                        console.log(currArr)
                    }
                }
            }

            this.setState({
                products: currArr,
            })
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
    }


    showModal = (e) => {
        console.log(e.target)
        this.setState({ show: true, myTitle:e.target.textContent });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        return (
            <div>
                <div className="slider mx-auto my-10">

                    <a href={`#${this.props.slideId}-0`} className="text-2xl bg-yellow-100 text-yellow-700 border-4 border-yellow-700 focus:border-opacity-0 hover:border-opacity-0">
                        &laquo;
                    </a>
                    <a href="#slide-2" className="opacity-0">2</a>
                    <a href="#slide-3" className="opacity-0">3</a>
                    <a href="#slide-4" className="opacity-0">4</a>
                    <a href="#slide-4" className="opacity-0">5</a>
                    <a href={`#${this.props.slideId}-5`} className="text-2xl bg-yellow-100 text-yellow-700 border-4 border-yellow-700 focus:border-opacity-0 hover:border-opacity-0">
                        &raquo;
                    </a>

                    <div className="slides">
                        {this.state.products && this.state.products.map( (product, index) => {
                            return (
                                <div className="text-xl" id={`${this.props.slideId}-${index}`} key={product.ISBN10}>
                                    <img src={product.image} width="50px" alt="somepic" className="itemImage h-auto w-1/3 mx-auto mt-4" />
                                    <p className="mx-auto text-xl text-yellow-700 cursor-pointer" onClick={this.showModal}>
                                        {product.title}
                                    </p>
                                    <p>
                                        {formatPrice(product.price)}
                                    </p>
                                    <p className="text-yellow-500">
                                        {formatStars(product.stars)}
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
