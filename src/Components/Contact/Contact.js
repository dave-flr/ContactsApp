import React from 'react';
import {Card, Col, Row} from 'antd';
import axios from "axios";

const {Meta} = Card;


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {}
        }
    }

    async componentDidMount() {
        let contact_id = this.props.$stateParams.contact_id;
        let token = sessionStorage.getItem('token');
        let {transition} = this.props;
        const contact = await axios({
            method: 'get',
            url: '/contacts/' + contact_id,
            headers: {'Authorization': 'Bearer ' + token},
        }).then((response) => {
            if (response.status === 200 || response.status === 201) { //OK
                //transition.router.stateService.go('home', {}, {reload: true});
                return response;
            } else {

            }
        }).catch(function (response) {
            sessionStorage.removeItem('token');
            transition.router.stateService.go('login', {}, {reload: true});
        });
        this.setState({
            contact: contact.data
        })
    }

    render() {
        return (
            <Row align="middle" style={{}}>
                <Col span={12} offset={8}>
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example"
                                    src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/>}
                    >
                        <Meta title={this.state.contact.name} description={this.state.contact.phone_number}/>
                    </Card>
                </Col>

            </Row>
        );
    }
}

export default Contact;