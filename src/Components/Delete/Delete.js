import React, {Component} from 'react';
import axios from "axios";
import {Button, Avatar, List, message} from "antd";
import {DeleteOutlined, UserOutlined} from "@ant-design/icons";

class Delete extends Component {
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
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        }).catch(function (response) {
            sessionStorage.removeItem('token');
            transition.router.stateService.go('login', {}, {reload: true});
        });
        if (contacts) {
            this.setState({
                contacts: contacts.data
            })
        }
    }

    deleteItem = async (e) => {
        let token = sessionStorage.getItem('token');
        let {transition} = this.props;
        await axios({
            method: 'delete',
            url: '/contacts/delete/' + e,
            headers: {'Authorization': 'Bearer ' + token},
        })
            .then(function (response) {
                if (response.status === 200 || response.status === 201) { //OK
                    //transition.router.stateService.go('home', {}, {reload: true});
                    message.success('Deleted!');
                } else {
                }
            })
            .catch(function (response) {
                message.error('Session is over!');
                sessionStorage.removeItem('token');
                transition.router.stateService.go('login', {}, {reload: true});
            });
        this.setState(function (state) {
            return {
                contacts: state.contacts.filter(function (it) {
                    return it.id !== e;
                })
            };
        });
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
                                <Button onClick={() => this.deleteItem(item.id)}
                                        key={item.id}
                                        type="danger" shape="circle"
                                        icon={<DeleteOutlined/>
                                        }
                                />
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Delete;