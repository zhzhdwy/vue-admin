import Vue from "vue";
import VueRouter from "vue-router";

import Layout from '@/views/Layout/index';

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "login",
        hidden: true,
        meta: {
            name: "首页",
            icon: ""
        }
    },
    {
        path: "/login",
        name: "Login",
        hidden: true,
        meta: {
            name: "登陆"
        },
        component: () => import("../views/Login/index")
    },

    //仪表盘///////////////////////////////////////////////////////////////////
    {
        path: "/dashboard",
        name: "Dashboard",
        meta: {
            name: "仪表盘",
            icon: "dashboard"
        },
        component: Layout,
        children: [
            {
                path: "/company",
                name: "Company",
                meta: {
                    name: "公司主体",
                },
                component: () => import("../views/finance/company/company")
            },
        ]
    },
    //公司财务///////////////////////////////////////////////////////////////////
    {
        path: "/finance",
        name: "finance",
        meta: {
            name: "公司财务",
            icon: "finance"
        },
        component: Layout,
        children: [
            {
                path: "/company",
                name: "Company",
                meta: {
                    name: "公司主体",
                },
                component: () => import("../views/finance/company/company")
            },
        ]
    },
    //
    {
        path: "/operation",
        name: "Operation",
        meta: {
            name: "机房运维",
            icon: "Operation"
        },
        component: Layout,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
