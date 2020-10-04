import React, {Component} from "react";
import {Form, Input, Button, Row, Col} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Layout} from 'antd';
import axios from 'axios';
import './Login.css'

const {Content} = Layout;

class Login extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        let token = sessionStorage.getItem('token');
        let {transition} = this.props;
        axios({
            method: 'get',
            url: '/contacts',
            headers: {'Authorization': 'Bearer ' + token},
        }).then((response) => {
            console.log(response)
            if (response.status === 200 || response.status === 201) { //OK
                transition.router.stateService.go('home', {}, {reload: true});
            }
        }).catch(function (response) {
            sessionStorage.removeItem('token');
            // transition.router.stateService.go('login', {}, {reload: true});
        });
    }

    render() {
        const onFinish = (values) => {
            let {transition} = this.props;
            let formData = new FormData();
            formData.append("username", values.username);
            formData.append("password", values.password);
            axios({
                method: 'post',
                url: '/login',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
                .then(function (response) {
                    sessionStorage.setItem("token", response.data.token)
                    transition.router.stateService.go('home.list', {}, {reload: true});
                })
                .catch(function (response) {
                    console.log(response);
                });
        };
        return (
            <Layout className="layout">
                <Row align="middle" style={{
                    position: "absolute",
                    width: "100%",
                    bottom: "0",
                    top: "0"
                }}>
                    <Col span={12} offset={6}>
                        <Content>
                            <div className="site-layout-content">
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Username!',
                                            },
                                        ]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                               placeholder="Username"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Password!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon"/>}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Content>
                    </Col>
                </Row>

            </Layout>

        );
    }
}

export default Login;