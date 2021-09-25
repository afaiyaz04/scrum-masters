import React from 'react'

function ItemDetails(props) {
    const Item = props.item;
    const type = props.type;
    const details = props.details;
    return (
        <div className='contents-right'>
            <h2>{Item} Details</h2>
            <div className="list-item-details">
                <h3>Type: {type} </h3> 
                <h3>Details: {details} </h3>
            </div>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}

export default ItemDetails