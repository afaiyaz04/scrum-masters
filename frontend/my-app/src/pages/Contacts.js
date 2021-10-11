import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import { List, Button } from "antd";
import "antd/dist/antd.css";
import { createContact, deleteContact, fetchContacts, updateContact } from "../redux/Contact/contact.actions";
import ClientForm from "../components/ClientForm";
import { connect } from "react-redux";

const initialContact = {
  id: "",
  nameFirst: "",
  nameLast: "",
  title: "",
  company: "",
  email: "",
  phoneNumber: "",
  address: "",
}

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: initialContact,

      showDetails: false,
      addContact: false,

      userId: JSON.parse(localStorage.getItem('userData'))._id
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchContacts(this.state.userId));
  }

  createHandler = (newItem) => {
    this.setState({ addContact: false });
    this.props.dispatch(createContact(this.state.userId, newItem));
  };

  updateHandler = (newItem) => {
    this.setState({ showDetails: false });
    this.props.dispatch(updateContact(this.state.contact.id, newItem));
  };

  deleteHandler = (clientId) => {
    this.setState({ showDetails: false });
    this.props.dispatch(deleteContact(this.state.userId, clientId));
  };

  render () {
    return (
      <div className="Master-div">
        <Sidebar />
        <div className="contacts">
          <Header
            page="Contacts"
            actions={() => {
              this.setState({ addContact: true, showDetails: false, contact: initialContact })
            }}
          />
          <div className="contents">
            <div className="contents-left">
              <span>Name</span>
              <List
                itemLayout="horizontal"
                dataSource={this.props.contacts}
                renderItem={(item) => (
                  <List.Item
                    className="contact-item"
                    key={item.id}
                    actions={[
                      <Button
                        type="dashed"
                        block
                        onClick={() => 
                          this.setState({ showDetails: true, addContact: false, contact: {
                            id: item._id,
                            nameFirst: item.nameFirst,
                            nameLast: item.nameLast,
                            title: item.title,
                            company: item.company,
                            email: item.email,
                            phoneNumber: item.phoneNumber,
                            address: item.address
                          }})
                        }
                      >
                        Details
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${item.nameFirst} ${item.nameLast}`}
                      description={item.email}
                      avatar={<CgProfile />}
                    />
                  </List.Item>
                )}
              />
            </div>
            {
              (this.state.showDetails || this.state.addContact) &&
              <div className="contents-right">
                <ClientForm
                  contact={ this.state.contact }
                  addContact={ this.state.addContact }
                  showDetails={ this.state.showDetails }
                  updateAction={ this.updateHandler }
                  deleteAction={ this.deleteHandler }
                  createAction={ this.createHandler }
                  closeAction={() => this.setState({ addContact: false, showDetails: false })}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(Contacts);