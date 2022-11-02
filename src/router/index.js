import { createRouter, createWebHistory } from "vue-router";
import LogIn from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import HomePage from "../components/Home.vue";




const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp
    }

]

const router =createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router