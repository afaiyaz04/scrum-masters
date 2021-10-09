import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import { List, Button } from "antd";
import "antd/dist/antd.css";
import { fetchUsers, promoteUser } from "../redux/Users/users.actions";
import UsersForm from "../components/UsersForm";
import { connect } from "react-redux";

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
  };

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
    users: state.users
  }
}

export default connect(mapStateToProps)(Users);
