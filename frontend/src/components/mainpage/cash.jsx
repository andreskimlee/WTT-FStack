import React from 'react';

class Cash extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: "",
            result: null,
            company: null
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

    findCompany = val => {
        fetch(`https://sandbox.iexapis.com/stable/stock/${val}/quote?token=Tpk_545c7b20d4af458da7672e78f265003a`)
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({ company: res });
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
        this.findCompany(val)
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
        let companyName, latestPrice;
        if (this.state.company) {
            companyName = this.state.company.companyName
        }
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
                <form className="form-cont">
                    <div className="input-class">
                        <input className="ticker-search-1" type="text" value={this.state.searchTerm} placeholder="Ticker" onChange={e => this.handleChange(e)} />
                        <div className="search-res-cont">
                            {searchResult}
                        </div>
                        <input className="ticker-search-2" type="text" placeholder="Qty" />
                    </div>

                </form>
                <div className="company-name-text">{companyName}</div>

            </div >
        )
    }
}

export default Cash;