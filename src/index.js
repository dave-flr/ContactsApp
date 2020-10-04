import React from 'react';
import ReactDOM from 'react-dom';
import {UIRouter, UIView} from '@uirouter/react';
import './index.css';
import App from './App';
import {router} from './router.config';

import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';


ReactDOM.render(
    <UIRouter router={router}>
        {/*<App/>*/}
        {/*<Login/>*/}
        <UIView/>
    </UIRouter>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
