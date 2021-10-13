import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Modal, Button, Form, Input } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { updateUser, deleteSelf } from "../redux/User/user.actions";
import { compose } from "redux";
import { withRouter } from "react-router";
import { SIGN_OUT } from "../redux/User/user.types";
import "./Profile.css";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("userData")),
      showDelete: false,
    };
  }

  updateHandler = (newItem) => {
    this.setState({ showDetails: false });
    this.props.dispatch(updateUser(this.state.user._id, newItem));
  };

  deleteHandler = () => {
    this.props.dispatch(deleteSelf(this.state.user._id, this.props.history));
  };

  render() {
    return (
      <Form {...layout}>
        <Form.Item className="user-pic">
          <h1>
            <FaUserCircle />
          </h1>
        </Form.Item>
        <Form.Item label="Email:">
          <Input placeholder={this.state.user.email} disabled={true} />
        </Form.Item>
        <Form.Item label="First Name:">
          <Input
            placeholder={this.state.user.nameFirst}
            onChange={(e) =>
              this.setState({
                user: { ...this.state.user, nameFirst: e.target.value },
              })
            }
          />
        </Form.Item>
        <Form.Item label="Last Name:">
          <Input
            placeholder={this.state.user.nameLast}
            onChange={(e) =>
              this.setState({
                user: { ...this.state.user, nameLast: e.target.value },
              })
            }
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 30 }} style={{ paddingTop: 50 }}>
          <Button
            type="primary"
            block
            onClick={() => this.updateHandler(this.state.user)}
            style={{ textAlign: "center" }}
          >
            Update
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 30 }}>
          <Button
            type="primary"
            danger
            block
            onClick={() => {
              this.setState({ showDelete: true });
            }}
            style={{ textAlign: "center" }}
          >
            Delete Account
          </Button>
          <Modal
            title="Delete Account"
            visible={this.state.showDelete}
            onCancel={() => {
              this.setState({ showDelete: false });
            }}
            footer={null}
            width={300}
            centered={true}
          >
            <h3 style={{ textAlign: "center" }}>
              Are you sure? This action is irreversible.
            </h3>
            <Button
              type="primary"
              danger
              block
              onClick={() => this.deleteHandler()}
              style={{ textAlign: "center" }}
            >
              Confirm
            </Button>
          </Modal>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default compose(withRouter, connect(mapStateToProps))(Profile);
