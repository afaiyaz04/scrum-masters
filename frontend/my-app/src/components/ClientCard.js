import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { fetchContacts } from "../redux/Contact/contact.actions";
import { fetchClient, fetchClients } from "../redux/api";

class ClientCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      showDetails: false,
    };
  }
  componentDidMount = async () => {
    const client = await fetchClient(this.props.client);
    this.setState({ client: client.data });
  };

  render() {
    const client = this.state.client;
    const client2 = this.props.client;
    if (client._id != client2) {
      this.componentDidMount();
    }
    let details;
    if (this.state.showDetails) {
      details = (
        <div className="contact-popup">
          <h6>ID: {client._id}</h6>
          <h4>Email: {client.email}</h4>
          <h4>Phone: {client.phoneNumber}</h4>
        </div>
      );
    }
    const addButton = this.props.addButton;

    return (
      <div
        onClick={() => this.setState({ showDetails: !this.state.showDetails })}
        className="list-item"
      >
        <h4>
          {client.nameFirst} {client.nameLast}
          {"  "}
          {addButton ? (
            <button onClick={() => this.props.action(client._id)}>+</button>
          ) : (
            ""
          )}
        </h4>

        {details}
      </div>
    );
  }
}

ClientCard.defaultProps = {
  addButton: false,
};
export default ClientCard;
