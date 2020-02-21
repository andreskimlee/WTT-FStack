import React from 'react';


class Cash extends React.Component {
    constructor(props) {
        super(props)
    }

    moneyFormat(price, sign = '$') {
        const pieces = parseFloat(price).toFixed(2).split('')
        let ii = pieces.length - 3
        while ((ii -= 3) > 0) {
            pieces.splice(ii, 0, ',')
        }
        return sign + pieces.join('')
    }


    render() {
        let funds = this.moneyFormat(this.props.currentUser.funds)
        return (
            <div className="cash-container">
                <div>Available Cash - {funds}</div>
                <form>
                    <input type="text" placeholder="Ticker" />
                    <input type="text" placeholder="Qty" />
                    <input type="submit" value="buy" />
                </form>
            </div>
        )
    }
}

export default Cash;