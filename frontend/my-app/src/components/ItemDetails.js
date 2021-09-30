import React, { useState } from 'react';
import { Input } from 'antd';
import axios from 'axios';

const updateHandler = (path, newItem) => {
    axios.patch(path, newItem)
}

function ItemDetails(props) {
    const Item = props.item;
    const path = props.path;
    const [details, setDetails] = useState(props.details);

    return (
        <div className='contents-right'>
            <h2>{Item} Details</h2>
            <div className="list-item-details">
                { Object.keys(details).map(key => (<Input placeholder={ details[key] } onChange={(e) => setDetails({ ...details, key: e.target.value })} />)) }
            </div>
            <div className='edit-btns'>
                <button onClick={() => alert(`${details['First Name']}`)}>Update</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default ItemDetails