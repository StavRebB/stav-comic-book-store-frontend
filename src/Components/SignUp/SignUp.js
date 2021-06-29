import React, { Component } from 'react';
import './SignUp.css';
import { Redirect } from 'react-router-dom';
import {auth} from '../../firebase';
import firebase from 'firebase/app';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tryPassword: null,
            trySamePassword: null,
            email: null,
            password: null,
            firstName: null,
            lastName: null,
            phoneNum: "XXX-XXXXXXX",
            DOB: "DD/MM/YY",
            country: "none",
            city: "none",
            address: "none",
            gender: "none",
            zipCode: "none",
            signUp: false,
            errorMessage: null,
            body: null,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.authfunc();
    }

    authfunc = async () => {

        await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async() => {

            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/members/add`, {
                method: 'POST',
                headers: {
                    "Accept": "multipart/form-data",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    FirstName: this.state.firstName,
                    LastName: this.state.lastName,
                    Email: this.state.email,
                    Active: true,
                    Role: "606b3a27b75b923d58cee841",
                    DateOfBirth: this.state.DOB,
                    Gender: this.state.gender,
                    PhoneNumber: this.state.phoneNum,
                    ZipCode: this.state.zipCod,
                    Address: this.state.address,
                    City: this.state.city,
                    Country: this.state.country,
                }),
            });
    
            const body = await response.text();
            this.setState({
                body: body,
                signUp: true,
            }, () => {
                localStorage.setItem('signupSuccess',"yes")
            })

        })
        .then(() => {
            this.signingIn()
        })
        .catch((error) => {
            this.setState({
                errorMessage: <h3 className="text-3xl text-red-600 text-center pb-5"><i className="far fa-times-circle"></i> {error.message}</h3>
            })
        })
    }

    signingIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
            let user = userCredential.user

            user.updateProfile({
                displayName: this.state.firstName
            })
        })
        .catch((error) => {console.log(error)})
    }

    checkvalidty = (event) => {
        if (event.target.id === "email") {
            this.setState({
                email: event.target.value
            })
        } else if (event.target.id === "password") {
            this.setState({
                tryPassword: event.target.value
            }, () => {this.checkSame()})
        } else if (event.target.id === "samepassword") {
            this.setState({
                trySamePassword: event.target.value
            }, () => {this.checkSame()})
        } else if (event.target.id === "firstName") {
            if (event.target.value.replace(/\s/g, '').length) {
                this.setState({
                    firstName: event.target.value,
                    errorMessage: null,
                })
            } else {
                this.setState({
                    errorMessage:                 
                        <h1 className="text-3xl text-red-600 text-center pb-5">
                            <i className="far fa-times-circle"></i> 
                            First name needs to have letters!
                        </h1>
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            errorMessage: null
                        })
                    }, 5000);
                })
            }
        } else if (event.target.id === "lastName") {
            if (event.target.value.replace(/\s/g, '').length) {
                this.setState({
                    lastName: event.target.value,
                    errorMessage: null,
                })
            } else {
                this.setState({
                    errorMessage:                 
                        <h1 className="text-3xl text-red-600 text-center pb-5">
                            <i className="far fa-times-circle"></i> 
                            Last name needs to have letters!
                        </h1>
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            errorMessage: null
                        })
                    }, 5000);
                })
            }
        } else if(event.target.id === "city") {
            if(!event.target.value.replace(/\s/g, '').length) {
                this.setState({
                    city: "none"
                })
            } else {
                this.setState({
                    city: event.target.value
                })
            }
        } else if(event.target.id === "country") {
            if(!event.target.value.replace(/\s/g, '').length) {
                this.setState({
                    country: "none"
                })
            } else {
                this.setState({
                    country: event.target.value
                })
            }
        } else if(event.target.id === "address") {
            if(!event.target.value.replace(/\s/g, '').length) {
                this.setState({
                    address: "none"
                })
            } else {
                this.setState({
                    address: event.target.value
                })
            }
        } else if (event.target.id === "phoneNumber") {
            if(!event.target.value.replace(/\s/g, '').length) {
                this.setState({
                    phoneNum: "XXX-XXXXXXX",
                })
            } else {
                this.setState({
                    phoneNum: event.target.value
                })
            }
        } else if (event.target.id === "zipcode") {
            if(!event.target.value.replace(/\s/g, '').length) {
                this.setState({
                    zipCode: "none",
                })
            } else {
                this.setState({
                    zipCode: event.target.value
                })
            }
        } else if (event.target.id === "gender") {
            this.setState({
                gender: event.target.value
            })
        }else if (event.target.id === "birthDate") {
            this.setState({
                DOB: event.target.value
            })
        }
    }

    checkSame = () => {
        if (this.state.tryPassword === this.state.trySamePassword) {
            this.setState({
                password: this.state.tryPassword
            })
        } else {
            this.setState({
                password: null,
            })
        }
    }



    render () {

        let submitBtn;
        if (this.state.email && this.state.password && this.state.firstName && this.state.lastName) {
            submitBtn = <input 
                            type="submit" 
                            value="Sign Up" 
                            className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 hover:bg-yellow-100 hover:text-yellow-800 border border-yellow-800 mb-3 mt-3"
                        />
        } else {
            submitBtn = <input 
                            type="submit" 
                            value="Sign Up" 
                            className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 border border-yellow-800 mb-3 mt-3 opacity-50 cursor-not-allowed"
                            disabled
                        />
        }

        if (this.state.signUp === false) {
            return(    
                <main className="signupForm pt-2s pb-4">
                    {this.state.errorMessage}
                    <div className="bg-gray-300 mx-auto w-1/3 text-3xl shadow shadow-md border-4 rounded border-solid border-8 border-gray-400 pl-4">
                        <h1 className="text-6xl text-yellow-600 py-4 font-medium">Enter Your Details</h1>
                        <form onSubmit={(event) => {this.handleSubmit(event)}}>
                            <div className="grid gap-y-4 grid-cols-2 grid-rows-5 pb-2">
                                <p  className="pb-4">
                                    <label htmlFor="firstName">First Name*:&nbsp;&nbsp;&nbsp;</label>
                                    <br/>
                                    <input type="text" id="firstName" name="firstName" onBlur={(event) => {this.checkvalidty(event)}} />
                                </p>
                                <p  className="pb-4">
                                    <label htmlFor="lastName">Last Name*:&nbsp;&nbsp;&nbsp;</label>
                                    <br/>
                                    <input type="text" id="lastName" name="lastName" onBlur={(event) => {this.checkvalidty(event)}} />
                                </p>
                                <p  className="pb-4">
                                    <label htmlFor="gender">Gender:&nbsp;&nbsp;&nbsp;</label>
                                    <br/>
                                    <select name="gender" id="gender" className="col-span-1 row-span-1 w-10/12" onChange={(event) => {this.checkvalidty(event)}}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </p>
                                <p  className="pb-4">
                                    <label htmlFor="birthDate">Date of Birth:&nbsp;&nbsp;&nbsp;</label>
                                    <br/>
                                    <input type="date" id="birthDate" name="birthDate" onBlur={(event) => {this.checkvalidty(event)}} className="w-72 pr-2"/>
                                </p>
                                <p  className="pb-4">
                                    <label htmlFor="phoneNumber">Phone Number:&nbsp;&nbsp;&nbsp;</label>
                                    <br/>
                                    <input type="text" id="phoneNumber" name="phoneNumber" onBlur={(event) => {this.checkvalidty(event)}} className="col-span-1 row-span-1"/>
                                </p>
                                <p  className="pb-4">
                                    <label htmlFor="country">Country:&nbsp;&nbsp;&nbsp;</label>
                                    <br/>
                                    <input type="text" id="country" name="country" onBlur={(event) => {this.checkvalidty(event)}} />
                                </p>
                                <p  className="pb-4">
                                    <label htmlFor="city">City:&nbsp;&nbsp;&nbsp;</label>
                                    <br/>
                                    <input type="text" id="city" name="city" onBlur={(event) => {this.checkvalidty(event)}} />
                                </p>
                                <p  className="pb-4">
                                    <label htmlFor="zipcode">Zip Code:&nbsp;&nbsp;&nbsp;</label>
                                    <br/>
                                    <input type="text" id="zipcode" name="zipcode" onBlur={(event) => {this.checkvalidty(event)}} className="col-span-1 row-span-1"/>
                                </p>
                                <p  className="pb-4">
                                    <label htmlFor="address">Address:&nbsp;&nbsp;&nbsp;</label>
                                    <br/>
                                    <input type="text" id="address" name="address" onBlur={(event) => {this.checkvalidty(event)}} className="addressInput col-span-2 row-span-1" />
                                </p>
                            </div>
                            <hr className="mb-4 border-yellow-800 mr-4"/>
                            <p  className="pb-4">
                                <label htmlFor="email">Email*:&nbsp;&nbsp;&nbsp;</label>
                                <input type="email" id="email" name="email" onChange={(event) => {this.checkvalidty(event)}} />
                            </p>
                            <p className="pb-4">
                                <label htmlFor="password">Password*:&nbsp;&nbsp;&nbsp;</label>
                                <input type="password" id="password" name="password" onChange={(event) => {this.checkvalidty(event)}} />
                            </p>
                            <p className="pb-4">
                                <label htmlFor="samepassword">Repeat Password*:&nbsp;&nbsp;&nbsp;</label>
                                <input type="password" id="samepassword" name="samepassword" onChange={(event) => {this.checkvalidty(event)}} />
                            </p>
                            {submitBtn}
                        </form>
                    </div>
                </main>
            )
        } else {
            return (
                <Redirect to={
                    {
                        pathname: "/login",
                        state: {
                            from: this.props.location
                        }
                    }
                }/>
            )
        }

    }
}

export default SignUp;