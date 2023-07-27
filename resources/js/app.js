require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Router Imported
import { routes } from './routes';

// Import User Class
// The "User" class from User.js is imported and assigned to the global "window.User" variable, making it accessible throughout the application.
import User from './helpers/User';
window.User = User;

const router = new VueRouter({
    routes,
    mode: 'history'
})


const app = new Vue({
    el: '#app',
    router
});
