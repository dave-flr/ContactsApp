import React from "react";
import {Form, message} from 'antd';
import FormComponent from './FormComponent'
import axios from "axios";

function Create(props) {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        let formData = new FormData();
        let token = sessionStorage.getItem('token');
        let {transition} = props;
        formData.append("name", values.name);
        formData.append("phone_number", values.phone_number);
        axios({
            method: 'post',
            url: '/contacts/create',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (response) {
                // sessionStorage.setItem("token", response.data.token)
                if (response.status === 200 || response.status === 201) { //OK
                    //transition.router.stateService.go('home', {}, {reload: true});
                    console.log(response);
                    form.resetFields();
                    message.success('Success!');
                } else {
                }
            })
            .catch(function (response) {
                message.error('Session is over!');
                sessionStorage.removeItem('token');
                transition.router.stateService.go('login', {}, {reload: true});
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <FormComponent
            onFinish={onFinish}
            formName="create"
            onFinishFailed={onFinishFailed}
            form={form}/>
    );
}

export default Create;