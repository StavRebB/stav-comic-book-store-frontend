import React, { Component } from 'react';
import './Header.css';
import { Link, NavLink } from "react-router-dom";

class Header extends Component{
   render(){
      return(
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-2 navbar-expand-lg bg-yellow-700 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                    <span className="text-3xl leading-relaxed inline-block mr-4 py-1 whitespace-no-wrap uppercase text-white">
                        FunnyBooks.com
                    </span>
                <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
                    <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                    <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                    <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                </button>
                </div>
                <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
                <ul className="flex flex-col lg:flex-row list-none mr-auto">
                    <li className="nav-item">
                    <span className="px-3 py-2 flex items-center text-sm uppercase leading-snug text-white hover:opacity-75">
                    <Link exact="true" to="/">
                        <span className="ml-2 text-lg font-bold">Homepage</span>
                    </Link>
                    </span>
                    </li>
                    <li className="nav-item">
                    <span className="px-3 py-2 flex items-center text-sm uppercase leading-snug text-white hover:opacity-75">
                        <Link to="/catalogue">
                            <span className="ml-2 text-lg font-bold">Browse</span>
                        </Link>
                    </span>
                    </li>
                    <li className="nav-item">
                    <span className="px-3 py-2 flex items-center text-sm uppercase leading-snug text-white hover:opacity-75">
                        <Link to="/blog">
                            <span className="ml-2 text-lg font-bold">Blog</span>
                        </Link>
                    </span>
                    </li>
                </ul>
                <div className="relative flex w-1/2 sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
                    <div className="flex">
                    <span className="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-yellow-500 rounded-full text-sm bg-yellow-100 items-center rounded-r-none pl-2 py-1 text-yellow-800 border-r-0 placeholder-yellow-300">
                        <i className="fas fa-search"></i>
                    </span>
                    </div>

                    <input type="text" className="px-2 py-1 h-8 border border-solid  border-yellow-600 rounded-full text-sm leading-snug text-yellow-700 bg-yellow-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-yellow-600" placeholder="Search" />
                </div>
                <ul className="flex flex-col lg:flex-row list-none">
                <li className="nav-item">
                    <span className="px-3 py-2 flex items-center text-sm uppercase leading-snug text-white hover:opacity-75">
                        <Link to="/login">
                            <i className="fas fa-user-check text-sm leading-xs text-white hover:opacity-75" /> <span className="ml-2 text-lg">Sign In/Sign Up</span>
                        </Link>
                    </span>
                </li>
                <li className="nav-item">
                    <span className="px-3 py-2 flex items-center text-lg uppercase leading-snug text-white hover:opacity-75">
                        {/* <Link> */}
                            <i className="fas fa-shopping-cart text-lg leading-none text-white hover:opacity-75" /> 
                        {/* </Link> */}
                    </span>
                </li>
                <li className="nav-item">
                    <span className="px-3 py-2 flex items-center text-lg uppercase leading-snug text-white hover:opacity-75">
                        {/* <Link> */}
                            <i className="far fa-heart text-lg leading-none text-white hover:opacity-75" /> 
                        {/* </Link> */}
                    </span>
                </li>
                </ul>
                </div>
            </div>
            </nav>
      );
   }
}

export default Header;