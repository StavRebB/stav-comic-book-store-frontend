import React, { Component } from 'react';
import './AccountProfile.css';
import ProfileCard from './ProfileCard/ProfileCard';
import ProfileForm from './ProfileForm/ProfileForm';
require('dotenv').config()

class AccountProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            userId: null,
            firstName: "someName",
            lastName: "someLastName",
            email: "email@website.com",
            phoneNum: "XXX-XXXXXXX",
            country: "someCountry",
            city: "someCity",
            address: "address",
            password: "******",
            zipCode:'none',
            DOB: null,
            role: "606b3a27b75b923d58cee841",
        }
    }

    componentDidMount = () => {

        this.updateState()

    }

    updateState = async() => {

        let currEmail = localStorage.getItem('currentUser')

        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/members/email/${currEmail}`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            usersList: myres,
            userId: myres.id,
            firstName: myres.FirstName,
            lastName: myres.LastName,
            email: myres.Email,
            phoneNum: myres.PhoneNumber,
            country: myres.Country,
            city: myres.City,
            address: myres.Address,
            zipCode: myres.ZipCode,
            DOB: myres.DateOfBirth,
            role: myres.Role,
        })
    }

    isUserSignedInCB = (bool) => {
        this.props.isUserSignedIn(bool)
    }

    curUserNameCB = (name) => {
        this.props.curUserName(name)
    }


    render () {
        return(    
            <main className="AccountProfile ml-96 mt-20">
                <div className="profileCard">
                    <ProfileCard userId={this.state.userId} firstName={this.state.firstName} lastName={this.state.lastName} email={this.state.email} phoneNum={this.state.phoneNum} country={this.state.country} city={this.state.city} history={this.props.history} role={this.state.role} dateOfBirth={this.state.DOB} zipCode={this.state.zipCode} isUserSignedIn={this.isUserSignedInCB}/>
                </div>
                <div className="profileForm">
                    <ProfileForm email={this.state.email} updateState={this.updateState} curUserName={this.curUserNameCB}/>
                </div>
            </main>
        )
    }
}

export default AccountProfile;