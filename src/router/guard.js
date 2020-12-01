//路由守卫
import router from "@/router/index";
import {getToken, removeLogin} from "@/utils/app";

const whiteRouter = ["/login"];


router.beforeEach((to, from, next) => {
    if (getToken()) {
        //退出
        console.log(to.path)
        if (to.path === '/login') {
            removeLogin()
        }
        next()
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})