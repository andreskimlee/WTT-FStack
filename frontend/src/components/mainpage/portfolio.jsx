import React from 'react';

class Portfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allTransactions: null,
            livePrices: null,
            aggregatedStocks: null
        }
    }

    componentDidMount() {
        this.props.fetchAllTrans(this.props.currentUser.id).then(() => {
            this.setState({ allTransactions: this.props.transactions })
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.transactions.length !== this.props.transactions.length) {
            this.setState({ allTransactions: this.props.transactions })
        }
    }

    // this function returns the quotes for all stocks in your portfolio in a batch call in order to get 
    // latest stock prices. 
    async findMultipleCompanies(arr) {
        if (this.state.livePrices === null || arr.length !== Object.values(this.state.livePrices).length) {
            arr = arr.join(",")
            const res = await fetch(`https://sandbox.iexapis.com/v1/stock/market/batch?types=quote&symbols=${arr}&range=5y%20&token=Tpk_545c7b20d4af458da7672e78f265003a`)
            const res2 = await res.json()
            this.setState({ livePrices: res2 })
        }

    }

    render() {
        let aggregatedStocks = {}
        let portfolioContent;
        if (this.state.allTransactions !== null) {
            this.state.allTransactions.map(stock => {
                if (!aggregatedStocks[stock.symbol]) {
                    aggregatedStocks[stock.symbol] = {
                        count: stock.stock_count,
                        amount: stock.amount
                    }
                } else {
                    aggregatedStocks[stock.symbol].count += stock.stock_count
                    aggregatedStocks[stock.symbol].amount += stock.amount
                }
            })
        } else return null;
        // instead of sending the symbol, send an array to the function and return the live prices of all companies
        // and use batch for IEX API.
        let portfolioStocks;
        if (Object.values(aggregatedStocks).length >= 1) {
            portfolioStocks = Object.keys(aggregatedStocks)
            this.findMultipleCompanies(portfolioStocks)
        }

        let counter = 0;
        debugger
        if (this.state.livePrices && Object.keys(this.state.livePrices).length === Object.keys(aggregatedStocks).length) {
            portfolioContent = portfolioStocks.map((symbol, idx) => {

                let currPrice;
                let openPrice;
                let companyName;
                let pricePurchased = aggregatedStocks[symbol].amount
                currPrice = this.state.livePrices[symbol].quote.latestPrice
                openPrice = this.state.livePrices[symbol].quote.open
                companyName = this.state.livePrices[symbol].quote.companyName
                let shares = aggregatedStocks[symbol].count

                let Profit = (shares * currPrice) - pricePurchased
                let currVal = (currPrice * shares)
                counter += currVal
                // if (currPrice < openPrice) {

                // }
                return (
                    <div key={idx} className="portfolio-stock-info-cont">
                        <div>{symbol}</div>
                        <div className="company-name-port">{companyName}</div>
                        <div>{shares}</div>
                        <div>${(currPrice * shares).toFixed(2)}<div>({Profit.toFixed(2)})</div></div>
                    </div>
                )
            })
        } else {
            this.findMultipleCompanies(Object.keys(aggregatedStocks))
        }

        return (
            <div className="portfolio-container">
                <div className="port-val-total-text">Portfolio (${counter.toFixed(2)})</div>
                <div className="column-names-cont">
                    <div>symbol</div>
                    <div>company</div>
                    <div>shares</div>
                    <div>value</div>
                </div>
                <div>{portfolioContent}</div>
            </div>
        )
    }
}

export default Portfolio;