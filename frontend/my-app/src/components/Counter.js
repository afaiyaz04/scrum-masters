import React from 'react'
import { connect } from 'react-redux'

class Counter extends React.Component {
    increment = () => { };
    decrement = () => {
    };
    render(props) {
        return (
            <div className='counter'>
                <h2>Counter</h2>
                <div>
                    <button onClick={this.decrement}>&ndash;</button>
                    <span className="count">{this.props.count}</span>
                    <button onClick={this.increment}>+</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    count: state.count,
});

export default connect(mapStateToProps)(Counter);