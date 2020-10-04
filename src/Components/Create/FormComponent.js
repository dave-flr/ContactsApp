import React from "react";
import {Button, Form, Input} from 'antd';
import './Create.css'

class FormComponent extends React.Component {
    layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    render() {
        return (
            <Form
                {...this.layout}
                form={this.props.form}
                name={this.props.formName}
                onFinish={this.props.onFinish}
                onFinishFailed={this.props.onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    // initialValue={this.props.name}
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name!',
                        },
                    ]}
                >
                    <Input placeholder={this.props.name}/>
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    // initialValue={this.props.phone_number}
                    rules={[
                        {
                            required: true,
                            message: 'Please input the phone number!',
                        },
                    ]}
                >
                    <Input placeholder={this.props.phone_number}/>
                </Form.Item>

                <Form.Item className={this.props.submit} {...this.tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default FormComponent;