import React from "react";
import axios from "axios";
import { useEffect } from "react";

class ClientCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      showDetails: false,
    };
  }
  componentDidMount = async () => {
    const endpoint = "http://localhost:5000/client/" + this.props.client;
    const response = await axios.get(endpoint).catch((err) => {
      console.log("ERR", err);
    });
    console.log(response);
    this.setState({ client: response.data });
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
          <h6>{client._id}</h6>
          <h4>{client.email}</h4>
          <h4>{client.phoneNumber}</h4>
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
