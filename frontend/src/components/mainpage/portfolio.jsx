import React from 'react';

class Portfolio extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        debugger
        this.props.fetchAllTrans(this.props.currentUser.id)
    }


    render() {

        return (
            <div className="portfolio-container">
                <div>Portfolio</div>
            </div>
        )
    }
}

export default Portfolio;