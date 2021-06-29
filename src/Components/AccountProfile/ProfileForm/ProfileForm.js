import React, { Component } from 'react';
import './ProfileForm.css';
import firebase from 'firebase/app'

class ProfileForm extends Component {
    constructor() {
        super();
        this.state = {
            userId: null,
            firstName: null,
            newFN: null,
            lastName: null,
            newLN: null,
            email: null,
            newEmail: null,
            phoneNumber: null,
            newPN: null,
            country: null,
            newCountry: null,
            city: null,
            newCity:null,
            address: null,
            newAddress: null,
            DOB: null,
            newDOB: null,
            zipCode: null,
            newZipCode:null,
            errorMessage: null,
            successMessage:null,
            body:null,
        }
    }

    componentDidMount = () => {
        this.getDetails()
    }

    getDetails = async() => {

        let currEmail = localStorage.getItem('currentUser')

        const response = await fetch(`${process.env.SERVER_DOMAIN}/members/email/${currEmail}`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            userId: myres.id,
            firstName: myres.FirstName,
            lastName: myres.LastName,
            email: myres.Email,
            phoneNumber: myres.PhoneNumber,
            country: myres.Country,
            city: myres.City,
            address: myres.Address,
            zipCode: myres.ZipCode,
            DOB: myres.DateOfBirth ? myres.DateOfBirth.split('T')[0] : null
        })
    }

    handleForm = (event) => {
        event.preventDefault();
        this.updateMyProfile();
    }

    checkObj = (obj) => {
        for(let key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    updateMyProfile = async() => {

        let newObj = {}
        let newDeets = {}

        if (this.state.newFN && this.state.newFN !== "none" && this.state.newFN !== this.state.firstName) {
            newObj.firstName = this.state.newFN
            newDeets.FirstName = this.state.newFN

            let user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: this.state.newFN
            })
            .then(() => {
                this.props.curUserName(this.state.newFN)
                localStorage.setItem('userName',this.state.newFN)
            })
        } else if(this.state.newFN === "none") {
            this.setState({
                errorMessage:
                    <h1 className="text-3xl text-red-600 text-center pb-5">
                        <i className="far fa-times-circle"></i> 
                        First name must contain more than 1 character
                    </h1>
            },() => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: null
                    })
                }, 5000);
            })
        }

        if (this.state.newLN && this.state.newLN !== "none" && this.state.newLN !== this.state.lastName) {
            newObj.lastName = this.state.newLN
            newDeets.LastName = this.state.newLN
        } else if(this.state.newLN === "none") {
            this.setState({
                errorMessage:
                    <h1 className="text-3xl text-red-600 text-center pb-5">
                        <i className="far fa-times-circle"></i> 
                        Last name must contain more than 1 character
                    </h1>
            },() => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: null
                    })
                }, 5000);
            })
        }

        if (this.state.newEmail && this.state.newEmail !== "none" && this.state.newEmail !== this.state.email) {
            newObj.email = this.state.newEmail
            newDeets.Email = this.state.newEmail

            let user = firebase.auth().currentUser;

            user.updateEmail(this.state.newEmail)
            .then(() => {
                localStorage.setItem('currentUser', this.state.newEmail)
            })
            .catch((error) => {
                newObj.email = this.state.email
                this.setState({
                    errorMessage: <h3 className="text-3xl text-red-600 text-center pb-5"><i className="far fa-times-circle"></i> {error.message}</h3>
                })
            })
        } else if(this.state.newEmail === "none") {
            this.setState({
                errorMessage:
                    <h1 className="text-3xl text-red-600 text-center pb-5">
                        <i className="far fa-times-circle"></i> 
                        Invalid email address
                    </h1>
            },() => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: null
                    })
                }, 5000);
            })
        }

        if (this.state.newPN && this.state.newPN !== "none" && this.state.newPN !== this.state.phoneNumber) {
            newObj.phoneNum = this.state.newPN
            newDeets.PhoneNumber = this.state.newPN
        } else if(this.state.newPN === "none") {
            this.setState({
                errorMessage:
                    <h1 className="text-3xl text-red-600 text-center pb-5">
                        <i className="far fa-times-circle"></i> 
                        Phone Nummbers need to be written in the following format: XX(X)-XXXXXXX
                    </h1>
            },() => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: null
                    })
                }, 5000);
            })
        }

        if (this.state.newCountry && this.state.newCountry !== "none" && this.state.newCountry !== this.state.country) {
            newObj.country = this.state.newCountry
            newDeets.Country = this.state.newCountry
        } else if(this.state.newCountry === "none") {
            this.setState({
                errorMessage:
                    <h1 className="text-3xl text-red-600 text-center pb-5">
                        <i className="far fa-times-circle"></i> 
                        Country names must contain more than 1 character
                    </h1>
            },() => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: null
                    })
                }, 5000);
            })
        }

        if (this.state.newCity && this.state.newCity !== "none" && this.state.newCity !== this.state.city) {
            newObj.city = this.state.newCity
            newDeets.City = this.state.newCity
        } else if(this.state.newCity === "none") {
            this.setState({
                errorMessage:
                    <h1 className="text-3xl text-red-600 text-center pb-5">
                        <i className="far fa-times-circle"></i> 
                        City names must contain more than 1 character
                    </h1>
            },() => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: null
                    })
                }, 5000);
            })
        }

        if (this.state.newAddress && this.state.newAddress !== "none" && this.state.newAddress !== this.state.address) {
            newObj.address = this.state.newAddress
            newDeets.Address = this.state.newAddress
        } else if(this.state.newAddress === "none") {
            this.setState({
                errorMessage:
                    <h1 className="text-3xl text-red-600 text-center pb-5">
                        <i className="far fa-times-circle"></i> 
                        City names must contain more than 3 characters
                    </h1>
            },() => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: null
                    })
                }, 5000);
            })
        }

        if (this.state.newZipCode && this.state.newZipCode !== "none" && this.state.newZipCode !== this.state.zipCode) {
            newObj.zipCode = this.state.newZipCode
            newDeets.ZipCode = this.state.newZipCode
        } else if(this.state.newZipCode === "none") {
            this.setState({
                errorMessage:
                    <h1 className="text-3xl text-red-600 text-center pb-5">
                        <i className="far fa-times-circle"></i> 
                        Zip codes must be exactly 5 digits long
                    </h1>
            },() => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: null
                    })
                }, 5000);
            })
        }

        if (this.state.newDOB && this.state.newDOB !== this.state.DOB) {
            newObj.dateOfBirth = this.state.newDOB
            newDeets.DateOfBirth = this.state.DateOfBirth
        }

        if(Object.keys(newObj).length) {

            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/members/${this.state.userId}`, {
                method: 'PATCH',
                headers: {
                    "Accept": "multipart/form-data",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDeets),
            });
    
            const body = await response.text();

            this.setState({
                body: body,
                successMessage:
                    <h1 className="text-3xl text-green-600 text-center pb-5"> 
                        <i class="far fa-check-circle"></i>
                        Personal profile updates
                    </h1>
            },() => {
                setTimeout(() => {
                    this.setState({
                        successMessage: null
                    })
                }, 5000);
            })

        }

        this.props.updateState()

    }

    changeState = (event) => {
        let inputId = event.target.id
        let validation;
        let exp;
        switch(inputId) {
            case "firstName":
                if(event.target.value.replace(/\s/g, '').length > 1) {
                    this.setState({
                        newFN: event.target.value
                    })
                } else {
                    this.setState({
                        newFN: "none",
                    })
                }
                break;
            case "lastName":
                if(event.target.value.replace(/\s/g, '').length > 1 ) {
                    this.setState({
                        newLN: event.target.value
                    })
                } else {
                    this.setState({
                        newLNN: "none",
                    })
                }
                break;
            case "email":
                validation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ //eslint-disable-line
                exp = event.target.value
                if(validation.test(exp)) {
                    this.setState({
                        newEmail: event.target.value
                    })
                } else {
                    this.setState({
                        newEmail: "none",
                    })
                }
                break;
            case "phoneNum":
                validation = /^[0-9]{2,3}-[0-9]{7}$/ //eslint-disable-line
                exp = event.target.value
                if(validation.test(exp)) {
                    this.setState({
                        newPN: event.target.value
                    })
                } else {
                    this.setState({
                        newPN: "none",
                    })
                }
                break;
            case "country":
                if(event.target.value.replace(/\s/g, '').length > 1 ) {
                    this.setState({
                        newCountry: event.target.value
                    })
                } else {
                    this.setState({
                        newCountry: "none",
                    })
                }
                break;
            case "city":
                if(event.target.value.replace(/\s/g, '').length > 1 ) {
                    this.setState({
                        newCity: event.target.value
                    })
                } else {
                    this.setState({
                        newCity: "none",
                    })
                }
                break;
            case "address":
                if(event.target.value.replace(/\s/g, '').length > 3 ) {
                    this.setState({
                        newAddress: event.target.value
                    })
                } else {
                    this.setState({
                        newAddress: "none",
                    })
                }
                break;
            case "zipCode":
                if(Number(event.target.value) > 9999 && Number(event.target.value) < 100000) {
                    this.setState({
                        newZipCode: event.target.value
                    })
                } else {
                    this.setState({
                        newZipCode: "none",
                    })
                }
                break;
            case "dob":
                this.setState({
                    newDOB: event.target.value
                })
                break;
            default:
                break;
        }
    }


    render () {

        return(    
            <main className="ProfileForm">
                <div className="detailsForm bg-yellow-100 w-10/12 rounded-lg px-4 py-4">
                    <h1 className="text-4xl">Personal Details</h1>
                    <h3 className="text-2xl">You can change your personal details</h3>
                    <hr className="border-yellow-800 my-4"/>
                    <form className="text-2xl" onSubmit={(event) => {this.handleForm(event)}}>
                        <div className="grid gap-y-6 grid-cols-2 grid-rows-5 pb-2">
                            <div>
                                <label htmlFor="firstName">First Name:</label>
                                <br/>
                                <input type="text" className="w-10/12 h-10 border border-gray-400 px-2 py-1" id="firstName" defaultValue={this.state.firstName} onChange={(event) => {this.changeState(event)}}/>
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name:</label>
                                <br/>
                                <input type="text" className="w-10/12 h-10 border border-gray-400 px-2 py-1" id="lastName" defaultValue={this.state.lastName} onChange={(event) => {this.changeState(event)}}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <br/>
                                <input type="email" className="w-10/12 h-10 border border-gray-400 px-2 py-1" id="email" defaultValue={this.state.email} onChange={(event) => {this.changeState(event)}}/>
                            </div>
                            <div>
                                <label htmlFor="phoneNum">Phone Number:</label>
                                <br/>
                                <input type="text" className="w-10/12 h-10 border border-gray-400 px-2 py-1" id="phoneNum" defaultValue={this.state.phoneNumber} onChange={(event) => {this.changeState(event)}}/>
                            </div>
                            <div>
                                <label htmlFor="dob">Date of Birth:</label>
                                <br/>
                                <input type="date" className="w-10/12 h-10 border border-gray-400 px-2 py-1" id="dob" defaultValue={this.state.DOB} onChange={(event) => {this.changeState(event)}}/>
                            </div>
                            <div>
                                <label htmlFor="country">Country:</label>
                                <br/>
                                <input type="text" className="w-10/12 h-10 border border-gray-400 px-2 py-1" id="country" defaultValue={this.state.country} onChange={(event) => {this.changeState(event)}}/>
                            </div>
                            <div>
                                <label htmlFor="city">City:</label>
                                <br/>
                                <input type="text" className="w-10/12 h-10 border border-gray-400 px-2 py-1" id="city" defaultValue={this.state.city} onChange={(event) => {this.changeState(event)}}/>
                            </div>
                            <div>
                                <label htmlFor="zipCode">Zip Code:</label>
                                <br/>
                                <input type="text" className="w-10/12 h-10 border border-gray-400 px-2 py-1" id="zipCode" defaultValue={this.state.zipCode} onChange={(event) => {this.changeState(event)}}/>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="address">Address:</label>
                                <br/>
                                <input type="text" className="w-11/12 h-10 border border-gray-400 px-2 py-1" id="address" defaultValue={this.state.address} onChange={(event) => {this.changeState(event)}}/>
                            </div>
                        </div>
                        <div className="my-4">
                            {this.state.errorMessage}
                            {this.state.successMessage}
                        </div>
                        <hr className="border-yellow-800 my-4"/>
                        <div className="text-right">
                            <input type="submit" className="bg-yellow-700 py-2 px-4 text-yellow-100 rounded" value="Save Changes"/>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}

export default ProfileForm;