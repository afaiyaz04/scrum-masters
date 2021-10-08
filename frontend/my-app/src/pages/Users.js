import React, { useState, useEffect } from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import { List, Button } from "antd";
import "antd/dist/antd.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, promoteUser } from "../redux/Users/users.actions";
import UsersForm from "../components/UsersForm";

const initialUser = {
    id: "",
    nameFirst: "",
    nameLast: "",
    email: "",
    password: "",
    type: "",
}

function User() {
  const [user, setUser] = useState(initialUser);
  const [showDetails, setShowDetails] = useState(false);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const userId = JSON.parse(localStorage.getItem('userData'))._id;

  useEffect(() => {
    dispatch(fetchUsers());
  });

  const promoteHandler = (toUserId) => {
    dispatch(promoteUser(userId, toUserId));
  };

  const closeFormHandler = () => {
    setShowDetails(false);
  }

  const removeNull = (array) => {
    return array.filter((x) => x !== null);
  }

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
              dataSource={removeNull(users)}
              renderItem={(item) => (
                <List.Item
                  className="user-item"
                  key={item.id}
                  actions={[
                    <Button
                      type="dashed"
                      block
                      onClick={() => {
                          setShowDetails(true);
                          setUser({
                            id: item._id,
                            nameFirst: item.nameFirst,
                            nameLast: item.nameLast,
                            email: item.email,
                            password: item.password,
                            type: item.type
                          })
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
            (showDetails) &&
            <div className="contents-right">
              <UsersForm
                user={user}
                showDetails={showDetails}
                closeAction={closeFormHandler}
                promoteAction={promoteHandler}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default User;
