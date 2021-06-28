import React, { Component } from 'react';
import './filters.css';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: null,
            formats: null,
            publishers: null
        }
    }

    componentDidMount = () => {
        this.getLanguages();
        this.getPublishers();
        this.getFormats();
    }

    getLanguages = async() => {
        const response = await fetch("/languages", {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            languages: myres,
        })
    }

    getPublishers = async() => {
        const response = await fetch("/publishers", {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            publishers: myres,
        })
    }

    getFormats = async() => {
        const response = await fetch("/formats", {
            method: 'GET'
        });
        let myres = await response.json()
        this.setState({
            formats: myres,
        })
    }


    
  render () {
    return (
        <div className="filters text-xl">
            <div className="border-4 border-yellow-700 rounded bg-yellow-100">
            <h1 className="filtersHeader bg-yellow-700 text-black text-3xl">Filters</h1>
            <div className="filterLanguage mx-4">
                Language 
                <br/>
                <select 
                    className="border border-gray-300" 
                    value={this.props.language} 
                    onChange={this.props.filterLanguage}
                >
                    <option value="">Any</option>
                    {this.state.languages && this.state.languages.map(language => (
                        <option key={language.id} value={language.id}>{language.Name}</option>
                    ))}
                </select>
            </div>
            <div className="filterFormat mx-4">
                <p>
                    Format:
                </p>
                <span>
                    <input 
                        type="radio" 
                        id="any" 
                        name="format" 
                        value="" 
                        onClick={this.props.filterFormat}
                    />
                    <label htmlFor="any">Any</label>
                    <br/>
                </span>
                {this.state.formats && this.state.formats.map(format => (
                        <span>
                            <input type="radio" id={format.Name} name="format" value={format.id} key={format.id} onClick={this.props.filterFormat}/>
                            <label htmlFor={format.Name}>{format.Name}</label>
                            <br/>
                        </span>
                ))}
            </div>
            <div className="filterPublisher mx-4">
                Publisher 
                <br/>
                <select 
                    className="border border-gray-300" 
                    value={this.props.publisher} 
                    onChange={this.props.filterPublisher}
                >
                    <option value="">Any</option>
                    {this.state.publishers && this.state.publishers.map(publisher => (
                        <option key={publisher.id} value={publisher.id}>{publisher.Name}</option>
                    ))}
                </select>
            </div>
            <div className="priceSort mx-4">
                Order
                <br/>
                <select 
                    className="border border-gray-300" 
                    value={this.props.sort} 
                    onChange={this.props.sortPrices}
                >
                <option value="">Any</option>
                <option value="lowest">Lowest to Highest</option> 
                <option value="highest">Highest to Lowest</option> 
                </select>
            </div>
            <div className="filterResults ml-4 mb-6">
                {this.props.count} Results Found
            </div>
            </div>
        </div>
    )
  }
}

export default Filters;
