import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './SignedCheckoutForms.css';

class SignedCheckoutForms extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            val: null,
            input: null,
            page: 1,
            errorMessage: null,
            fullName: this.props.curUser.LastName === "none" ? null : `${this.props.curUser.FirstName} ${this.props.curUser.LastName}`,
            phoneNum: this.props.curUser.PhoneNumber === "none" ? null : this.props.curUser.PhoneNumber,
            email: this.props.curUser.Email,
            offers: "none",
            firstName: this.props.curUser.FirstName,
            lastName: this.props.curUser.LastName === "none" ? null : this.props.curUser.LastName,
            fullAd: this.props.curUser.Address === "none" ? null : this.props.curUser.Address,
            zipCode: this.props.curUser.ZipCode === "none" ? null : this.props.curUser.ZipCode,
            city: this.props.curUser.City === "none" ? null : this.props.curUser.City,
            country: this.props.curUser.Country === "none" ? null : this.props.curUser.Country,
            notes: "none",
            payment: null,
            cardNum: null,
            security: null,
            expDate: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.changePageForward = this.changePageForward.bind(this)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        this.changePageForward();
    }

    validateContent = (event) => {
        let inputId = event.target.id;
        let validation;
        let res;
        let exp;
        switch(inputId) {
            case "fullName":
                validation = /^[a-zA-Z\s]*$/;  
                exp = event.target.value
                res = validation.test(exp)
                if (!res) {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                Name can only contain letters and spaces!
                            </h1>
                    })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        fullName: event.target.value
                    },() => {
                        this.props.addToOrder("fullName",this.state.fullName)
                    })
                }
                break;
            case "phoneNum":
                validation = /^[0-9]{2,3}-[0-9]{7}$/
                exp = event.target.value
                res = validation.test(exp)
                if (!res) {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                Phone number can only contain 9 or 10 digits in the specified format!
                            </h1>
                    })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        phoneNum: event.target.value
                    },() => {
                        this.props.addToOrder("phoneNum",this.state.phoneNum)
                    })
                }
                break;
            case "email":
                validation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ //eslint-disable-line
                exp = event.target.value
                res = validation.test(exp)
                if (!res) {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                Pleaese enter a valid email address!
                            </h1>
                    })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        email: event.target.value
                    },() => {
                        this.props.addToOrder("email",this.state.email)
                    })
                }
                break;
            case "ads":
                if (this.state.offers === "none") {
                    this.setState({
                        offers: true
                    },() => {
                        this.props.addToOrder("offers",this.state.offers)
                    })
                } else {
                    this.setState({
                        offers: false
                    },() => {
                        this.props.addToOrder("offers",this.state.offers)
                    })
                }
                break;
            case "firstName":
                validation = /^[a-zA-Z\s]*$/;
                exp = event.target.value
                res = validation.test(exp)
                if (!res) {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                Names can only contain letters and spaces!
                            </h1>
                    })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        firstName: event.target.value
                    },() => {
                        this.props.addToOrder("firstName",this.state.firstName)
                    })
                }
                break;
            case "lastName":
                validation = /^[a-zA-Z\s]*$/;
                exp = event.target.value
                res = validation.test(exp)
                if (!res) {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                Names can only contain letters and spaces!
                            </h1>
                    })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        lastName: event.target.value
                    },() => {
                        this.props.addToOrder("lastName",this.state.lastName)
                    })
                }
                break;
            case "fullAddress":
                exp = event.target.value
                if (exp === "") {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                Please enter a valid address!
                            </h1>
                    })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        fullAd: event.target.value
                    },() => {
                        this.props.addToOrder("fullAd",this.state.fullAd)
                    })
                }
                break;
            case "zipCode":
                validation = /^[0-9]{5}$/
                exp = event.target.value
                res = validation.test(exp)
                if (!res) {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                A zip code can only contain 5 digits!
                            </h1>
                        })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        zipCode: event.target.value
                    },() => {
                        this.props.addToOrder("zipCode",this.state.zipCode)
                    })
                }
                break;
            case "city":
                validation = /^[a-zA-Z\s]*$/;
                exp = event.target.value
                res = validation.test(exp)
                if (!res) {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                City names can only contain letters and spaces!
                            </h1>
                    })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        city: event.target.value
                    },() => {
                        this.props.addToOrder("city",this.state.city)
                    })
                }
                break;
            case "country":
                validation = /^[a-zA-Z\s]*$/;
                exp = event.target.value
                res = validation.test(exp)
                if (!res) {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                Country names can only contain letters and spaces!
                            </h1>
                    })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        country: event.target.value
                    },() => {
                        this.props.addToOrder("country",this.state.country)
                    })
                }
                break;
            case "notes":
                exp = event.target.value
                if (exp !== "") {
                    this.setState({
                        notes: exp,
                    },() => {
                        this.props.addToOrder("notes",this.state.notes)
                    })
                } else {
                    this.setState({
                        notes: "none"
                    },() => {
                        this.props.addToOrder("notes",this.state.notes)
                    })
                }
                break;
            case "cash":
                if (this.state.payment !== "cash") {
                    this.setState({
                        payment: "cash"
                    },() => {
                        this.props.addToOrder("payment",this.state.payment)
                    })
                }
                break;
            case "credit":
                if (this.state.payment !== "credit") {
                    this.setState({
                        payment: "credit"
                    },() => {
                        this.props.addToOrder("payment",this.state.payment)
                    })
                }
                break;
            case "paypal":
                if (this.state.payment !== "paypal") {
                    this.setState({
                        payment: "paypal"
                    },() => {
                        this.props.addToOrder("payment",this.state.payment)
                    })
                }
                break;
            case "cardNum":
                validation = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/
                exp = event.target.value
                res = validation.test(exp)
                if (!res) {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                Please enter a valid credit card number in the specified format!
                            </h1>
                    })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        cardNum: event.target.value
                    },() => {
                        this.props.addToOrder("cardNum",this.state.cardNum)
                    })
                }
                break;
            case "security":
                validation = /^[0-9]{3}$/
                exp = event.target.value
                res = validation.test(exp)
                if (!res) {
                    event.target.style.border =  "5px solid red"
                    this.setState({
                        errorMessage: 
                            <h1 className="text-3xl text-red-600 text-center pb-5 pt-5"> 
                                Security code includes 3 digits only!
                            </h1>
                    })
                    setTimeout(() => {
                        event.target.style.border =  "0"; 
                        this.setState({errorMessage:null})
                    }, 10000);
                } else {
                    this.setState({
                        security: event.target.value
                    },() => {
                        this.props.addToOrder("security",this.state.security)
                    })
                }
                break;
            case "expDate":
                exp = event.target.value
                this.setState({
                    expDate: exp,
                },() => {
                    this.props.addToOrder("expDate",this.state.expDate)
                })
                break;
            default: 
                break;
        }
    }

    changePageForward = () => {
        let curPage = this.state.page
        switch (curPage) {
            case 1:
                this.setState({page:2})
                break;
            case 2:
                this.setState({page:3})
                break;
            default:
                this.setState({page:1})
                break;
        }
        
    }

    clearState = (event) => {
        let inputId = event.target.id;
        switch(inputId) {
            case "fullName":
                let fullName = `${this.props.curUser.firstName} ${this.props.curUser.lastName}`
                if(this.state.fullName === fullName) {
                    this.setState({
                        fullName: null,
                    })
                }
                break;
            case "phoneNum":
                if(this.state.phoneNum === this.props.curUser.phoneNum) {
                    this.setState({
                        phoneNum: null,
                    })
                }
                break;
            case "email":
                if(this.state.email === this.props.curUser.email) {
                    this.setState({
                        email: null,
                    })
                }
                break;
            case "firstName":
                if(this.state.firstName === this.props.curUser.firstName) {
                    this.setState({
                        firstName: null,
                    })
                }
                break;
            case "lastName":
                if(this.state.lastName === this.props.curUser.lastName) {
                    this.setState({
                        lastName: null,
                    })
                }
                break;
            case "fullAddress":
                if(this.state.fullAd === this.props.curUser.address) {
                    this.setState({
                        fullAd: null,
                    })
                }
                break;
            case "city":
                if(this.state.city === this.props.curUser.city) {
                    this.setState({
                        city: null,
                    })
                }
                break;
            case "country":
                if(this.state.country === this.props.curUser.country) {
                    this.setState({
                        country: null,
                    })
                }
                break;
            case "zipCode":
                if(this.state.country === this.props.curUser.zipCode) {
                    this.setState({
                        country: null,
                    })
                }
                break;
            default: 
                break;
        }
    }

  render () {
    let payment;
    let year = new Date().getFullYear()
    let month = (new Date().getMonth()) + 1
    if (month < 10) {
        month = `0${month}`
    }
    let thisDate = `${year}-${month}`
    if (this.state.payment === "credit") {
        payment = (
            <div className="mb-2">
                <div className="mb-2">
                    <label htmlFor="cardNum">Credit Card Number: </label>
                    <input 
                        type="text" 
                        id="cardNum" 
                        placeholder="XXXXX-XXXX-XXXX-XXXX" 
                        onBlur={(event) => {this.validateContent(event)}}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="security">Security Code: </label>
                    <input 
                        type="text" 
                        id="security" 
                        className="w-16" 
                        onBlur={(event) => {this.validateContent(event)}}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <label htmlFor="expDate">Expiration Date: </label>
                    <input 
                        type="month" 
                        id="expDate" 
                        className="w-36 text-lg" 
                        onBlur={(event) => {this.validateContent(event)}} 
                        min={thisDate} 
                        defaultValue={thisDate}
                    />
                </div>
            </div>
        )
    }

    let basicsBtn;
    if (this.state.fullName !== null && this.state.fullName !== "" && this.state.phoneNum !== null && this.state.phoneNum !== "" && this.state.email !== null && this.state.email !== "") {
        basicsBtn = 
            <input 
                type="submit" 
                value="PROCEED" 
                className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 hover:bg-yellow-100 hover:text-yellow-800 border border-yellow-800"
            />
    } else {
        basicsBtn = 
            <input 
                type="submit" 
                value="PROCEED" 
                className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 border border-yellow-800 opacity-50" 
                disabled
            />
    }

    let addressBtn;
    if (this.state.firstName !== null && this.state.firstName !== "" && this.state.lastName !== null && this.state.lastName !== "" && this.state.fullAd !== null && this.state.fullAd !== "" && this.state.zipCode !== null && this.state.city !== null && this.state.city !== "" && this.state.country !== null && this.state.country !== "") {
        addressBtn = 
            <input 
                type="submit" 
                value="PROCEED" 
                className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 hover:bg-yellow-100 hover:text-yellow-800 border border-yellow-800"
            />
    } else {
        addressBtn = 
            <input 
                type="submit" 
                value="PROCEED" 
                className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 border border-yellow-800 opacity-50" 
                disabled
            />
    }

    let finalBtn;
    if (this.state.payment !== null && this.props.delivery !== null) {
        if (this.state.payment === "credit") {
            if (this.state.cardNum !== null && this.state.expDate !== null && this.state.security !== null) {
                finalBtn = 
                    <Link to="/finalstage">
                        <input 
                            type="submit" 
                            value="ORDER" 
                            className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 hover:bg-yellow-100 hover:text-yellow-800 border border-yellow-800"
                        />
                    </Link>
            } else {
                finalBtn = 
                    <input 
                        type="submit" 
                        value="ORDER" 
                        className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 border border-yellow-800 opacity-50" 
                        disabled
                    />
            }
        } else {
            finalBtn = 
                <Link to="/finalstage">
                    <input 
                        type="submit" 
                        value="ORDER" 
                        className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 hover:bg-yellow-100 hover:text-yellow-800 border border-yellow-800"
                    />
                </Link>
        }
    } else {
        finalBtn = 
            <input 
                type="submit" 
                value="ORDER" 
                className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 border border-yellow-800 opacity-50" 
                disabled
            />
    }

    let page;
    switch(this.state.page) {
        default:
            page = (
                <div className="basics bg-gray-300 rounded mx-48 my-48 text-3xl border-solid border-8 border-gray-400">
                    <h1 className="text-5xl text-yellow-600 py-4 font-bold">Payer Details</h1>
                    {this.state.errorMessage}
                    <form onSubmit={this.handleSubmit} className="mb-6">
                        <div className="mb-2">
                            <label htmlFor="fullName">Full Name: </label>
                            <input 
                                type="text" 
                                id="fullName" 
                                placeholder={this.state.fullName}
                                onClick={(event) => {this.clearState(event)}}
                                onBlur={(event) => {this.validateContent(event)}}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phoneNum">Phone Number: </label>
                            <input 
                                type="tel" 
                                id="phoneNum" 
                                placeholder={this.state.phoneNum} 
                                pattern="[0-9]{2,3}-[0-9]{7}" 
                                className="pl-2" 
                                onClick={(event) => {this.clearState(event)}}
                                onBlur={(event) => {this.validateContent(event)}}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email">Email: </label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder={this.state.email}
                                onBlur={(event) => {this.validateContent(event)}}
                            />
                        </div>
                        <div className="mb-2">
                            <input 
                                type="checkbox" 
                                id="ads" 
                                value="ads" 
                                onChange={(event) => {this.validateContent(event)}}
                            />
                            <label htmlFor="ads">I would like to recieve news and special offers in my email</label>
                        </div>
                        {basicsBtn}
                    </form>
                </div>
            )
            break;
        case 2:
            page = (
                <div className="deliveryDetails bg-gray-300 rounded mx-48 my-48 text-3xl border-solid border-8 border-gray-400">
                    <h1 className="text-5xl text-yellow-600 py-4 font-bold">Delivery Details</h1>
                    {this.state.errorMessage}
                    <form onSubmit={this.handleSubmit} className="mb-6">
                        <div className="mb-2">
                            <label htmlFor="firstName">First Name: </label>
                            <input 
                                type="text" 
                                id="firstName" 
                                className="w-44" 
                                placeholder={this.state.firstName}
                                onClick={(event) => {this.clearState(event)}}
                                onBlur={(event) => {this.validateContent(event)}}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="lastName">Last Name: </label>
                            <input 
                                type="text" 
                                id="lastName" 
                                className="w-44" 
                                placeholder={this.state.lastName}
                                onClick={(event) => {this.clearState(event)}}
                                onBlur={(event) => {this.validateContent(event)}}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="fullAddress">Full Address: </label>
                            <input 
                                type="text" 
                                id="fullAddress" 
                                className="w-96" 
                                placeholder={this.state.fullAd}
                                onClick={(event) => {this.clearState(event)}}
                                onBlur={(event) => {this.validateContent(event)}}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="zipCode">Zip Code: </label>
                            <input 
                                type="text" 
                                id="zipCode" 
                                className="w-32" 
                                placeholder={this.state.zipCode}
                                onClick={(event) => {this.clearState(event)}}
                                onBlur={(event) => {this.validateContent(event)}}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="city">City: </label>
                            <input 
                                type="text" 
                                id="city" 
                                className="w-32" 
                                placeholder={this.state.city}
                                onClick={(event) => {this.clearState(event)}}
                                onBlur={(event) => {this.validateContent(event)}}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="country">Country: </label>
                            <input 
                                type="text" 
                                id="country" 
                                className="w-32" 
                                placeholder={this.state.country}
                                onClick={(event) => {this.clearState(event)}}
                                onBlur={(event) => {this.validateContent(event)}}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="notes">Notes: </label>
                            <input 
                                type="textarea" 
                                id="notes" 
                                className="h-16" 
                                onBlur={(event) => {this.validateContent(event)}}
                            />
                        </div>
                        {addressBtn}
                    </form>
                </div>
            )
            break;
        case 3:
            page = (
                <div className="paymentDetails bg-gray-300 rounded mx-48 my-48 text-3xl border-solid border-8 border-gray-400">
                    <h1 className="text-5xl text-yellow-600 py-4 font-bold">Payment</h1>
                    {this.state.errorMessage}
                    <form onSubmit={this.handleSubmit} className="mb-6">
                        <div className="mb-2">
                            <h1>Choose a payment method: </h1>
                            <input 
                                type="radio" 
                                id="cash" 
                                name="payment" 
                                value="cash" 
                                required 
                                onChange={(event) => {this.validateContent(event)}}
                            />
                            <label htmlFor="cash">Cash</label>
                            <br />
                            <input 
                                type="radio" 
                                id="credit" 
                                name="payment" 
                                value="credit" 
                                required 
                                onChange={(event) => {this.validateContent(event)}}
                            />
                            <label htmlFor="credit">Credit Card</label>
                            <br/>
                            <input 
                                type="radio" 
                                id="paypal" 
                                name="payment" 
                                value="paypal" 
                                required 
                                onChange={(event) => {this.validateContent(event)}}
                            />
                            <label htmlFor="paypal">PayPal</label>
                        </div>
                        {payment}
                        {finalBtn}
                    </form>
                </div>
            )
            break;
    }

    return (
      <div className="FirstForm">
        {page}
      </div>
    )
  }
}

export default SignedCheckoutForms;