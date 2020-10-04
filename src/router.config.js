import {UIRouterReact, servicesPlugin, hashLocationPlugin} from '@uirouter/react';
import Create from './Components/Create/Create';
import Delete from './Components/Delete/Delete';
import Update from './Components/Update/Update';
import Home from './Components/Home/Home';
import Contact from "./Components/Contact/Contact";
import App from './App';
import Login from './Components/Login/Login';

// Create a new instance of the Router
export const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(hashLocationPlugin);

// states
const states = [
    {
        name: 'login',
        url: '/login',
        component: Login
    },
    {
        name: 'home',
        url: '/',
        component: App
    },
    {
        name: 'home.list',
        url: 'list',
        component: Home
    },
    {
        name: 'home.create',
        url: 'create',
        component: Create,
    },
    {
        name: 'home.delete',
        url: 'delete',
        component: Delete,
    },
    {
        name: 'home.update',
        url: 'update',
        component: Update,
    },
    {
        name: 'home.contact',
        url: 'contact/:contact_id',
        component: Contact,
    }
];


// Register the initial (eagerly loaded) states
states.forEach(state => router.stateRegistry.register(state));

// Global config for router
router.urlService.rules.initial({state: 'login'});
