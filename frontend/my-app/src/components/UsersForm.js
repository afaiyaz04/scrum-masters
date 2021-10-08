import { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const UsersForm = (props) => {
    const [user, setUser] = useState({ ...props.user });

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
            <Form.Item label='id:'>
                <Input
                    placeholder={user.id}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item label='First Name:'>
                <Input
                    placeholder={user.nameFirst}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item label='Last Name:'>
                <Input
                    placeholder={user.nameLast}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item label='E-mail:'>
                <Input
                    placeholder={user.email}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item label='Password:'>
                <Input
                    placeholder={user.password}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item label='Type:'>
                <Input
                    placeholder={user.type}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button onClick={() => props.promoteAction(user.id)}>Promote</Button>
            </Form.Item>
        </Form>
    );
}

export default UsersForm;