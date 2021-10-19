import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { List, Button, Avatar } from "antd";
import {
    createContact,
    deleteContact,
    favouriteClient,
    fetchContacts,
    updateContact,
} from "../redux/Contact/contact.actions";
import ClientForm from "../components/ClientForm";
import { connect } from "react-redux";
import "./Contact.css";

const initialContact = {
    id: null,
    nameFirst: null,
    nameLast: null,
    title: null,
    company: null,
    email: null,
    phoneNumber: null,
    address: null,
    profilePic:
        "https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png",
    favourite: false,
};

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: initialContact,

            showDetails: false,
            addContact: false,

            userId: JSON.parse(localStorage.getItem("userData"))._id,
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchContacts(this.state.userId));
    }

    createHandler = (newItem) => {
        this.setState({ addContact: false });
        this.props.dispatch(createContact(this.state.userId, newItem));
    };

    updateHandler = (newItem) => {
        this.props.dispatch(updateContact(this.state.contact.id, newItem));
    };

    deleteHandler = (clientId) => {
        this.setState({ showDetails: false });
        this.props.dispatch(deleteContact(this.state.userId, clientId));
    };

    favouriteHandler = (clientId, isFav) => {
        this.props.dispatch(favouriteClient(clientId, isFav));
    };

    render() {
        return (
            <div className="Master-div">
                <Sidebar />
                <div className="contacts">
                    <Header
                        page="Contacts"
                    />
                    <div className="contents">
                        <div className="contents-left">
                            <List
                                header={
                                    <h3>
                                        <span className="content-header">
                                            Name
                                        </span>
                                        <Button
                                            className="header-btn"
                                            size="large"
                                            icon={<AiOutlinePlus/>}
                                            onClick={() => {
                                                this.setState({
                                                    addContact: true,
                                                    showDetails: false,
                                                    contact: initialContact,
                                                })
                                            }}
                                        />
                                    </h3>
                                }
                                itemLayout="horizontal"
                                dataSource={this.props.contacts.sort((a, b) => {
                                    if (a.fav && !b.fav) {
                                        return -1;
                                    } else if (b.fav && !a.fav) {
                                        return 1;
                                    } else {
                                        return a.nameFirst.localeCompare(
                                            b.nameFirst
                                        );
                                    }
                                })}
                                renderItem={(item) => (
                                    <List.Item
                                        className="contact-item"
                                        key={item.id}
                                        actions={[
                                            <>
                                                {item.fav && (
                                                    <FaStar
                                                        className="fav"
                                                        color="orange"
                                                        onClick={() => {
                                                            this.favouriteHandler(
                                                                item._id,
                                                                false
                                                            );
                                                        }}
                                                        onMouseEnter={({
                                                            target,
                                                        }) =>
                                                            (target.style.color =
                                                                "grey")
                                                        }
                                                        onMouseLeave={({
                                                            target,
                                                        }) =>
                                                            (target.style.color =
                                                                "orange")
                                                        }
                                                    />
                                                )}
                                                {!item.fav && (
                                                    <FaRegStar
                                                        className="fav"
                                                        color="grey"
                                                        onClick={() => {
                                                            this.favouriteHandler(
                                                                item._id,
                                                                true
                                                            );
                                                        }}
                                                        onMouseEnter={({
                                                            target,
                                                        }) =>
                                                            (target.style.color =
                                                                "orange")
                                                        }
                                                        onMouseLeave={({
                                                            target,
                                                        }) =>
                                                            (target.style.color =
                                                                "grey")
                                                        }
                                                    />
                                                )}
                                            </>,
                                            <Button
                                                className="general-btn"
                                                onClick={() =>
                                                    this.setState({
                                                        showDetails: true,
                                                        addContact: false,
                                                        contact: {
                                                            id: item._id,
                                                            nameFirst:
                                                                item.nameFirst,
                                                            nameLast:
                                                                item.nameLast,
                                                            title: item.title,
                                                            company:
                                                                item.company,
                                                            email: item.email,
                                                            phoneNumber:
                                                                item.phoneNumber,
                                                            address:
                                                                item.address,
                                                            profilePic:
                                                                item.profilePic,
                                                        },
                                                    })
                                                }
                                            >
                                                Details
                                            </Button>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={`${item.nameFirst} ${item.nameLast}`}
                                            description={item.email}
                                            avatar={
                                                <Avatar
                                                    src={item.profilePic}
                                                    referrerPolicy="no-referrer"
                                                />
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                        {(this.state.showDetails || this.state.addContact) && (
                            <div className="contents-right">
                                <ClientForm
                                    contact={this.state.contact}
                                    addContact={this.state.addContact}
                                    showDetails={this.state.showDetails}
                                    updateAction={this.updateHandler}
                                    deleteAction={this.deleteHandler}
                                    createAction={this.createHandler}
                                    closeAction={() =>
                                        this.setState({
                                            addContact: false,
                                            showDetails: false,
                                        })
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
    };
};

export default connect(mapStateToProps)(Contacts);
