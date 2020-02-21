import React from 'react';
import SignUpContainer from './signup_form_container';

class SessionPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className='session-page'>
                <p>
                You are currently not signed in.

                </p>
                <SignUpContainer></SignUpContainer>
            </div>
        )
    }
}

export default SessionPage;