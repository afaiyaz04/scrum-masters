import React from "react";
import { useDispatch } from "react-redux";
import { setContact } from "../redux/Contact/contact.actions";
import { Card } from "antd";
import "antd/dist/antd.css";

function ContactListItem(props) {
  const dispatch = useDispatch();
  const contact = props.contact;
  const email = props.contact.email;
  const handleClick = (contact) => {
    dispatch(setContact(contact));
    console.log("I AM PRESSED");
  };
  return (
    // <div onClick={() => handleClick(contact)} className="list-item">
    //   <CgProfile></CgProfile>
    //   <div className="list-item__mid">
    //     <div className="list-item__name subheading">{contact.name}</div>
    //     <div className="normaltext">{email}</div>
    //   </div>
    // </div>

    <Card
      className="contact-card"
      size="small"
      title={contact.name}
      extra={
        /*<a href="#">Details</a>*/ <button
          onClick={() => handleClick(contact)}
        >
          Details
        </button>
      }
      style={{ width: 300, marginBottom: 20 }}
    >
      <p>{email}</p>
    </Card>
  );
}
export default ContactListItem;
