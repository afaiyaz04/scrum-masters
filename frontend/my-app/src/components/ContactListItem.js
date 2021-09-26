import React from "react";
import { CgProfile } from "react-icons/cg";

function ContactListItem(props) {
	const name = props.name
	const email = props.email
	return (
		<div className="list-item">
			<CgProfile></CgProfile>
			<div className="list-item__mid">
				<div className="list-item__name subheading">{name}</div>
				<div className="normaltext">{email}</div>
			</div>
		</div>
	);
}
export default ContactListItem;

