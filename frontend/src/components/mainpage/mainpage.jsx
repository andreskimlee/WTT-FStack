import React from 'react';
import Portfolio from "./portfolio"
import Cash from "./cash_container"
import { Link } from "react-router-dom"

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.props = props
    }

    handleClick(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {

        return (
            <div className="mainpage-container">
                <div className="nav-container">
                    <div id="aa">Welcome! {this.props.currentUser.name}</div>
                    <Link id="aa" className="text-4-links" to="/transactions">Transactions</Link>
                    <Link id="aa" className="text-4-links" to="/portfolio">Portfolio</Link>
                    <input id="aa" type="submit" className="sign-out" onClick={this.handleClick} value="Sign Out" />
                </div>
                <div className="mid-container">
                    <Portfolio />
                    <Cash />
                </div>
            </div>
        )
    }
}

export default MainPage;