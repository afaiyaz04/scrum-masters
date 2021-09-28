import React from 'react'
import Sidebar from "../components/sideBar/Sidebar";
import Header from '../components/Header';
import ContactListItem from '../components/ContactListItem';
import ItemDetails from '../components/ItemDetails';
import axios from 'axios';

export default class Contacts extends React.Component{
    state = {
        contacts: []
    }

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
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
                        <ul>
                            {this.state.contacts.map(contacts => <ContactListItem name={contacts.name} email={contacts.email}></ContactListItem>)}
                        </ul>
                    </div>
                    <ItemDetails item='Contact' type='Contact' details='Ahbab 04575757223 ScrumMaster'></ItemDetails>
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