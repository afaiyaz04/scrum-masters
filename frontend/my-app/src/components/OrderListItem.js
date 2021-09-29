import React from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";

function ContactListItem(props) {
	const order = props.order
	const endpoint = "http://localhost:5000/client/" + order.client

	const componentDidMount = async () => {
		const response = await axios
			.get(endpoint)
			.catch((err) => {
				console.log("ERR", err);
			});
		console.log(response);
	};
	componentDidMount();

	return (
		<div className="list-item">
			<CgProfile></CgProfile>
			<div className="list-item__mid">
				<div className="list-item__name subheading">{endpoint}</div>
				<div className="normaltext">email</div>
			</div>
		</div>
	);
}
export default ContactListItem;

