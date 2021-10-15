import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Modal, Button, Form, Input, Upload, message } from "antd";
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


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    // console.log(img);
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            showDelete: false,
            input: {nameFirst: "", nameLast: ""},
        };
    }

    updateHandler = (newItem) => {
        this.setState({ showDetails: false });
        this.props.dispatch(updateUser(this.state.user._id, newItem));
    };

    deleteHandler = () => {
        this.props.dispatch(
            deleteSelf(this.state.user._id, this.props.history)
        );
    };


    handleChange = info => {
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
                user: {
                    ...this.state.user,
                    profilePic: imageUrl,
                },
            })
          );
        }
      };

      resetToGoogle = () => {
          const googleData = JSON.parse(localStorage.getItem("user"));
          
          this.setState({
              user: {
                    ...this.state.user,
                    profilePic: googleData.profilePic,
                    nameFirst: googleData.nameFirst,
                    nameLast: googleData.nameLast,
              },
              input: {
                  nameFirst: googleData.nameFirst,
                  nameLast: googleData.nameLast,
              }
          })

      }

    render() {
        return (
            <Form {...layout}>
                <Form.Item className="profile-pic-form">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="profile-pic-upload"
                        showUploadList={false}
                        customRequest={dummyRequest}
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        <div className="profile-pic-wrap">
                            <img src={this.state.user.profilePic} className="profile-pic-img"/>
                            <div className="profile-pic-text">
                                <p className="text-middle">Change</p>
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Email:">
                    <Input
                        placeholder={this.state.user.email}
                        disabled={true}
                    />
                </Form.Item>
                <Form.Item label="First Name:">
                    <Input
                        placeholder={this.state.user.nameFirst}
                        onChange={(e) =>
                            this.setState({
                                user: {
                                    ...this.state.user,
                                    nameFirst: e.target.value,
                                },
                                input: {
                                    ...this.state.input,
                                    nameFirst: e.target.value,
                                },
                            })
                        }
                        value={this.state.input.nameFirst}
                    />
                </Form.Item>
                <Form.Item label="Last Name:">
                    <Input
                        placeholder={this.state.user.nameLast}
                        onChange={(e) =>
                            this.setState({
                                user: {
                                    ...this.state.user,
                                    nameLast: e.target.value,
                                },
                                input: {
                                    ...this.state.input,
                                    nameLast: e.target.value,
                                },
                            })
                        }
                        value={this.state.input.nameLast}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 30 }} style={{ paddingTop: 30 }}>
                    <Button
                        block
                        onClick={() => this.resetToGoogle()}
                        style={{ textAlign: "center" }}
                    >
                        Reset to Google Information
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 30 }} >
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
