import React from 'react';
import { Link } from "react-router-dom"

class NavBar extends React.Component {
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
            <div className="nav-container">
                <div id="aa">Welcome! {this.props.currentUser.name}</div>
                <Link id="aa" className="text-4-links" to="/transactions">Transactions</Link>
                <Link id="aa" className="text-4-links" to="/">Portfolio</Link>
                <input id="aa" type="submit" className="sign-out" onClick={this.handleClick} value="Sign Out" />
            </div>

        )
    }
}

export default NavBar;