import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import ProductPage from './Components/ProductPage/ProductPage';
import Footer from './Components/Footer/Footer';
import StoreFront from './Components/storeFront/storeFront';
import Homepage from './Components/Homepage/Homepage';
import AboutUs from './Components/AboutUs/AboutUs';
import Blog from './Components/Blog/Blog';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import ContactUs from './Components/ContactUs/ContactUs';
import ShoppingCart from './Components/shoppingCart/ShoppingCart';
import Checkout from './Components/Checkout/Checkout'
import { Switch, Route } from 'react-router-dom';
import FinalForm from './Components/FinalForm/FinalForm';
import Confirmation from './Components/Confirmation/Confirmation';
import BlogPost from './Components/BlogPost/BlogPost';
import {ProtectedRoute} from './protectedRoute';
import {ProtectedCCheckoutRoute} from './protectedCheckoutRoute'
import LoginPage from './Components/LoginPage/LoginPage';
import AccountProfile from './Components/AccountProfile/AccountProfile';
import AdminMain from './Components/Dashboard/AdminMain';
import AddProduct from './Components/AddProduct/AddProduct';
import Currauth from './auth';
import TrackOrder from './Components/TrackOrder/TrackOrder';
import SignedCheckout from './Components/SignedCheckout/SignedCheckout';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: JSON.parse(localStorage.getItem('shoppingCart')),
      productNum: (localStorage.getItem('shoppingLength')) ? localStorage.getItem('shoppingLength') : 0,
      fullName: null,
      phoneNum: null,
      email: null,
      offers: false,
      firstName: null,
      lastName: null,
      fullAd: null,
      zipCode: null,
      city: null,
      country: null,
      notes: "none",
      payment: null,
      cardNum: null,
      security: null,
      expDate: null,
      delivery: null,
      isSignedIn: false,
      displayName: "user",
      orderNum: null,
      finalItems:[],
    }
  }

  addToOrder = (valName,val) => {
    switch(valName) {
      case "delivery":
        this.setState({
          delivery: val,
        })
        break;
      case "fullName":
        this.setState({
          fullName: val,
        })
        break;
      case "phoneNum":
        this.setState({
          phoneNum: val,
        })
        break;
      case "email":
        this.setState({
          email: val,
        })
        break;
      case "offers":
        this.setState({
          offers: val,
        })
        break;
      case "firstName":
        this.setState({
          firstName: val,
        })
        break;
      case "lastName":
        this.setState({
          lastName: val,
        })
        break;
      case "fullAd":
        this.setState({
          fullAd: val,
        })
        break;
      case "zipCode":
        this.setState({
          zipCode: val,
        })
        break;
      case "city":
        this.setState({
          city: val,
        })
        break;
      case "country":
        this.setState({
          country: val,
        })
        break;
      case "notes":
        this.setState({
          notes: val,
        })
        break;
      case "payment":
        this.setState({
          payment: val,
        })
        break;
      case "cardNum":
        this.setState({
          cardNum: val,
        })
        break;
      case "security":
        this.setState({
          security: val,
        })
        break;
      case "expDate":
        this.setState({
          expDate: val,
        })
        break;
      default:
        break;
    }
  }

  addToCart = (changeStates) => {
    this.setState({
      productNum: localStorage.getItem('shoppingLength'),
      productList: JSON.parse(localStorage.getItem('shoppingCart'))
    },() => {this.addSum()})
  }

  addSum = async() => {
    let sumPrice = 0;
    if (this.state.productList.length) {
      let products = [...this.state.productList];

      const response = await fetch(`/products`, {
        method: 'GET'
      });
      let myres = await response.json()

      myres.forEach((product) => {
        if(products.includes(product.ISBN10)) {
          sumPrice += Number(product.CurrentPrice);
          localStorage.setItem('finalPrice',sumPrice);
        }
      })

    }
  }

  isUserSignedIn = (bool) => {
    if(bool === true) {
      Currauth.login(() => {
        this.setState({
          isSignedIn: true,
        })
      })
    } else {
      Currauth.logout(() => {
        this.setState({
          isSignedIn: false,
        })
      })
    }
  }

  curUserName = (name) => {
    this.setState({
      displayName: name,
    })
  }

  orderNum = (someHash) =>{
    this.setState({
      orderNum: someHash,
    })
  }

  setItems = (arr) => {
    this.setState({
      finalItems: arr
    })
  }

  render () {
    return (
      <div className="bg-gray-800 globalFont">
        <Header cartNum={this.state.productNum} isSignedIn={this.state.isSignedIn} isUserSignedIn={this.isUserSignedIn} curUser={this.state.displayName}/>
          <Switch>
            <Route path="/" exact render={(matchProps) => (<Homepage {...matchProps} {...this.props} addSum={this.addSum} />)} />
            <ProtectedRoute 
              exact 
              path="/signindone" 
              component={LoginPage}
              isUserSignedIn={this.isUserSignedIn}
              curUserName={this.curUserName}/>
            <ProtectedCCheckoutRoute
              exact 
              path="/signedInCheckout" 
              component={SignedCheckout}
              isUserSignedIn={this.isUserSignedIn}
              addToOrder={this.addToOrder}/>
            <Route path="/catalogue/" render={(matchProps) => (<StoreFront {...matchProps} {...this.props} addToCart={this.addToCart} />)} />
            <Route path="/catalogue/new" render={(matchProps) => (<StoreFront {...matchProps} {...this.props} addToCart={this.addToCart} />)} />
            <Route path="/catalogue/specials" render={(matchProps) => (<StoreFront {...matchProps} {...this.props} addToCart={this.addToCart} />)} />
            <Route path="/catalogue/top" render={(matchProps) => (<StoreFront {...matchProps} {...this.props} addToCart={this.addToCart} />)} />
            <Route path="/catalogue/:search" render={(matchProps) => (<StoreFront {...matchProps} {...this.props} addToCart={this.addToCart} />)} />
            <Route path="/item/:itemISBN" render={(matchProps) => (<ProductPage {...matchProps} {...this.props} addToCart={this.addToCart} />)} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/admin-dashboard" component={AdminMain} />
            <Route path="/blogpost/:postName" component={BlogPost} />
            <Route path="/addproduct" render={(matchProps) => (<AddProduct {...matchProps} {...this.props}/>)} />
            <Route path="/shoppingCart" 
              render={(matchProps) => (<ShoppingCart {...matchProps} {...this.props} 
              cartContent={this.state.productList} 
              addToCart={this.addToCart}
              setItems={this.setItems} 
              />)}
            />
            <Route path="/blog" component={Blog} />
            <ProtectedRoute exact path="/account/profile" component={AccountProfile} isUserSignedIn={this.isUserSignedIn} curUserName={this.curUserName}/>
            <Route path="/login" 
              render={(matchProps) => (<Login {...matchProps} {...this.props} 
                isUserSignedIn={this.isUserSignedIn} 
                curUserName={this.curUserName} 
                />)}
            />
            <Route path="/sign-up" component={SignUp} isUserSignedIn={this.isUserSignedIn}/>
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/track-order" component={TrackOrder} />
            <Route path="/confirmation" render={(matchProps) => (<Confirmation {...matchProps} {...this.props} addToCart={this.addToCart} orderNum={this.state.orderNum} email={this.state.email} />)} />
            <Route path="/checkout" render={(matchProps) => (<Checkout {...matchProps} {...this.props} addToOrder={this.addToOrder} />)} />
            <Route path="/finalstage" 
              render={(matchProps) => (<FinalForm {...matchProps} {...this.props}
                fullName={this.state.fullName} 
                phoneNum={this.state.phoneNum}
                email={this.state.email}
                offers={this.state.offers}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                fullAd={this.state.fullAd}
                zipCode={this.state.zipCode}
                city={this.state.city}
                notes={this.state.notes}
                payment={this.state.payment}
                cardNum={this.state.cardNum}
                security={this.state.security}
                expDate={this.state.expDate}
                delivery={this.state.delivery}
                country={this.state.country}
                items={this.state.finalItems}
                orderNum = {this.orderNum}
              />)} 
            />
          </Switch>
        <Footer />
      </div>
    )
  }
}

export default App;
