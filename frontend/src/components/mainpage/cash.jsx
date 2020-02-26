import React from 'react';
import StockGraph from './stock_graph_container'
import 'odometer/themes/odometer-theme-default.css';
import Odometer from 'react-odometerjs'
const Key = { IEXAPIKey: 'sk_d78be1c9c5284c1d83028b0ab25aa5fe' }

class Cash extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: "",
            result: null,
            company: null,
            history: null,
            price: null,
            symbol: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    // fetches a user based on logged in user. 
    componentDidMount() {
        if (this.props.currentUser && Object.values(this.props.user).length < 1) {
            this.props.fetchUser(this.props.currentUser.id)
        }
    }

    // This function's job is to fetch the search results given the specified query. (For Live Search) 
    // Currently using the sandbox api (Testing API) due to account restrictions (free user) for IEX. 
    search = async val => {
        fetch(`https://sandbox.iexapis.com/stable/search/${val}?token=Tsk_536efa1336e94441beb5f27e888e3721`)
            .then(res => {
                return res.json();
            }).then(res => {

                this.setState({ result: res });
            })
    }

    // fetches a company based on the ticker.
    findCompany = val => {
        fetch(`https://cloud.iexapis.com/stable/stock/${val}/quote?token=${Key.IEXAPIKey}`)
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({ company: res, price: res.latestPrice, symbol: val });

            })
        // fetches a company and returns the 1 month historical price. This is mainly used for the 
        // d3 recharts for the line graph. 
        fetch(`https://cloud.iexapis.com/stable/stock/${val}/chart/1m?token=${Key.IEXAPIKey}`)
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({ history: res });
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



    render() {
        let companyName;
        let companyInfo;

        // ensures company was selected from liveSearch before displaying the stock/companyInfo
        if (this.state.company) {
            companyName = this.state.company.companyName
            companyInfo = <div className="abc-dd">
                <div className="company-name-text">{companyName}</div>

                <StockGraph data={this.state.history} symbol={this.state.symbol} currPrice={this.state.price} funds={this.props.user.funds} />
            </div>

        }


        let searchResult;
        if (this.state.result) { // ensures results of search only show when a valid search is applied
            searchResult = this.state.result.map((company, idx) => {
                return (
                    <div onClick={() => this.handleClick(company.symbol)}
                        className="search-result-item"
                        key={idx}>
                        {company.symbol}
                    </div>

                )
            })
        }

        let funds = this.props.user.funds
        return (
            <div className="cash-container">
                <div className="cash-available-text">Available Cash - $<Odometer duration={300} value={funds}></Odometer></div>
                <form className="form-cont">
                    <div className="input-class">
                        <input className="ticker-search-1" type="text" value={this.state.searchTerm} placeholder="Search Stock By Ticker" onChange={e => this.handleChange(e)} />
                        <div className="search-res-cont">
                            {searchResult}
                        </div>

                    </div>

                </form>
                {companyInfo}
            </div >
        )
    }
}

export default Cash;