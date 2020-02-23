import React from 'react';

class Portfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allTransactions: null,
            livePrices: null,
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
    findMultipleCompanies = arr => {
        arr = arr.join(",")
        fetch(`https://sandbox.iexapis.com/v1/stock/market/batch?types=quote&symbols=${arr}&range=5y%20&token=Tpk_545c7b20d4af458da7672e78f265003a`)
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({ livePrices: res })
            })

    }

    render() {
        let aggregatedStocks = {}

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
        }
        // instead of sending the symbol, send an array to the function and return the live prices of all companies
        // and use batch for IEX API.
        let portfolioStocks;
        if (Object.values(aggregatedStocks).length >= 1) {
            portfolioStocks = Object.keys(aggregatedStocks)
            this.findMultipleCompanies(portfolioStocks)
        }
        let portfolioContent;
        if (this.state.livePrices) {
            portfolioContent = portfolioStocks.map(symbol => {
                let pricePurchased = aggregatedStocks[symbol].amount
                let currPrice = this.state.livePrices[symbol].quote.latestPrice
                let shares = aggregatedStocks[symbol].count
                let openPrice = this.state.livePrices[symbol].quote.open
                if (currPrice < openPrice) {

                }
                return (
                    <div>
                        <div>{symbol}</div>
                        <div>{aggregatedStocks[symbol].count}</div>
                        <div>{pricePurchased}</div>
                        <div>Profit = {(shares * currPrice) - pricePurchased}</div>
                        <div>{currPrice}</div>
                    </div>
                )
            })
        }

        return (
            <div className="portfolio-container">
                <div>{portfolioContent}</div>
            </div>
        )
    }
}

export default Portfolio;