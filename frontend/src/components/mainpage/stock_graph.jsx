import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Odometer from 'react-odometerjs'

// graph / buy stock page. Utilizes recharts library to create a chart based on a stocks 1 month performance. 
class StockGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: this.props.currPrice,
            originalPrice: this.props.currPrice,
            Qty: "",
            symbol: this.props.symbol,
            calculator: 'hide',
        }
    }

    // refetches the currPrice if a new stock symbol is selected from the parent container. 
    componentDidUpdate(prevProps) {
        if (prevProps.currPrice !== this.props.currPrice) {
            this.setState({ price: this.props.currPrice, originalPrice: this.props.currPrice, symbol: this.props.symbol })
        }
    }

    // changes odometer price on mouse move within the graph 
    handleMouseMove(e) {
        if (e.activePayload) {
            this.setState({ price: e.activePayload[0].payload.price })
        }
    }

    // function to show calculator or not depending on if the Quantity input field is focused. 
    handleFocus(e) {
        if (e.type === 'focus') {
            this.setState({ calculator: "show" })
        } else if (e.type === 'blur') {
            this.setState({ calculator: 'hide' })
        }
    }

    // resets the price to currentPRice of the stock on the odometer if they leave the graph 
    handleMouseLeave() {
        this.setState({ price: this.state.originalPrice })
    }


    // buys a stock.
    buyStock() {
        let transaction = {
            user: this.props.currentUser,
            amount: this.state.originalPrice,
            stockCount: parseInt(this.state.Qty),
            transactionType: "buy",
            symbol: this.state.symbol
        }

        this.props.createTransaction(transaction)
    }

    // handle Change for the quantity field. 
    handleChange(e) {
        this.setState({ Qty: e.target.value })
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

    render() {
        let errors;
        // if there are errors, this will display errors onto the field. 
        if (Object.keys(this.props.errors).length > 0) {

            Object.keys(this.props.errors).forEach(key => {
                errors = this.props.errors[key]
            })

        }
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
                        <input onFocus={this.handleFocus.bind(this)} onBlur={this.handleFocus.bind(this)} onChange={this.handleChange.bind(this)} className="ticker-search-2" type="text" placeholder="Quantity To Buy" value={this.state.Qty} />
                        <div className={`calculator-${this.state.calculator}`}>
                            <div>Price - ${this.props.currPrice}</div>
                            <div className="share-qty">Shares - <Odometer value={this.state.Qty.length === 0 ? 0 : this.state.Qty} /></div>
                            <div className="total-calc">Total = $<Odometer value={(this.props.currPrice * this.state.Qty).toFixed(2)} /> </div>
                        </div>
                        <button onClick={this.buyStock.bind(this)} className="buy-button">Buy</button>

                    </div>
                    <div className='errors-container'>{errors}</div>
                </div>
            </div>
        )
    }
};

export default StockGraph;