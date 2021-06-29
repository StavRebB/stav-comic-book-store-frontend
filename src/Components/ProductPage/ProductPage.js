import React, { Component } from 'react';
import './ProductPage.css';
import formatStars from '../utility/Stars';
import formatPrice from '../utility/Price';
import formatPrecent from '../utility/Pecent';
import { Link } from 'react-router-dom';

class ProductPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            imgUrl: "https://via.placeholder.com/350x450",
            mainImg: "https://via.placeholder.com/350x450",
            title: null,
            format: null,
            pages: null,
            dimensions: null,
            weight: null,
            publisher: null,
            publicationPlace: null,
            language: null,
            price: null,
            publicationDate: null,
            description: null,
            ISBN10: 0,
            ISBN13: null,
            author: null,
            artist: null,
            stars: null,
            originalPrice: null,
            diff: null,
            shoppingCart: [],
            cartMessage: null,
            imgOne: "https://via.placeholder.com/350x450/0000FF",
            imgTwo: "https://via.placeholder.com/350x450/FF0000",
            imgThree: "https://via.placeholder.com/350x450/008000",
            imgFour: "https://via.placeholder.com/350x450/000000",
            recs: [],
            times: 0,
        };
    }

    showEvent = (event) => {
        this.setState ({
            mainImg: event.target.src
        })
    }

    componentDidMount() {
        this.getProduct()
        this.getRecs()
    }

    getRecs = async() => {

        let MyID = this.props.match.params.itemISBN;

        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products/id/${MyID}`, {
            method: 'GET'
        });
        let myres = await response.json()

        this.setState({
            recs: myres,
        })
    }

    getProduct = async() => {

        let MyID = this.props.match.params.itemISBN;

        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products/${MyID}`, {
            method: 'GET'
        });
        let myres = await response.json()

        this.setState({
            product: myres,
        }, () => {
            this.getOtherImages(this.state.product.id)
            this.getPublisher(this.state.product.Publisher)
            this.getLanguage(this.state.product.Language)
            this.getFormat(this.state.product.Format)
            this.setState({
                title: this.state.product.Title,
                pages: this.state.product.Pages,
                dimensions: this.state.product.Dimensions,
                weight: this.state.product.Weight,
                price: this.state.product.CurrentPrice,
                publicationDate: this.state.product.PublicationDate.slice(0,10),
                description: this.state.product.Description,
                ISBN10: this.state.product.ISBN10,
                ISBN13: this.state.product.ISBN13,
                author: this.state.product.Author,
                artist: this.state.product.Artist,
                stars: this.state.product.Stars,
                originalPrice: this.state.product.OriginalPrice,
                imgUrl: this.state.product.MainImage === null ? "https://via.placeholder.com/350x450" : `${process.env.REACT_APP_SERVER_DOMAIN}/photos/photoSrc/products/${this.state.product.MainImage}`,
                mainImg: this.state.product.MainImage === null ? "https://via.placeholder.com/350x450" : `${process.env.REACT_APP_SERVER_DOMAIN}/photos/photoSrc/products/${this.state.product.MainImage}`,
            })
        })

    }

    getOtherImages = async(prodid) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/productimages/byprod/${prodid}`, {
            method: 'GET'
        });
        let myres = await response.json()
        let imgs = myres;
        if(imgs[0]) {
            this.setState({
                imgOne: `${process.env.REACT_APP_SERVER_DOMAIN}/photos/photoSrc/products/${imgs[0].Name}`
            })
        }
        if(imgs[1]) {
            this.setState({
                imgTwo: `${process.env.REACT_APP_SERVER_DOMAIN}/photos/photoSrc/products/${imgs[1].Name}`
            })
        }
        if(imgs[2]) {
            this.setState({
                imgThree: `${process.env.REACT_APP_SERVER_DOMAIN}/photos/photoSrc/products/${imgs[2].Name}`
            })
        }
        if(imgs[3]) {
            this.setState({
                imgFour: `${process.env.REACT_APP_SERVER_DOMAIN}/photos/photoSrc/products/${imgs[3].Name}`
            })
        }
    }

    getFormat = async(formatid) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/formats/${formatid}`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            format: myres.Name,
        })
    }

    getLanguage = async(langid) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/languages/${langid}`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            language: myres.Name,
        })
    }

    getPublisher = async(pubid) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/publishers/${pubid}`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            publisher: myres.Name,
            publicationPlace: `${myres.PublicationCity}, ${myres.PublicationCountry}`
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

   render(){
      return(
          <main className="myYellow">
          <div className="mx-96 my-10">
              {this.state.cartMessage}
              <div className="grid grid-cols-4 grid-rows-7 gap-3">
                <div className="col-span-4 row-span-1">
                    <h1 className="text-4xl font-bold py-2 bg-yellow-700 text-center rounded text-white">
                        {this.state.title}
                    </h1>
                </div>
                <div className="col-span-1 row-span-3 place-self-center">
                    <img src={this.state.mainImg} className="border border-black" alt=""/>
                </div>
                <div className="col-span-2 row-span-3 bg-gray-300 p-9 border border-gray-200 rounded text-xl">
                    <p>
                        <span className="underline">Author(s):</span>
                        <span> {this.state.author}</span>
                    </p>
                    <p>
                        <span className="underline">Artist(s):</span>
                        <span> {this.state.artist}</span>
                    </p>
                    <br/>
                    <p className="text-yellow-500">
                        {formatStars(this.state.stars)}
                    </p>
                    <br/>
                    <p>
                        {this.state.description}
                    </p>
                </div>
                <div className="col-span-1 row-span-3 text-center p-9">
                    <p>
                        <span className="text-2xl text-gray-400 line-through italic">
                            {formatPrice(this.state.originalPrice)}
                        </span> 
                        <span className="text-5xl text-yellow-500">
                            {formatPrice(this.state.price)}
                        </span>
                    </p>
                    <p className="text-xl text-gray-400 italic">
                        You save {formatPrecent(this.state.originalPrice,this.state.diff)}!
                    </p>
                    <br/>
                    <p className="text-3xl text-gray-300">
                        Worldwide delivery
                    </p>
                    <br/>
                    <button 
                        className="bg-yellow-700 text-yellow-100 active:bg-yellow-700 font-medium uppercase text-2xl px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 hover:bg-yellow-100 hover:text-yellow-600 active:bg-white" 
                        type="button" 
                        style={{ transition: "all .15s ease" }} 
                        onClick={() => {
                            (this.addToStorage(this.state.ISBN10));
                            (this.props.addToCart(true))
                        }}
                    >
                        <i className="fas fa-cart-arrow-down"></i> Add to Cart
                    </button>
                </div>
                <div className="col-span-1 row-span-1">
                    <div className="grid grid-cols-5 grid-rows-1 gap-2">
                        <span className="col-span-1">
                            <img 
                                src={this.state.imgUrl}
                                width="50" 
                                className="mx-auto border border-black" 
                                alt="" 
                                onClick={this.showEvent.bind(this)}
                            />
                        </span>
                        <span className="col-span-1">
                            {(this.state.imgOne === "https://via.placeholder.com/350x450/0000FF") ? <img src={this.state.imgOne} alt="" width="50" className="mx-auto border border-black opacity-50"/> : <img src={this.state.imgOne} alt="" width="50" className="mx-auto border border-black cursor-pointer" onClick={this.showEvent.bind(this)}/>}
                        </span>
                        <span className="col-span-1" href="">
                            {(this.state.imgTwo === "https://via.placeholder.com/350x450/FF0000") ? <img src={this.state.imgTwo} alt="" width="50" className="mx-auto border border-black opacity-50"/> : <img src={this.state.imgTwo} alt="" width="50" className="mx-auto border border-black cursor-pointer" onClick={this.showEvent.bind(this)}/>}
                        </span>
                        <span className="col-span-1" href="">
                            {(this.state.imgThree === "https://via.placeholder.com/350x450/008000") ? <img src={this.state.imgThree} alt="" width="50" className="mx-auto border border-black opacity-50"/> : <img src={this.state.imgThree} alt="" width="50" className="mx-auto border border-black cursor-pointer" onClick={this.showEvent.bind(this)}/>}
                        </span>
                        <span className="col-span-1" href="">
                            {(this.state.imgFour === "https://via.placeholder.com/350x450/000000") ? <img src={this.state.imgFour} alt="" width="50" className="mx-auto border border-black opacity-50"/> : <img src={this.state.imgFour} alt="" width="50" className="mx-auto border border-black cursor-pointer" onClick={this.showEvent.bind(this)}/>}
                        </span>
                    </div>
                </div>
                <div className="col-span-3 row-span-1 border border-gray-600 rounded bg-gray-700 text-gray-300 tracking-wide">
                    <div className="grid grid-cols-3 grid-rows-1 gap-2 px-2 py-3">
                        <div className="col-span-1 text-xl">
                            <p>
                                <span className="font-medium text-yellow-100">Format: </span>
                                {this.state.format} | {this.state.pages} pages
                            </p>
                            <p>
                                <span className="font-medium text-yellow-600">Dimensions: </span>
                                {this.state.dimensions} | {this.state.weight}g
                            </p>
                            <p>
                                <span className="font-medium text-yellow-100">Publication date: </span>
                                {this.state.publicationDate}
                            </p>
                        </div>
                        <div className="col-span-1 text-xl">
                            <p>
                                <span className="font-medium text-yellow-600">Publisher: </span>
                                {this.state.publisher}
                            </p>
                            <p>
                                <span className="font-medium text-yellow-100">Language: </span>
                                {this.state.language}
                            </p>
                            <p>
                                <span className="font-medium text-yellow-600">Illustrations note: </span>
                                6 Illustrations, unspecified
                            </p>
                        </div>
                        <div className="col-span-1 text-xl">
                            <p>
                                <span className="font-medium text-yellow-100">ISBN10: </span>
                                {this.state.ISBN10}
                            </p>
                            <p>
                                <span className="font-medium text-yellow-600">ISBN13: </span>
                                {this.state.ISBN13}
                            </p>
                            <p>
                            <   span className="font-medium text-yellow-100">Publication City/Country: </span>
                                {this.state.publicationPlace}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 row-span-2 border-2 border-gray-300 bg-gray-700">
                    <p className="font-medium bg-gray-300 px-2 text-gray-800 text-2xl">
                        You might also like
                    </p>
                    <br/>
                    <div className="grid grid-cols-3 grid-rows-1 gap-2 text-sm px-2 py-3">

                        {this.state.recs.length ? this.state.recs.map((rec) => (
                            <p className="col-span-1" key={rec.id}>
                                <span>
                                    {rec.MainImage !== null ? 
                                    <img src={`/photos/photoSrc/products/${rec.MainImage}`} alt="" width="100" className="border border-black float-left mr-2" /> : 
                                    <img src="https://via.placeholder.com/100x150" alt="" className="border border-black float-left mr-2" />}
                                </span>
                                <Link to={"/item/" + rec.id} onClick={() => {window.location.href="/item/" + rec.id}}>
                                    <span className="font-medium text-yellow-400 text-lg">{rec.Title}</span>
                                </Link>
                                <br/>
                                <span className="font-medium text-gray-200 text-base">{formatPrice(rec.CurrentPrice)}</span>
                                <br/>
                                <span className="text-yellow-500">{formatStars(rec.Stars)}</span>
                            </p>
                        )) : null}
                    </div>
                </div>
              </div>
          </div>
        </main>
      );
   }
}

export default ProductPage;