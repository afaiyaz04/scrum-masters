import React from 'react';
import Sidebar from "../components/sideBar/Sidebar";
import Header from '../components/Header';
import { CgProfile, CgMenu } from "react-icons/cg";
import axios from 'axios';
import { List, Input } from 'antd';
import 'antd/dist/antd.css';

export default class Contacts extends React.Component{
    state = {
        contacts: [],

        id: '',
        nameFirst: '',
        nameLast: '',
        title: '',
        company: '',
        email: '',
        phoneNumber: '',
        address: ''
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/user/614180facb6259ce3427029f/clients`)
            .then(res => {
                console.log(res)
                this.setState({contacts: res.data});
            })
    }

    updateHandler = (newItem) => {
        axios.patch(`http://localhost:5000/client/${newItem.id}`, newItem)
        .then(res => {
            console.log(res)
            this.setState({
                nameFirst: res.nameFirst,
                nameLast: res.nameLast,
                title: res.title,
                company: res.company,
                email: res.email,
                phoneNumber: res.phoneNumber,
                address: res.address
            });
        })
        axios.get(`http://localhost:5000/user/614180facb6259ce3427029f/clients`)
            .then(res => {
                console.log(res)
                this.setState({contacts: res.data});
            })
    }

    render() {
        return (
            <div className='Master-div'>
            <Sidebar />
            <div className='contacts'>
                <Header page='Contacts'></Header>
                {/* <div className='line'></div> */}
                <div className='contents'>
                    <div className='contents-left'>
                        <h3>Name</h3>
                        <List
                            itemLayout='horizontal'
                            dataSource={this.state.contacts}
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                    actions={
                                        [<CgMenu
                                            onClick={() => this.setState({
                                                id: item._id,
                                                nameFirst: item.nameFirst,
                                                nameLast: item.nameLast,
                                                title: item.title,
                                                company: item.company,
                                                email: item.email,
                                                phoneNumber: item.phoneNumber,
                                                address: item.address
                                            })}
                                        />]
                                    }
                                >
                                    <List.Item.Meta
                                        title={ `${item.nameFirst} ${item.nameLast}` }
                                        description={item.email}
                                        avatar={<CgProfile/>}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                    <div className='contents-right'>
                        <h2>Contact Details</h2>
                        <div className="list-item-details">
                            <Input placeholder={ this.state.nameFirst } onChange={(e) => this.setState({ nameFirst: e.target.value })} />
                            <Input placeholder={ this.state.nameLast } onChange={(e) => this.setState({ nameLast: e.target.value })} />
                            <Input placeholder={ this.state.title } onChange={(e) => this.setState({ title: e.target.value })} />
                            <Input placeholder={ this.state.company } onChange={(e) => this.setState({ company: e.target.value })} />
                            <Input placeholder={ this.state.email } onChange={(e) => this.setState({ email: e.target.value })} />
                            <Input placeholder={ this.state.phoneNumber } onChange={(e) => this.setState({ phoneNumber: e.target.value })} />
                            <Input placeholder={ this.state.address } onChange={(e) => this.setState({ address: e.target.value })} />
                        </div>
                        <div className='edit-btns'>
                            <button onClick={() => this.updateHandler(this.state)}>Update</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

// function Contacts() {
//     return (
//         <div className='Master-div'>
//             <Sidebar />
//             <div className='contacts'>
//                 <Header page='Contact'></Header>
//                 <div className='line'></div>
//                 <div className='contents'>
//                     <div className='contents-left'>
//                         <h2>Name</h2>
//                         <ContactListItem name='Ahbab Faiyaz' email='gmail.com'></ContactListItem>
//                         <ContactListItem name='Alex' email='hotmail.com'></ContactListItem>
//                         <ContactListItem name='Saleh' email='scrum.com'></ContactListItem>
//                     </div>
//                     <ItemDetails item='Contact' type='Contact' details='Ahbab 04575757223 ScrumMaster'></ItemDetails>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Contacts