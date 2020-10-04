import React from 'react';
import './App.css';
import {Layout, Menu, Breadcrumb} from 'antd';
import {HomeOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {UISref, UIView} from "@uirouter/react";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 'home'
        }
    }

    onMenuClick = e => {
        this.setState({
            selectedIndex: e.key
        })
    }

    logOut = () => {
        let {transition} = this.props;
        sessionStorage.removeItem('token');
        transition.router.stateService.go('login', {}, {reload: true});
    }

    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal"
                          selectedKeys={this.state.selectedIndex}
                          defaultSelectedKeys={[this.state.selectedIndex]}
                          onClick={this.onMenuClick}>
                        <Menu.Item key="home">
                            <UISref to={'home.list'}>
                                <a>Home</a>
                            </UISref>
                        </Menu.Item>
                        <Menu.Item key="create">
                            <UISref to={'home.create'}>
                                <a>Create</a>
                            </UISref>
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <UISref to={'home.delete'}>
                                <a>Delete</a>
                            </UISref>
                        </Menu.Item>
                        <Menu.Item key="update">
                            <UISref to={'home.update'}>
                                <a>Update</a>
                            </UISref>
                        </Menu.Item>
                        <Menu.Item key="logout">
                            <a onClick={this.logOut}><LogoutOutlined/>Logout</a>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            selectedKeys={this.state.selectedIndex}
                            defaultSelectedKeys={[this.state.selectedIndex]}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                            onClick={this.onMenuClick}
                        >
                            <Menu.Item key="home" icon={<HomeOutlined/>}>
                                <UISref to={'home.list'}>
                                    <a>Home</a>
                                </UISref>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="Options">
                                <Menu.Item key="create">
                                    <UISref to={'home.create'}>
                                        <a>Create</a>
                                    </UISref>
                                </Menu.Item>
                                <Menu.Item key="delete">
                                    <UISref to={'home.delete'}>
                                        <a>Delete</a>
                                    </UISref>
                                </Menu.Item>
                                <Menu.Item key="update">
                                    <UISref to={'home.update'}>
                                        <a>Update</a>
                                    </UISref>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.selectedIndex.charAt(0).toUpperCase() + this.state.selectedIndex.slice(1)}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <UIView class="main"/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default App;
