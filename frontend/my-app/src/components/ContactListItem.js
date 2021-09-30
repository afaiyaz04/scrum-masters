import React from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from 'react-redux';
import { setContact } from "../redux/Contact/contact.actions";

function ContactListItem(props) {
	const dispatch = useDispatch();
	const contact = props.contact
	const email = props.contact.email
	const handleClick = (contact) => {
		dispatch(setContact(contact));
	};
	return (

		<div onClick={() => handleClick(contact)} className="list-item">
			<CgProfile></CgProfile>
			<div className="list-item__mid">
				<div className="list-item__name subheading">{contact.name}</div>
				<div className="normaltext">{email}</div>
			</div>
		</div>
	);
}
export default ContactListItem;