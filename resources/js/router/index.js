import Vue from 'vue'
import VueRouter from "vue-router";
import Dashboard from "../components/Dashboard"
import Category from "../components/Category";
import AddQuestion from "../components/AddQuestion";
import Admin from "../components/Admin/Admin";
import AdminCategory from "../components/Admin/AdminCategory"
import AdminQuestions from "../components/Admin/AdminQuestions"
import Login from "../components/Login";
import Registration from "../components/Admin/Registration";
import User from "../components/Admin/User";
import store from '../store'


Vue.use(VueRouter);


const routes = [
    {path: '/', component: Dashboard},
    {path: '/category', component: Category},
    {path: '/question', component: AddQuestion},
    {
        path: '/admin',
        component: Admin,
        // beforeEnter: (to, from, next) => {
        //     console.log(store.getters.getLoading);
        //     if (!store.getters.getLoading) {
        //         if (store.getters.getStatus) {
        //             next();
        //         } else {
        //             next('/login');
        //         }
        //     }
        // },
        children: [
            {
                path: 'user',
                component: User
            },
            {
                path: 'ad_category',
                component: AdminCategory
            },
            {
                path: 'ad_question',
                component: AdminQuestions
            },
        ]
    },
    {
        path: '/login',
        component: Login,
        // beforeEnter: (to, from, next) => {
        //     if (!store.getters.getLoading) {
        //         if (store.getters.getStatus) {
        //             next('/admin');
        //         } else {
        //             next();
        //         }
        //     }
        // },
    },
    {path: '/registration', component: Registration},
];

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
});


export default router;

