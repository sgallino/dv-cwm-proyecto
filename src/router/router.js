import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Chat from "../pages/Chat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { subscribeToAuth } from "../services/auth";

const routes = [
    { path: '/',                component: Home },
    { path: '/iniciar-sesion',  component: Login },
    { path: '/registro',        component: Register },
    { path: '/chat',            component: Chat,            meta: { requiresAuth: true } },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let loggedUser = {
    id: null,
    email: null,
}

subscribeToAuth(newUserData => loggedUser = newUserData)

router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && loggedUser.id === null) {
        return { path: '/iniciar-sesion' };
    }
});

export default router;