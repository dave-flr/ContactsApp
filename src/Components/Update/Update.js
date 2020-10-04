import React, {Component} from 'react';
import axios from "axios";
import {Modal, Button, Avatar, List, message, Form, Input} from "antd";
import {EditOutlined, UserOutlined} from "@ant-design/icons";

class Update extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            visible: false,
            item: {
                name: '',
                phone_number: ''
            },
        }
    }

    showModal = (item) => {
        this.setState({
            visible: true,
            item: item
        });
        if (this.formRef.current !== null) {
            this.formRef.current.setFieldsValue({
                name: item.name,
                phone_number: item.phone_number,
            });
        }
    };

    handleOk = async e => {
        this.formRef.current.submit();
        this.setState({
            visible: false,
        });
    };

    onFinish = (values) => {
        let formData = new FormData();
        let token = sessionStorage.getItem('token');
        let {transition} = this.props;
        formData.append("name", values.name);
        formData.append("phone_number", values.phone_number);
        axios({
            method: 'put',
            url: '/contacts/update/' + this.state.item.id,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (response) {
                if (response.status === 200 || response.status === 201) { //OK
                    message.success('Updated!');
                }
            })
            .catch(function (response) {
                message.error('Session is over!');
                sessionStorage.removeItem('token');
                transition.router.stateService.go('login', {}, {reload: true});
            });
        this.setState(function (state) {
            return {
                visible: false,
                contacts: state.contacts.map(item => {
                    if (item.id === state.item.id) {
                        return {
                            id: item.id,
                            name: values.name,
                            phone_number: values.phone_number
                        }
                    } else {
                        return item
                    }
                })
            };
        });

    }

    handleCancel = e => {
        this.setState({
            visible: false,
            item: {
                name: '',
                phone_number: ''
            },
        });
    };

    async componentDidMount() {
        let token = sessionStorage.getItem('token');
        let {transition} = this.props;
        const contacts = await axios({
            method: 'get',
            url: '/contacts',
            headers: {'Authorization': 'Bearer ' + token},
        }).then(function (response) {
            console.log(response)
            if (response.status === 200 || response.status === 201) { //OK
                return response;
            }
        }).catch(function (response) {
            console.log(response);
            sessionStorage.removeItem('token');
            transition.router.stateService.go('login', {}, {reload: true});
        });
        this.setState({
            contacts: contacts.data
        })
    }

    editItem = (item) => {
        this.showModal(item);
    }

    render() {
        return (
            <div className="site-statistic-demo-card">
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.contacts}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar icon={<UserOutlined/>}/>
                                }
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={item.phone_number}
                            />
                            <div>
                                <Button onClick={() => this.editItem(item)}
                                        key={item.id}
                                        type="dashed" shape="circle"
                                        icon={<EditOutlined/>}
                                />
                            </div>
                        </List.Item>
                    )}
                />
                <Modal
                    title="Update contact"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form
                        {...this.props.layout}
                        form={this.props.form}
                        name="edit"
                        onFinish={this.onFinish}
                        ref={this.formRef}
                        // onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            initialValue={this.state.item.name}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the name!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone_number"
                            initialValue={this.state.item.phone_number}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the phone number!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        {/*<Form.Item>*/}
                        {/*    <Button type="primary" htmlType="submit">*/}
                        {/*        Submit*/}
                        {/*    </Button>*/}
                        {/*</Form.Item>*/}
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Update;