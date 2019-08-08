import React, { Component } from 'react'

import { connect } from 'react-redux'





class AdminItem extends Component {

    state = {

        first_name: '',
        last_name: '',
        email_address: '',
        phone_number: '',
        comments: '',

    }



    render() {
        return (
                
            <div>
                <h2>item test</h2>
            </div>
            

         

        )
    }
}

export default connect()(AdminItem);