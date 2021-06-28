
import { Card, CardContent, CardHeader } from '@material-ui/core';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Doughnut } from 'react-chartjs-2';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      products: null,
      data: [],
      labels: [],
      colors: [],
      productsNum: 0,
      MembersNum: 0,
      OrdersNum: 0,
      PostsNum: 0,
      languages: null,
    }
  }

  componentDidMount = () => {
    this.getProdNum()
    this.getMemNum()
    this.getOrdNum()
    this.getPostsNum()
    this.getLangs()
  }

  getProdNum = async() => {
    const response = await fetch("/products", {
        method: 'GET'
    });
    let myres = await response.json()
    this.setState({
      products: myres,
      productsNum: myres.length
    })
  }

  getMemNum = async() => {
    const response = await fetch("/members", {
        method: 'GET'
    });
    let myres = await response.json()
    this.setState({
      MembersNum: myres.length
    })
  }

  getOrdNum = async() => {
    const response = await fetch("/orders", {
        method: 'GET'
    });
    let myres = await response.json()
    this.setState({
      OrdersNum: myres.length
    })
  }

  getPostsNum = async() => {
    const response = await fetch("/blogposts", {
        method: 'GET'
    });
    let myres = await response.json()
    this.setState({
      PostsNum: myres.length
    })
  }

  getLangs = async() => {
    const response = await fetch("/languages", {
      method: 'GET'
  });
  let myres = await response.json()
  this.setState({
    languages: myres
  },async() => {
    let mylangs = [...this.state.languages]
    for (let i in mylangs) {
      const response = await fetch(`/products/lang/${mylangs[i].id}`, {
        method: 'GET'
      });
      let myres = await response.json()
      mylangs[i].howmany = myres.length
      const red = Math.floor((Math.random() * 255))
      const green = Math.floor((Math.random() * 255))
      const blue = Math.floor((Math.random() * 255))
      mylangs[i].color = `rgb(${red},${green},${blue})`
    }
    let langs = []
    let amnts = []
    let colors = []
    for(let j in mylangs) {
      langs.push(mylangs[j].Name)
      amnts.push(mylangs[j].howmany)
      colors.push(mylangs[j].color)
    }
    this.setState({
      labels: langs,
      data: amnts,
      colors: colors
    })
  })
  }

  render () {
      return(    
        <main className="Dashboard place-items-center">
          <Card>
            <CardHeader title="Welcome to the administration" />
            <div className="flex">
              <Paper elevation={3} className="w-1/6 mr-16 p-4 ">
                <i class="fas fa-swatchbook float-right text-4xl text-yellow-800"></i>
                <br/>
                <h1 className="text-3xl text-center mb-10 mt-5">Number of Products</h1>
                <h1 className="text-5xl text-center font-bold">{this.state.productsNum}</h1>
              </Paper>
              <Paper elevation={3} className="w-1/6 mr-16 p-4">
                <i class="fas fa-users float-right text-4xl text-yellow-800"></i>
                <br/>
                <h1 className="text-3xl text-center mb-10 mt-5">Number of Members</h1>
                <h1 className="text-5xl text-center font-bold">{this.state.MembersNum}</h1>
              </Paper>
              <Paper elevation={3} className="w-1/6 mr-16 p-4">
                <i class="fab fa-shopify float-right text-4xl text-yellow-800"></i>
                <br/>
                <h1 className="text-3xl text-center mb-10 mt-5">Number of Orders</h1>
                <h1 className="text-5xl text-center font-bold">{this.state.OrdersNum}</h1>
              </Paper>
              <Paper elevation={3} className="w-1/6 p-4 h-32">
                <i class="far fa-copy float-right text-4xl text-yellow-800"></i>
                <br/>
                <h1 className="text-3xl text-center mb-10 mt-5">Number of Blog Posts</h1>
                <h1 className="text-5xl text-center font-bold">{this.state.PostsNum}</h1>
              </Paper>
            </div>
            <CardContent className="text-5xl">Products By Language</CardContent>
            <div>
            <Doughnut 
            data={{
              labels: this.state.labels,
              datasets: [{
                label: 'My First Dataset',
                data: this.state.data,
                backgroundColor: this.state.colors,
                hoverOffset: 4
              }]
            }}
            options={{ maintainAspectRatio: false }}
            width={350}
            height={350}/>
          </div>
          </Card>
        </main>
      )
  }
}

export default Dashboard;