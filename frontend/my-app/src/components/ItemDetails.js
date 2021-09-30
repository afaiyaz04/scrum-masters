import React from 'react'
import { mapStateToProps } from '../redux/reduxConfig';
import { connect } from 'react-redux';
import { Component } from 'react';


class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: "placeholder",
        };
    }
    render() {
        const contact = this.props.contact;
        return (
            <div className='contents-right'>
                <h2>Contact Details</h2>
                <div className="list-item-details">
                    <h3>name: {contact.name}</h3>
                    <h3>email: {contact.email}</h3>
                    <h3>phone: {contact.phone}</h3>
                </div>
                <div className='edit-btns'>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        )

    }

}

export default connect(mapStateToProps)(ItemDetails);
