import React, { useEffect } from 'react';
import Sidebar from "../components/sideBar/Sidebar";
import Header from '../components/Header';
import ItemDetails from '../components/ItemDetails';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setOrder } from '../redux/Order/order.actions';
import OrderListItem from '../components/OrderListItem';
// import { API, USER, ORDERS } from './urlConfig';

function Orders() {
    const orders = useSelector((state) => state.orderState);
    const dispatch = useDispatch();

    const fetchOrder = async () => {
        // const endpoint = API + 
        const response = await axios
            .get("http://localhost:5000/user/614180facb6259ce3427029f/orders")
            .catch((err) => {
                console.log("ERR", err);
            });
        dispatch(setOrder(response.data));
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <div className='Master-div'>
            <Sidebar />
            <div className='contacts'>
                <Header page='Orders'></Header>
                {/* <div className='line'></div> */}
                <div className='contents'>
                    <div className='contents-left'>
                        <ul>
                            {orders.map(order => <OrderListItem order={order}></OrderListItem>)}
                        </ul>
                    </div>
                    <ItemDetails item='Order' type='Orders' details='Order Number- 0000' ></ItemDetails>
                </div>
            </div>
        </div>

    )
}

export default Orders