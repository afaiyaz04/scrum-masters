import React from 'react'
import Sidebar from "../components/sideBar/Sidebar";
import Header from '../components/Header';
import ItemDetails from '../components/ItemDetails';
import { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../redux/reduxConfig';

class Contracts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: "placeholder",
        };
    }
    render() {
        return (
            <div className='Master-div'>
                <Sidebar />
                <div className='contacts'>
                    <Header page='Contract'></Header>
                    {/* <div className='line'></div> */}
                    <div className='contents'>
                        <div className='contents-left'>
                        </div>
                        <ItemDetails item='Contract' type='Contract' details={this.props.user._id} ></ItemDetails>
                    </div>
                </div>
            </div>
        )

    }

}

export default connect(mapStateToProps)(Contracts);