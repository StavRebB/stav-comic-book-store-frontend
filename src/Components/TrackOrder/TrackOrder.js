import React, { Component } from 'react';
import './TrackOrder.css';
import formatPrice from '../utility/Price'

class TrackOrder extends Component {
    constructor() {
        super()
        this.state = {
            orders: [],
            products: [],
            num: null,
            curOrder: null,
            ordProds: [],
            status: null,
        }
    }

    componentDidMount = () => {
        this.getOrders();
        this.getProducts();
    }

    addNum = (event) => {
        this.setState({
            num: event.target.value
        })
    }

    getOrders = async() => {
        const response = await fetch(`/orders`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            orders: myres
        })
    }

    getProducts = async() => {
        const response = await fetch(`/products`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            products: myres
        })
    }

    getStatus = async(statusid) => {
        const response = await fetch(`/status/${statusid}`, {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            status: myres.Name
        })
    }

    findOrder = () => {

        let ordNum = this.state.num

        let isFound = false;

        let ords = [...this.state.orders]

        if(ords.length) {
            for(let ord of ords) {
                if (ord.OrderNum === ordNum) {
                    isFound = true
                    this.setState({
                        curOrder: ord,
                        ordProds: ord.Products,
                    }, () => {
                        this.getStatus(this.state.curOrder.Status)
                        this.getProdDetails()
                    })
                    break;
                }
            }
        }

        if(isFound === false) {
            this.setState({
                curOrder: null
            })
        }
    }

    getProdDetails = () => {
        let itemsArr = [...this.state.ordProds]
        let prodArr = [...this.state.products]

        if(itemsArr.length) {
            for(let item of itemsArr) {
                for (let product of prodArr) {
                    if (item.id === product.id) {
                        item.isbn = product.ISBN10
                        item.title = product.Title
                        item.price = product.CurrentPrice
                    }
                }
            }
        }

        this.setState({
            ordProds: itemsArr
        })
    }

    render () {

        let orderID;
        if(this.state.curOrder) {
            orderID = this.state.curOrder.OrderNum
        }

        let ordDetails;
        if(this.state.curOrder) {
            ordDetails =                     <div>
            <div>
                <h1 className="text-yellow-800 text-4xl font-medium mt-2 my-4">Payer Details</h1> 
                <div className="mb-4">
                    <p><span className="underline">Order Status:</span> {this.state.status}</p>
                    <table>
                        <tr>
                            <td className="w-72"><span className="underline">Payer Name:</span> {this.state.curOrder.PayerName}</td>
                            <td className="w-72"><span className="underline">email:</span> {this.state.curOrder.Email}</td>
                        </tr>
                        <tr>
                            <td className="w-72"><span className="underline">Payment:</span> {this.state.curOrder.Payment}</td>
                            <td className="w-72"><span className="underline">Price:</span> {formatPrice(this.state.curOrder.Sum)}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <hr className="border-yellow-900 mr-96 my-6"/>
            <div>
                <h1 className="text-yellow-800 text-4xl font-medium mt-2 my-4">Products</h1> 
                <table>
                    <thead className="text-yellow-700">
                        <tr>
                            <th>ISBN10</th>
                            <th>Title</th>
                            <th>Price Per Unit</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    {this.state.ordProds && this.state.ordProds.map(item => (
                        <tr>
                            <td className="w-40">{item.isbn}</td>
                            <td className="w-96">{item.title}</td>
                            <td className="w-96">{formatPrice(item.price)}</td>
                            <td className="w-96">{item.amount}</td>
                        </tr>
                    ))}
                </table>
            </div>
            <hr className="border-yellow-900 mr-96 my-6"/>
            <div>
                <h1 className="text-yellow-800 text-4xl font-medium mt-2 my-4">Reciever Details</h1>
                <table>
                    <tr>
                        <td className="w-72"><span className="underline">Reciever Name:</span> {this.state.curOrder.RecieverName}</td>
                        <td className="w-72"><span className="underline">Phone Number:</span> {this.state.curOrder.PhoneNumber}</td>
                    </tr>
                    <tr>
                        <td className="w-72"><span className="underline">Address:</span> {this.state.curOrder.Address}</td>
                        <td className="w-72"><span className="underline">Zipcode:</span> {this.state.curOrder.ZipCode}</td>
                    </tr>
                    <tr>
                        <td className="w-72"><span className="underline">City:</span> {this.state.curOrder.City}</td>
                        <td className="w-72"><span className="underline">Country:</span> {this.state.curOrder.Country}</td>
                    </tr>
                </table>
                <p className="mb-2"><span className="underline">Notes:</span> {this.state.curOrder.Notes}</p>
            </div>
        </div>
        } else {
            ordDetails = <div></div>
        }

        return(    
            <main className="TrackOrder mb-12">
                <div className="mt-4 mb-6 border-4 border-yellow-200 bg-yellow-100 mx-12 rounded text-center text-3xl">
                    <h1 className="text-yellow-900 text-6xl font-bold mt-2">Track Order</h1>
                    <div className="my-4">
                        <label>Enter Order Number:</label>
                        &nbsp;
                        <input type="text" className="border border-black" onChange={(event) => {this.addNum(event)}}/>
                    </div>
                    <button className="bg-yellow-800 text-yellow-100 rounded px-4 py-2 shadow-lg hover:shadow-none border border-yellow-800 mb-3" onClick={() => {this.findOrder()}}>
                        Find Order
                    </button>
                </div>
                <div className="bg-gray-300 text-3xl shadow shadow-md border-4 rounded border-solid border-8 border-gray-400 mx-12 pl-4">
                    <h1 className="text-yellow-700 text-5xl font-medium mt-2">Order ID: {orderID}</h1>
                    {ordDetails}
                </div>
            </main>
        )
    }
}

export default TrackOrder;