import React from "react";
import axios from "axios";

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
    let details;
    if (this.state.showDetails) {
      details = (
        <div className="contact-popup">
          <h4>{client.email}</h4>
          <h4>{client.phoneNumber}</h4>
        </div>
      );
    }

    return (
      <div
        onClick={() => this.setState({ showDetails: !this.state.showDetails })}
        className="list-item"
      >
        <h4>
          {client.nameFirst} {client.nameLast}
        </h4>
        {details}
      </div>
    );
  }
}
export default ClientCard;
