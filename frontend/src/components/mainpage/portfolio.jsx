import React from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts'
const key = process.env.IEXAPIKey;


const COLORS = ["#17b3c1", "#47d6b6", "#bff8d4", "#2794eb"]
const RADIAN = Math.PI / 180;
let Counter = 0;

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
        fill } = props;

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 15}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                label={renderCustomizedLabel}
            />
        </g>
    );
};

const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};



class Portfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allTransactions: null,
            livePrices: null,
            aggregatedStocks: null,
            activeIndex: null,
        }

    }

    componentDidMount() {
        this.props.fetchAllTrans(this.props.currentUser.id).then(() => {
            this.setState({ allTransactions: this.props.transactions })
        })
    }

    moneyFormat(price, sign = '$') { // formats the user's available funds. 
        const pieces = parseFloat(price).toFixed(2).split('')
        let ii = pieces.length - 3
        while ((ii -= 3) > 0) {
            pieces.splice(ii, 0, ',')
        }
        return sign + pieces.join('')
    }

    componentDidUpdate(prevProps) {
        if (prevProps.transactions.length !== this.props.transactions.length) {
            this.setState({ allTransactions: this.props.transactions })
        }
    }

    onPieEnter(data, index) {
        this.setState({
            activeIndex: index,
        });
    }

    // this function returns the quotes for all stocks in your portfolio in a batch call in order to get 
    // latest stock prices. 
    async findMultipleCompanies(arr) {
        if (this.state.livePrices === null || arr.length !== Object.values(this.state.livePrices).length) {
            arr = arr.join(",")
            const res = await fetch(`https://cloud.iexapis.com/v1/stock/market/batch?types=quote&symbols=${arr}&range=5y%20&token=${key}`)
            const res2 = await res.json()
            if (!res2.error) {
                this.setState({ livePrices: res2 })
            }
        }

    }

    renderTooltip({ payload }) {

        if (payload.length > 0) {

            return (
                <div className="graph-tooltip-cont">
                    <div className="tooltip-symbol">{payload[0].payload.symbol}</div>
                    <div>{((payload[0].payload.totalVal / Counter) * 100).toFixed(2) + "%"}</div>
                </div>
            )
        }

    }
    render() {
        let aggregatedStocks = {}
        let data = []
        let portfolioContent;
        let emptyOrTrue;
        if (this.state.allTransactions !== null) {
            this.state.allTransactions.forEach(stock => {
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
        Counter = 0

        if (this.state.livePrices && Object.keys(this.state.livePrices).length === Object.keys(aggregatedStocks).length) {
            portfolioContent = portfolioStocks.map((symbol, idx) => {
                let color;
                let currPrice;
                // let openPrice;
                let companyName;
                let direction;
                let pricePurchased = aggregatedStocks[symbol].amount
                currPrice = this.state.livePrices[symbol].quote.latestPrice
                // openPrice = this.state.livePrices[symbol].quote.open
                companyName = this.state.livePrices[symbol].quote.companyName
                let shares = aggregatedStocks[symbol].count
                let Profit = (shares * currPrice) - pricePurchased
                let currVal = (currPrice * shares)
                Counter += currVal
                if (Profit < 0) {
                    color = 'red'
                    direction = "down"
                } else if (Profit > 0) {
                    color = 'green'
                    direction = "up"
                } else if (Profit === 0) {
                    color = 'grey'
                    direction = 'right'
                }

                data.push({ totalVal: currVal, symbol: symbol })
                return (
                    <div key={idx} className="portfolio-stock-info-cont">
                        <div className={`currPrice-${color}`}>{symbol}</div>
                        <div className="company-name-port">{companyName}</div>
                        <div>{shares}</div>
                        <div className={`currPrice-${color}`}>
                            ${(currPrice * shares).toFixed(2)}
                            <div className="price-direction">
                                <div>({Profit.toFixed(2)})</div>
                                <div className={`arrow-${direction}`}></div>
                            </div>
                        </div>

                    </div>
                )
            })
        } else {
            this.findMultipleCompanies(Object.keys(aggregatedStocks))
        }
        if (this.props.currentUser.funds !== 5000) {
            emptyOrTrue = <div className="column-names-cont">
                <div>symbol</div>
                <div>company</div>
                <div>shares</div>
                <div>value</div>
            </div>
        } else {
            emptyOrTrue = <div className="no-stocks-text">You Currently Own No Stocks</div>
        }
        return (
            <div className="portfolio-container">
                <div className="port-val-total-text">Portfolio (<div className="money-counter">{this.moneyFormat(Counter)}</div>)</div>
                <div className="port-2-cont">
                    <PieChart width={720} height={360}>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            labelLine={false}
                            cx={360}
                            cy={150}
                            innerRadius={110}
                            outerRadius={140}

                            dataKey="totalVal"
                            onMouseEnter={this.onPieEnter.bind(this)}
                        >
                            {
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }

                        </Pie>
                        <Tooltip content={this.renderTooltip.bind(this)} />
                    </PieChart>
                    {emptyOrTrue}
                    <div>{portfolioContent}</div>
                </div>
            </div>
        )
    }
}

export default Portfolio;