import React, { Component } from 'react';
import './Homepage.css';
import ProductSlider from './ProductSlider/ProductSlider';
import HeaderSlider from './HeaderSlider/HeaderSlider';
import { Link } from 'react-router-dom';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
        }
    }

    addSum = () => {
        this.props.addSum()
    }

    render () {
        return(    
            <main className="othe pb-12">
                <HeaderSlider />
                {this.state.message}
                <div>
                    <Link to="/catalogue/specials">
                        <h1 className="text-6xl font-bold text-center text-yellow-200 ">Special offers!</h1>
                    </Link>
                    <ProductSlider slideId="slide" addSum={this.addSum}/>
                </div>
                <div>
                    <Link to="/catalogue/new">
                        <h1 className="text-6xl font-bold text-center text-yellow-200">New Items!</h1>
                    </Link>
                    <ProductSlider slideId="new" addSum={this.addSum}/>
                </div>
                <div>
                    <Link to="/catalogue/top">
                    <h1 className="text-6xl font-bold text-center text-yellow-200">Top Sellers!</h1>
                    </Link>
                    <ProductSlider slideId="top" addSum={this.addSum}/>
                </div>
            </main>
        )
    }
}

export default Homepage;