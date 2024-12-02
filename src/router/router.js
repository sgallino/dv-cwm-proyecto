import { createRouter, createWebHashHistory } from "vue-router";
import { subscribeToAuth } from "../services/auth";
import Home from "../pages/Home.vue";
import Chat from "../pages/Chat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import MyProfile from "../pages/MyProfile.vue";
import MyProfileEdit from "../pages/MyProfileEdit.vue";
import MyProfileEditAvatar from "../pages/MyProfileEditAvatar.vue";
import UserProfile from "../pages/UserProfile.vue";
import PrivateChat from "../pages/PrivateChat.vue";
import News from "../pages/News.vue";

const routes = [
    { path: '/',                        component: Home },
    { path: '/iniciar-sesion',          component: Login },
    { path: '/registro',                component: Register },
    { path: '/chat',                    component: Chat,                    meta: { requiresAuth: true } },
    { path: '/mi-perfil',               component: MyProfile,               meta: { requiresAuth: true } },
    { path: '/mi-perfil/editar',        component: MyProfileEdit,           meta: { requiresAuth: true } },
    { path: '/mi-perfil/editar/foto',   component: MyProfileEditAvatar,     meta: { requiresAuth: true } },
    { path: '/usuario/:id',             component: UserProfile,             meta: { requiresAuth: true } },
    { path: '/usuario/:id/chat',        component: PrivateChat,             meta: { requiresAuth: true } },
    { path: '/noticias',                component: News,                    meta: { requiresAuth: true } },
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