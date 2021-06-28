import React, { Component } from 'react';
import './ProfileCard.css';
import avatar from './avatar.png'
import {auth} from '../../../firebase'
import CurrAuth from '../../../auth';
import { Link } from 'react-router-dom';

class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            imagefile: null,
        }
    }

    signOutFunc = async () => {

        auth.signOut()
        .then(() => {
            this.props.isUserSignedIn(false)
        })
        .catch((error) => {
            this.setState({
                errorMessage: <h3 style={{ color: "red" }}>{error.message}</h3>
            })
        })

        localStorage.removeItem('currentUser');
        localStorage.removeItem('signupSuccess');
        localStorage.setItem('signIn', false)
        CurrAuth.logout(() => {
            this.props.history.push("/account/profile")
        })
    }

    saveFile = (event) => {
        this.setState({
            imagefile: event.target.files[0]
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault()
    }

    render () {
        let livingPlace= `${this.props.city}, ${this.props.country}`
        let fullName = `${this.props.firstName} ${this.props.lastName}`

        let buttons;

        if(this.props.role === "606b3a27b75b923d58cee841") {
            buttons = null
        } else {
            buttons = <div>
        <Link to="/admin-dashboard">
            <button 
                className="text-3xl font-light py-2 px-4 mx-auto bg-yellow-100 mb-6 rounded ml-24 text-yellow-900 hover:text-yellow-100 hover:bg-yellow-900"
            >
                Admin Dashboard
            </button>
        </Link>
        <hr className="SepLine border-yellow-900 mx-8 mb-4"/>
        </div>
        }

        return(    
            <main className="ProfileCard">
                <div className="cardBody bg-yellow-700 w-10/12 rounded-lg">
                    <div className="imageDiv py-5">
                        <img src={avatar} alt="profile shot" className="profileImg rounded-full mx-auto border-4 border-yellow-900" width="200"/>
                    </div>
                    {/* <div className="chngImg">
                        <form onSubmit={(event) => {this.handleSubmit(event)}}>
                            <input type="file" className="py-2 px-4 ml-20" name="photoSrc" onChange={(event) => {this.saveFile(event)}}/>
                            <button 
                                type="submit" 
                                id="pic"
                                className="text-3xl font-light py-2 px-4 mx-auto bg-yellow-100 mb-6 rounded ml-20 text-yellow-900 hover:text-yellow-100 hover:bg-yellow-900">
                                <i className="far fa-image"/>
                                &nbsp;
                                Change Picture
                            </button>
                        </form>
                    </div> */}
                    <hr className="SepLine border-yellow-900 mx-8 mb-4"/>
                    <div className="personalDetails opacity-90 text-center pb-4 text-yellow-100">
                        <h3 className="text-2xl font-medium">{fullName}</h3>
                        <h3 className="text-2xl font-medium">{livingPlace}</h3>
                        <h3 className="text-2xl font-medium">{this.props.email}</h3>
                        <h3 className="text-2xl font-medium">{this.props.phoneNum}</h3>
                    </div>
                    <hr className="SepLine border-yellow-900 mx-8 mb-4"/>
                    {buttons}
                    <div><button className="text-3xl font-light py-2 px-4 mx-auto bg-yellow-100 mb-6 rounded ml-32 text-yellow-900 hover:text-yellow-100 hover:bg-yellow-900" onClick= {() => {this.signOutFunc()}}>Sign Out</button></div>
                    <hr className="SepLine border-yellow-900 mx-8 mb-4"/>
                    <Link to="/track-order">
                        <button 
                            className="text-3xl font-light py-2 px-4 mx-auto bg-yellow-100 mb-6 rounded ml-28 text-yellow-900 hover:text-yellow-100 hover:bg-yellow-900"
                        >
                            Track Order
                        </button>
                    </Link>
                </div>
            </main>
        )
    }
}

export default ProfileCard;