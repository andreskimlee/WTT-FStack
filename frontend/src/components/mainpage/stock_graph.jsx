import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Odometer from 'react-odometerjs'

class StockGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: this.props.currPrice,
            originalPrice: this.props.currPrice,
            Qty: "",
            symbol: this.props.symbol
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currPrice !== this.props.currPrice) {
            this.setState({ price: this.props.currPrice, originalPrice: this.props.currPrice, symbol: this.props.symbol })
        }
    }


    handleMouseMove(e) {
        if (e.activePayload !== undefined) {
            console.log(e.activePayload)
            this.setState({ price: e.activePayload[0].payload.price })
        }
    }

    handleMouseLeave() {
        this.setState({ price: this.state.originalPrice })
    }

    renderStockInfo() {
        let lastNotNullPrice;
        let stockInfo;
        if (this.props.data) {
            stockInfo = this.props.data.map((stock, idx) => {
                if (stock.high !== null) {
                    lastNotNullPrice = stock.high
                } else {
                    stock.high = lastNotNullPrice;
                };
                return {
                    date: stock.date,
                    time: new Date(`${stock.date}T${stock.minute}:00`).toLocaleTimeString().split(" ")[0],
                    price: stock.high,
                    idx: idx,
                }
            }
            )
        };
        return stockInfo;
    }

    buyStock() {
        let transaction = {
            user: this.props.currentUser,
            amount: this.state.originalPrice,
            stockCount: this.state.Qty,
            transactionType: "buy",
            symbol: this.state.symbol
        }

        this.props.createTransaction(transaction)
    }

    handleChange(e) {
        this.setState({ Qty: e.target.value })
    }

    render() {

        const stockInfo = this.renderStockInfo()
        return (
            <div>
                <div className="stock-price-odometer">$<Odometer value={(this.state.price)} duration={300} format='(,ddd).dd' /></div>
                <div className="percent-odo">
                    <div className="graph-change">$<Odometer value={(this.state.originalPrice - this.state.price).toFixed(2)} /></div>
                    <div> [ <Odometer value={(((this.state.originalPrice - this.state.price) / this.state.originalPrice) * 100).toFixed(2)} /> % ] </div>
                </div>
                <div className="day-text">30 Day History</div>
                <div className="graph-container">
                    <ResponsiveContainer >
                        <LineChart data={stockInfo}
                            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                            onMouseMove={this.handleMouseMove.bind(this)}
                            onMouseLeave={this.handleMouseLeave.bind(this)}

                            height={300}>

                            <XAxis dataKey="date"
                                allowDataOverflow={false}

                            />
                            <YAxis type="number"
                                dataKey="price"
                                domain={300}
                                hide={true}
                            />
                            <Tooltip position={{ y: 1 }}

                            />
                            <Line type="linear"
                                connectNulls={true}
                                dot={false}
                                dataKey="price"
                                stroke="#20ce9a"
                                strokeWidth="2"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="buy-container">
                        <input onChange={this.handleChange.bind(this)} className="ticker-search-2" type="text" placeholder="Quantity To Buy" value={this.state.Qty} />
                        <button onClick={this.buyStock.bind(this)} className="buy-button">Buy</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default StockGraph;