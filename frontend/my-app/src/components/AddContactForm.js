import React from "react";
import "./AddContactForm.css";
import { Input, Card, Button } from "antd";

export default class AddContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameFirst: "",
            nameLast: "",
            title: "",
            company: "",
            email: "",
            phoneNumber: "",
            address: "",
        };
    }
    render() {
        return this.props.trigger ? (
            <div className="popup">
                <div className="inner">
                    <button onClick={this.props.actions}>Close</button>

                    <Card>
                        <Input
                            placeholder="FirstName"
                            onChange={(e) =>
                                this.setState({ nameFirst: e.target.value })
                            }
                        />
                        <Input
                            placeholder="LastName"
                            onChange={(e) =>
                                this.setState({ nameLast: e.target.value })
                            }
                        />
                        <Input
                            placeholder="title"
                            onChange={(e) =>
                                this.setState({ title: e.target.value })
                            }
                        />
                        <Input
                            placeholder="company"
                            onChange={(e) =>
                                this.setState({ company: e.target.value })
                            }
                        />

                        <Input
                            placeholder="email"
                            onChange={(e) =>
                                this.setState({ email: e.target.value })
                            }
                        />

                        <Input
                            placeholder="phone"
                            onChange={(e) =>
                                this.setState({ phoneNumber: e.target.value })
                            }
                        />

                        <Input
                            placeholder="Address"
                            onChange={(e) =>
                                this.setState({ address: e.target.value })
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
