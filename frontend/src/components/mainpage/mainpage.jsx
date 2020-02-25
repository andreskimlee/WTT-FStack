import React from 'react';
import Portfolio from "./portfolio_container"
import Cash from "./cash_container"
import { Link } from "react-router-dom"
import NavBar from '../../components/mainpage/navbar_container'

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
                <NavBar />
                <div className="mid-container">
                    <Portfolio />
                    <Cash />
                </div>
            </div>
        )
    }
}

export default MainPage;