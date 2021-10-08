import React, { useState, useEffect } from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import { List, Input, Card, Button } from "antd";
import "antd/dist/antd.css";
import AddContactForm from "../components/AddContactForm";
import { useSelector, useDispatch } from "react-redux";
import { createContact, deleteContact, fetchContacts, updateContact } from "../redux/Contact/contact.actions";

function Contacts() {
  const [contact, setContact] = useState({
    id: "",
    nameFirst: "",
    nameLast: "",
    title: "",
    company: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [showDetails, setShowDetails] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const userId = JSON.parse(localStorage.getItem('userData'))._id;

  useEffect(() => {
    dispatch(fetchContacts(userId));
  });

  const createHandler = (newItem) => {
    setAddContact(false);
    dispatch(createContact(userId, newItem));
  };

  const updateHandler = (newItem) => {
    setShowDetails(false);
    setEditDetails(false);
    dispatch(updateContact(contact.id, newItem));
  };

  const deleteHandler = (userId, clientId) => {
    setShowDetails(false);
    dispatch(deleteContact(userId, clientId));
  };

  const removeNull = (array) => {
    return array.filter((x) => x !== null);
  }

  return (
    <div className="Master-div">
      <Sidebar />
      <div className="contacts">
        <Header page="Contacts" actions={() => setAddContact(true)}></Header>
        <div className="contents">
          <div className="contents-left">
            <span>Name</span>
            <List
              itemLayout="horizontal"
              dataSource={removeNull(contacts)}
              renderItem={(item) => (
                <List.Item
                  className="contact-item"
                  key={item.id}
                  actions={[
                    <Button
                      type="dashed"
                      block
                      onClick={() => {
                          setShowDetails(true);
                          setContact({
                            id: item._id,
                            nameFirst: item.nameFirst,
                            nameLast: item.nameLast,
                            title: item.title,
                            company: item.company,
                            email: item.email,
                            phoneNumber: item.phoneNumber,
                            address: item.address
                          })
                        }
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
            showDetails && !editDetails &&
            <div className="contents-right">
              <Card
                className="contact-details"
                style={{ width: 300, height: 320 }}
                actions={[
                  <Button onClick={() => setEditDetails(true)}>
                    Edit
                  </Button>,
                  <Button onClick={() => deleteHandler(userId, contact.id)}>Delete</Button>,
                ]}
              >
                <h2>Contact Details</h2>
                <div className="list-item-details">
                  <h3>First Name: {contact.nameFirst}</h3>
                  <h3>Last Name: {contact.nameLast}</h3>
                  <h3>Title: {contact.title}</h3>
                  <h3>Company: {contact.company}</h3>
                  <h3>Email: {contact.email}</h3>
                  <h3>Phone: {contact.phoneNumber}</h3>
                  <h3>Address: {contact.address}</h3>
                </div>
              </Card>
            </div>
          }
          {
            showDetails && editDetails &&
            <div className="contents-right">
              <Card
                style={{ width: 300, height: 600 }}
                actions={[
                  <Button onClick={() => updateHandler(contact)}>
                    Update
                  </Button>,
                ]}
              >
                <h2>Contact Details</h2>
                <div className="list-item-details">
                  <Input
                    placeholder={contact.nameFirst}
                    onChange={(e) => setContact({ ...contact, nameFirst: e.target.value })}
                  />
                  <Input
                    placeholder={contact.nameLast}
                    onChange={(e) => setContact({ ...contact, nameLast: e.target.value })}
                  />
                  <Input
                    placeholder={contact.title}
                    onChange={(e) => setContact({ ...contact, title: e.target.value })}
                  />
                  <Input
                    placeholder={contact.company}
                    onChange={(e) => setContact({ ...contact, company: e.target.value })}
                  />
                  <Input
                    placeholder={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                  <Input
                    placeholder={contact.phoneNumber}
                    onChange={(e) => setContact({ ...contact, phoneNumber: e.target.value })}
                  />
                  <Input
                    placeholder={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  />
                </div>
              </Card>
            </div>
          }
        </div>
        <AddContactForm
          trigger={addContact}
          actions={() => setAddContact(false)}
          createAction={createHandler}
        ></AddContactForm>
      </div>
    </div>
  );
}

export default Contacts;
