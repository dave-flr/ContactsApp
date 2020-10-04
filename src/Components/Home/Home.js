import React, {Component} from 'react';
import {List, Avatar, message} from "antd";
import {UserOutlined} from '@ant-design/icons';
import axios from 'axios';
import {UISref} from "@uirouter/react";
import ContactLink from "../Contact/ContactLink";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        }
    }

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
            } else {

            }
        }).catch(function (response) {
            console.log(response);
            sessionStorage.removeItem('token');
            transition.router.stateService.go('login', {}, {reload: true});
        });
        if (contacts) {
            this.setState({
                contacts: contacts.data
            })
        }
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
                                title={
                                    // <UISref to={'contact'}>
                                    //     <a>{item.name}</a>
                                    // </UISref>
                                    <ContactLink key={item.id} contact={item}/>
                                }
                                description={item.phone_number}
                            />
                            <div>---</div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Home;