import React from 'react';

class Portfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allTransactions: null
        }
    }

    componentDidMount() {
        this.props.fetchAllTrans(this.props.currentUser.id).then(() => {
            this.setState({ allTransactions: this.props.transactions })
        })
    }

    findCompany = async val => {
        let latestPrice;
        await fetch(`https://sandbox.iexapis.com/stable/stock/${val}/quote?token=Tpk_545c7b20d4af458da7672e78f265003a`)
            .then(res => {
                return res.json();
            }).then(res => {
                debugger
                latestPrice = res.latestPrice;
            })
        return latestPrice
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
        let portfolioStocks = Object.keys(aggregatedStocks).map(symbol => {
            let livePrice;
            this.findCompany(symbol).then(res => livePrice = res)

            return (
                <div className="stock-info-port">
                    <div>{symbol}</div>
                    <div>{aggregatedStocks[symbol].count + " " + "shares"}</div>
                    <div>{livePrice ? livePrice : ""}</div>
                </div>
            )
        })




        return (
            <div className="portfolio-container">
                <div>{portfolioStocks}</div>
            </div>
        )
    }
}

export default Portfolio;