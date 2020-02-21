import React from 'react';
import Portfolio from "./portfolio"
import Cash from "./cash_container"

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
                <input type="submit" onClick={this.handleClick} value="Sign Out" />
                <Portfolio />
                <Cash />
            </div>
        )
    }
}

export default MainPage;