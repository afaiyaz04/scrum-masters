import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import { List, Button } from "antd";
import "antd/dist/antd.css";
import { fetchUsers, promoteUser, deleteUser } from "../redux/Users/users.actions";
import { fetchUser } from "../redux/api";
import UsersForm from "../components/UsersForm";
import { connect } from "react-redux";
import { SIGN_OUT } from "../redux/User/user.types";
import { DELETE_USER } from "../redux/Users/users.types";

const initialUser = {
    id: "",
    nameFirst: "",
    nameLast: "",
    email: "",
    password: "",
    type: "",
}

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: initialUser,
      showDetails: false,
      userId: JSON.parse(localStorage.getItem('userData'))._id
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  promoteHandler = (toUserId) => {
    this.props.dispatch(promoteUser(this.state.userId, toUserId));
    this.setState({ showDetails: false });
  };

  controlUser = (toUserId) => {
    if (!localStorage.getItem('originalData')) {
      localStorage.setItem('originalData', localStorage.getItem('userData'));
    }
    fetchUser(toUserId).then((res) => {
      console.log(res);
      localStorage.setItem('userData', JSON.stringify(res.data));
      this.props.history.push('/dashboard');
    });
  }

  deleteHandler = (userId) => {
    if (this.state.userId === userId && !localStorage.getItem('originalData')) {
      this.props.dispatch(deleteUser(userId));
      this.props.dispatch({ type: SIGN_OUT });
      this.props.history.push('/');
    } else if (this.state.userId === userId && localStorage.getItem('originalData')) {
      localStorage.setItem('userData', localStorage.getItem('originalData'));
      localStorage.removeItem('originalData');
      this.props.dispatch(deleteUser(userId));
      this.props.history.push('/dashboard');
    } else {
      this.props.dispatch(deleteUser(userId));
    }
    this.setState({ showDetails: false });
  }

  render () {
    return (
      <div className="Master-div">
        <Sidebar />
        <div className="users">
          <Header
            page="Users"
            actions={() => {}}
          />
          <div className="contents">
            <div className="contents-left">
              <span>Name</span>
              <List
                itemLayout="horizontal"
                dataSource={this.props.users}
                renderItem={(item) => (
                  <List.Item
                    className="user-item"
                    key={item.id}
                    actions={[
                      <Button
                        type="dashed"
                        block
                        onClick={() => {
                            this.setState({
                              showDetails: true,
                              user: {
                                id: item._id,
                                nameFirst: item.nameFirst,
                                nameLast: item.nameLast,
                                email: item.email,
                                password: item.password,
                                type: item.type }
                              }
                            )
                          }
                        }
                      >
                        Details
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${item.nameFirst} ${item.nameLast}`}
                      description={item.email}
                      avatar={<CgProfile />}
                    />
                  </List.Item>
                )}
              />
            </div>
            {
              (this.state.showDetails) &&
              <div className="contents-right">
                <UsersForm
                  user={ this.state.user }
                  showDetails={ this.state.showDetails }
                  closeAction={() => this.setState({ showDetails: false })}
                  promoteAction={ this.promoteHandler }
                  controlAction={ this.controlUser }
                  deleteAction={ this.deleteHandler }
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users
  }
}

export default connect(mapStateToProps)(Users);
