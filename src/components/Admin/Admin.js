import React, { Component } from 'react'
import { connect } from 'react-redux'

class Admin extends Component {

    componentDidMount() {
        console.log('test');
        this.props.dispatch({ type: 'FETCH_COMMENTS' })

    }

    render() {
        return (
            <div>
                <h1>admin</h1>
                <pre>{JSON.stringify(this.props.reduxState.userComments, null, 2)}</pre>
                {/* {this.props.reduxState.userComments && this.props.reduxState.userComments.map(comments => <p key={comments.id}>{comments.first_name}</p>)} */}git 
            </div>
        )
    }
}


const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(Admin);