import React from "react";
import "./AddContactForm.css";
import { List, Input, Card, Button } from "antd";
import { API, CLIENTS, USER } from "../pages/urlConfig";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/reduxConfig";

class AddOrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientID: "Select Client from list",
            lineProducts: "",
            timePlaced: "",
            timeDue: "",
            totalFee: "",
            status: "",
            description: "",
            log: "",
            contacts: [],

            userId: JSON.parse(localStorage.getItem("userData"))._id,
        };
    }

    componentDidMount = async () => {
        const endpoint = API + USER + this.state.userId + CLIENTS;
        const response = await axios.get(endpoint).catch((err) => {
            console.log("ERR", err);
        });
        console.log(response);
        this.setState({ contacts: response.data });
    };

    removeNull(array) {
        return array.filter((x) => x !== null);
    }

    render() {
        return this.props.trigger ? (
            <div className="popup">
                <div className="inner">
                    <button onClick={this.props.actions}>Close</button>

                    <Card>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.removeNull(this.state.contacts)}
                            renderItem={(item) => (
                                <List.Item
                                    className="contact-item"
                                    key={item.id}
                                    actions={[
                                        <Button
                                            type="dashed"
                                            block
                                            onClick={() =>
                                                this.setState({
                                                    clientID: item._id,
                                                })
                                            }
                                        >
                                            Select
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={`${item.nameFirst} ${item.nameLast}`}
                                    />
                                </List.Item>
                            )}
                        />
                        <Input placeholder={this.state.clientID} />
                        <Input
                            placeholder="Time Due"
                            onChange={(e) =>
                                this.setState({ timeDue: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Total Fee"
                            onChange={(e) =>
                                this.setState({ totalFee: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Description"
                            onChange={(e) =>
                                this.setState({ description: e.target.value })
                            }
                        />
                        <Button
                            onClick={() => this.props.createAction(this.state)}
                        >
                            Submit
                        </Button>
                    </Card>
                </div>
            </div>
        ) : (
            ""
        );
    }
}
export default connect(mapStateToProps)(AddOrderForm);
