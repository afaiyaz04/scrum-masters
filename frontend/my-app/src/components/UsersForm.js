import { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const UsersForm = (props) => {
    const [user, setUser] = useState({ ...props.user });
    const userId = JSON.parse(localStorage.getItem('userData'))._id;

    useEffect(() => {
        setUser({ ...props.user });
    })

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    }

    return (
        <Form
            { ...layout }
        >
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
                <Button onClick={props.closeAction}>Close</Button>
            </Form.Item>
            <Form.Item label='First Name:'>
                <Input
                    placeholder={user.nameFirst}
                    onChange={(e) => setUser({ ...user, nameFirst: e.target.value })}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item label='Last Name:'>
                <Input
                    placeholder={user.nameLast}
                    onChange={(e) => setUser({ ...user, nameLast: e.target.value })}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item label='E-mail:'>
                <Input
                    placeholder={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item label='Password:'>
                <Input
                    placeholder={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item label='Type:'>
                <Input
                    placeholder={user.type}
                    onChange={(e) => setUser({ ...user, type: e.target.value })}
                    disabled={true}
                />
            </Form.Item>
        </Form>
    );
}

export default UsersForm;