import React from 'react'
import Sidebar from "../components/sideBar/Sidebar";
import ProfileButton from '../components/buttons/ProfileButton';
import { connect } from 'react-redux';
import { Timeline, Card } from 'antd';
import { fetchOrders } from '../redux/Order/order.actions';
import 'antd/dist/antd.css';
import '../App.css';
import { CgProfile } from 'react-icons/cg';

const { Meta } = Card;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: this.props.orders.sort((a,b) => {
        return a.timeDue - b.timeDue;
      }),
      contacts: this.props.contacts.reverse().slice(0,3),
      
      userId: JSON.parse(localStorage.getItem('userData'))._id
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchOrders(this.state.userId));
  }

  render () {
    return (
      <div className='Master-div'>
        <Sidebar />
        <div className='dashboard'>
          <div className='header-dashboard'>
            <h1>Dashboard</h1>
            <ProfileButton></ProfileButton>
          </div>
          <div className='contents'>
            <div className='dashboard-left'>
              <Timeline>
                <Timeline.Item color='white'/>
                {
                  this.state.orders.map((order) => {
                    switch (order.status) {
                      case "CREATED":
                        return (
                          <Timeline.Item color='red'>
                            Order { order._id }, due: { order.timeDue.slice(0,10) }
                          </Timeline.Item>
                        )
                      case "DISCUSSED":
                        return (
                          <Timeline.Item color='grey'>
                            Order { order._id } { order.timeDue.slice(0,10) }
                          </Timeline.Item>
                        )
                      case "AGREED":
                        return (
                          <Timeline.Item color='blue'>
                            Order { order._id }{ order.timeDue.slice(0,10) }
                          </Timeline.Item>
                        )
                      case "SIGNED":
                        return (
                          <Timeline.Item color='green'>
                            Order { order._id } { order.timeDue.slice(0,10) }
                          </Timeline.Item>
                        )
                    }
                  })
                }
              </Timeline>
            </div>
            {
                this.state.contacts.map((contact) => {
                  return (
                    <Card
                      hoverable
                      cover={
                        <CgProfile style={{ fontSize: '40px', height: 100, bottom: 100, padding: 10 }}/>
                      }
                      style={{ width: 240, height: 300 }}
                      bodyStyle={{ height: 200 }}>
                      <Meta title={ contact.nameFirst + ' ' + contact.nameLast }/>
                    </Card>
                  )
                })
              }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    orders: state.orders,
  }
}

export default connect(mapStateToProps)(Dashboard);
