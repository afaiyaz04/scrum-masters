import React from "react";
import { compose } from "redux";
import { withRouter } from "react-router";
import { Upload, message } from "antd";
import "./ChangePicture.css";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
    // console.log(img);
}

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}

class ChangePicture extends React.Component {

    handleChange = (info) => {
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) =>
                this.setState({
                    user: {
                        ...this.state.user,
                        profilePic: imageUrl,
                    },
                })
            );
        }
    };

    render() {
        return (
            <div style={{ width: this.props.width, height: this.props.height }}>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="pic-upload"
                    showUploadList={false}
                    customRequest={dummyRequest}
                    beforeUpload={beforeUpload}
                    onChange={(info) => {
                        if (info.file.status === "done") {
                            // Get this url from response in real world.
                            getBase64(info.file.originFileObj, (imageUrl) =>
                                this.props.onChange(imageUrl)
                            );
                        }
                    }}
                >
                    <div className="pic-wrap">
                        <img
                            src={this.props.img}
                            className="pic-img"
                            referrerPolicy="no-referrer"
                            alt=""
                        />
                        <div
                            className="pic-text"
                            style={{ fontSize: this.props.fontSize }}
                        >
                            <p className="text-middle">{this.props.text}</p>
                        </div>
                    </div>
                </Upload>
            </div>
        );
    }
}

export default compose(withRouter)(ChangePicture);
