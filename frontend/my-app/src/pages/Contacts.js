import React, { useState, useEffect } from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import { List, Input, Card, Button } from "antd";
import "antd/dist/antd.css";
import { useSelector, useDispatch } from "react-redux";
import { createContact, deleteContact, fetchContacts, updateContact } from "../redux/Contact/contact.actions";
import ClientForm from "../components/ClientForm";

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

function Contacts() {
  const [contact, setContact] = useState(initialContact);
  const [showDetails, setShowDetails] = useState(false);
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
    dispatch(updateContact(contact.id, newItem));
  };

  const deleteHandler = (userId, clientId) => {
    setShowDetails(false);
    dispatch(deleteContact(userId, clientId));
  };

  const closeFormHandler = () => {
    setShowDetails(false);
    setAddContact(false);
  }

  const removeNull = (array) => {
    return array.filter((x) => x !== null);
  }

  return (
    <div className="Master-div">
      <Sidebar />
      <div className="contacts">
        <Header
          page="Contacts"
          actions={() => {
            setAddContact(true);
            setShowDetails(false);
            setContact(initialContact)
          }}
        />
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
                          setAddContact(false);
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
            (showDetails || addContact) &&
            <div className="contents-right">
              <ClientForm
                contact={contact}
                addContact={addContact}
                showDetails={showDetails}
                updateAction={updateHandler}
                deleteAction={deleteHandler}
                createAction={createHandler}
                closeAction={closeFormHandler}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Contacts;
