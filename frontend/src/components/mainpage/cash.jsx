import React from 'react';
import axios from 'axios';

class Cash extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: "",
            result: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    // This function's job is to fetch the search results given the specified query. (For Live Search)
    search = async val => {
        fetch(`https://sandbox.iexapis.com/stable/search/${val}?token=Tsk_536efa1336e94441beb5f27e888e3721`)
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({ result: res });
            })
    }

    handleChange(e) { // Event listener for any change a search is triggered (API call) 
        if (e.currentTarget.value.length === 0) {
            this.setState({ result: null })
        } // if field is empty should clear the results. 
        this.search(e.currentTarget.value);
        this.setState({ searchTerm: e.currentTarget.value });
    }

    handleClick(val) { // if the user clicks on one of the results, 
        //  it sets the input value to the company and clears the previous search result.

        this.setState({ searchTerm: val, result: null })
    }

    moneyFormat(price, sign = '$') { // formats the user's available funds. 
        const pieces = parseFloat(price).toFixed(2).split('')
        let ii = pieces.length - 3
        while ((ii -= 3) > 0) {
            pieces.splice(ii, 0, ',')
        }
        return sign + pieces.join('')
    }


    render() {
        let searchResult;
        if (this.state.result) { // ensures results of search only show when a valid search is applied
            searchResult = this.state.result.map((company, idx) => {
                return (

                    <div onClick={() => this.handleClick(company.symbol)} className="search-result-item" key={idx}>{company.symbol}</div>

                )
            })
        }
        let funds = this.moneyFormat(this.props.currentUser.funds)
        return (
            <div className="cash-container">
                <div className="cash-available-text">Available Cash - {funds}</div>
                <form>
                    <input className="ticker-search-1" type="text" value={this.state.searchTerm} placeholder="Ticker" onChange={e => this.handleChange(e)} />
                    <div className="search-res-cont">
                        {searchResult}
                    </div>
                    <input className="ticker-search-2" type="text" placeholder="Qty" />
                    <input type="submit" value="buy" />
                </form>

            </div>
        )
    }
}

export default Cash;