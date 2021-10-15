import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { API, USER, ORDER, CLIENTS, ORDERS } from "./urlConfig";
import { List, Input, Card, Button, InputNumber, DatePicker } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/reduxConfig";
import ClientCard from "../components/ClientCard";
import AddProductForm from "../components/AddProductForm";

class AddOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: "Select Client from list",
            lineProducts: "",
            timeDue: "",
            totalFee: 0,
            status: "CREATED",
            description: "",
            log: "",

            contacts: [],
            initialOrderID: "",
        };
    }

    removeNull(array) {
        return array.filter((x) => x !== null);
    }

    initializeOrder = () => {
        const emptyOrder = {
            client: "615e66d22220e3f875485748", //dummy false id for initiation
            timeDue: Date.now(),
            totalFee: 0,
            description: "",
        };
        const path = API + ORDER;
        console.log(emptyOrder);
        axios.post(path, emptyOrder).then((res) => {
            console.log(res);
            this.setState({ initialOrderID: res.data._id });
        });
    };

    componentDidMount = async () => {
        this.initializeOrder();
        const endpoint = API + USER + "616211812b32244bfc3e1a2d" + CLIENTS;
        const response = await axios.get(endpoint).catch((err) => {
            console.log("ERR", err);
        });
        console.log(response);
        this.setState({ contacts: this.removeNull(response.data) });
    };

    setClientID = (data) => {
        this.setState({ client: data });
    };

    onOk = (value) => {
        const date = new Date(Date.parse(value));
        this.setState({ timeDue: date });
    };

    updateHandler = (order) => {
        const path = API + ORDER + this.state.initialOrderID;
        const path2 = API + USER + this.props.user._id + ORDERS;
        axios.patch(path, order).then((res) => {
            console.log(res);
            axios
                .post(path2, {
                    orderId: res.data._id,
                })
                .then((res) => {
                    console.log(res);
                });
        });
    };

    render() {
        return (
            <div className="Master-div">
                <Sidebar />
                <div className="contacts">
                    <Header
                        page="Add Orders"
                        addButton={false}
                        actions={this.addOrder}
                    ></Header>
                    <div className="Add-order">
                        <h2>Order Form</h2>
                        <div className="add-top">
                            <h2>List of Clients</h2>
                            <List
                                grid={{ gutter: 16, column: 4 }}
                                dataSource={this.state.contacts}
                                renderItem={(item) => (
                                    <ClientCard
                                        addButton={true}
                                        action={this.setClientID}
                                        client={item._id}
                                    ></ClientCard>
                                )}
                            />
                            ,
                        </div>
                        <div className="add-mid">
                            <h2>Add product</h2>
                            <AddProductForm
                                orderID={this.state.initialOrderID}
                            ></AddProductForm>
                        </div>

                        <h2>Input other detail</h2>
                        <Card>
                            <h3>Client:</h3>
                            <Input placeholder={this.state.client} />

                            <Input
                                placeholder="Order Description"
                                onChange={(e) =>
                                    this.setState({
                                        description: e.target.value,
                                    })
                                }
                            />
                            <DatePicker showTime onOk={this.onOk} />
                            <div className="horizontal">
                                <h3>Total Fee: </h3>
                                <br></br>
                                <InputNumber
                                    onChange={(value) => {
                                        this.setState({ totalFee: value });
                                    }}
                                    min={0}
                                    defaultValue={this.state.totalFee}
                                />{" "}
                            </div>
                            <Button
                                onClick={() => this.updateHandler(this.state)}
                            >
                                Submit
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddOrders);
//   createHandler = (newItem) => {
//     const path = API + CLIENT;
//     const path2 = API + USER + this.props.user._id + CLIENTS;
//     console.log(newItem);
//     axios.post(path, newItem).then((res) => {
//       console.log(res);
//       this.setState({
//         id: res.data._id,
//         editDetails: false,
//         addContact: false,
//       });
//       axios
//         .post(path2, {
//           clientId: this.state.id,
//         })
//         .then((res) => {
//           axios.get(path2).then((res) => {
//             console.log(res);
//             this.setState({ contacts: res.data });
//           });
//         });
//     });
//   };

//   updateHandler = (newItem) => {
//     const path = API + CLIENT + newItem.id;
//     const path2 = API + USER + this.props.user._id + CLIENTS;
//     axios.patch(path, newItem).then((res) => {
//       console.log(res);
//       this.setState({
//         nameFirst: res.nameFirst,
//         nameLast: res.nameLast,
//         title: res.title,
//         company: res.company,
//         email: res.email,
//         phoneNumber: res.phoneNumber,
//         address: res.address,

//         showDetails: false,
//         editDetails: false,
//       });
//     });
//     axios.get(path2).then((res) => {
//       console.log(res);
//       this.setState({ contacts: res.data });
//     });
//   };

//   deleteHandler = () => {
//     const path = API + USER + this.props.user._id + CLIENTS;
//     if (window.confirm("Are you sure you want to delete")) {
//       console.log(this.state.id);
//       axios
//         .delete(path, {
//           data: { clientId: this.state.id },
//         })
//         .then((res) => {
//           console.log(res);
//           axios.get(path).then((res) => {
//             console.log(res);
//             this.setState({
//               contacts: res.data,
//               id: "",
//               nameFirst: "",
//               nameLast: "",
//               title: "",
//               company: "",
//               email: "",
//               phoneNumber: "",
//               address: "",
//               showDetails: false,
//             });
//           });
//         });
//     }
//   };

//   activateAdd = () => {
//     this.setState({ addContact: true });
//   };

//   deactivateAdd = () => {
//     this.setState({ addContact: false });
//   };

//   removeNull(array) {
//     return array.filter((x) => x !== null);
//   }

//   render() {
//     let details;
//     if (this.state.showDetails) {
//       if (!this.state.editDetails) {
//         details = (
//           <div className="contents-right">
//             <Card
//               className="contact-details"
//               style={{ width: 300, height: 320 }}
//               actions={[
//                 <Button onClick={() => this.setState({ editDetails: true })}>
//                   Edit
//                 </Button>,
//                 <Button onClick={this.deleteHandler}>Delete</Button>,
//               ]}
//             >
//               <h2>Contact Details</h2>
//               <div className="list-item-details">
//                 <h3>First Name: {this.state.nameFirst}</h3>
//                 <h3>Last Name: {this.state.nameLast}</h3>
//                 <h3>Title: {this.state.title}</h3>
//                 <h3>Company: {this.state.company}</h3>
//                 <h3>Email: {this.state.email}</h3>
//                 <h3>Phone: {this.state.phoneNumber}</h3>
//                 <h3>Address: {this.state.address}</h3>
//               </div>
//             </Card>
//           </div>
//         );
//       } else {
//         details = (
//           <div className="contents-right">
//             <Card
//               style={{ width: 300, height: 600 }}
//               actions={[
//                 <Button onClick={() => this.updateHandler(this.state)}>
//                   Update
//                 </Button>,
//               ]}
//             >
//               <h2>Contact Details</h2>
//               <div className="list-item-details">
//                 <Input
//                   placeholder={this.state.nameFirst}
//                   onChange={(e) => this.setState({ nameFirst: e.target.value })}
//                 />
//                 <Input
//                   placeholder={this.state.nameLast}
//                   onChange={(e) => this.setState({ nameLast: e.target.value })}
//                 />
//                 <Input
//                   placeholder={this.state.title}
//                   onChange={(e) => this.setState({ title: e.target.value })}
//                 />
//                 <Input
//                   placeholder={this.state.company}
//                   onChange={(e) => this.setState({ company: e.target.value })}
//                 />
//                 <Input
//                   placeholder={this.state.email}
//                   onChange={(e) => this.setState({ email: e.target.value })}
//                 />
//                 <Input
//                   placeholder={this.state.phoneNumber}
//                   onChange={(e) =>
//                     this.setState({ phoneNumber: e.target.value })
//                   }
//                 />
//                 <Input
//                   placeholder={this.state.address}
//                   onChange={(e) => this.setState({ address: e.target.value })}
//                 />
//               </div>
//             </Card>
//           </div>
//         );
//       }
//     }
//     return (
//       <div className="Master-div">
//         <Sidebar />
//         <div className="contacts">
//           <Header page="Contacts" actions={this.activateAdd}></Header>
//           <div className="contents">
//             <div className="contents-left">
//               <span>Name</span>
//               <List
//                 itemLayout="horizontal"
//                 dataSource={this.removeNull(this.state.contacts)}
//                 renderItem={(item) => (
//                   <List.Item
//                     className="contact-item"
//                     key={item.id}
//                     actions={[
//                       <Button
//                         type="dashed"
//                         block
//                         onClick={() =>
//                           this.setState({
//                             id: item._id,
//                             nameFirst: item.nameFirst,
//                             nameLast: item.nameLast,
//                             title: item.title,
//                             company: item.company,
//                             email: item.email,
//                             phoneNumber: item.phoneNumber,
//                             address: item.address,
//                             showDetails: true,
//                           })
//                         }
//                       >
//                         Details
//                       </Button>,
//                     ]}
//                   >
//                     <List.Item.Meta
//                       title={`${item.nameFirst} ${item.nameLast}`}
//                       description={item.email}
//                       avatar={<CgProfile />}
//                     />
//                   </List.Item>
//                 )}
//               />
//             </div>
//             {details}
//           </div>
//           <AddContactForm
//             trigger={this.state.addContact}
//             actions={this.deactivateAdd}
//             createAction={this.createHandler}
//           ></AddContactForm>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps)(Orders);
