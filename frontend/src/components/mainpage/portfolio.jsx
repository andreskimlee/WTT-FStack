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
            return (
                <div className="stock-info-port">
                    <div>{symbol}</div>
                    <div>{aggregatedStocks[symbol].count + " " + "shares"}</div>
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