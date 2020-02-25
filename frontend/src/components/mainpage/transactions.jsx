import React from 'react';
import NavBar from '../mainpage/navbar_container'

class TransactionPage extends React.Component {

    componentDidMount() {
        this.props.fetchAllTrans(this.props.currentUser.id).then(() => {
            this.setState({ allTransactions: this.props.transactions })
        })
    }

    render() {
        let allTransactions;
        if (this.props.transactions.length > 0) {
            allTransactions = this.props.transactions.map(transaction => {
                return (
                    <div className="transaction-detail-text">
                        <div>{transaction.transaction_type.toUpperCase()}</div>
                        <div>({transaction.symbol})</div>
                        <div> - {transaction.stock_count + "Shares"}</div>
                        <div>{"@" + transaction.amount}</div>
                    </div>
                )
            })
        }
        return (
            <div className="transactions-container">
                <NavBar />
                <div className="transaction-title-text">Transactions</div>
                {allTransactions}
            </div>
        )
    }
}

export default TransactionPage;