import { createRouter, createWebHistory } from "vue-router";
import LogIn from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import HomePage from "../components/Home.vue";
import ProfilePage from "../components/ProfilePage.vue";
import EditProfile from "../components/EditProfile.vue";
import ChangePassword from "../components/ChangePassword.vue";
import FeedBack from "../components/FeedBack";
import MainFeed from "../components/MainFeed";
import TodaysMatches from "../components/TodaysMatches";
import AdminHome from "../components/AdminHome"
import TeamsList from "../components/TeamsList"
import TeamPage from "../components/TeamPage"
import ShowFeedback from "../components/ShowFeedback"

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/profilepage",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    component: EditProfile,
  },
  {
    path: "/ChangePassword",
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    path: "/feedBack",
    name: "FeedBack",
    component: FeedBack,
  },
  {
    path: "/mainFeed",
    name: "MainFeed",
    component: MainFeed,
  },
  {
    path: "/todaysMatches",
    name: "TodaysMatches",
    component: TodaysMatches,
  },
  {
    path: "/AdminHome",
    name: "AdminHome",
    component: AdminHome,
  },
  {
    path: "/teamsList",
    name: "TeamsList",
    component: TeamsList,
  },
  {
    path: "/teamPage/:teamId",
    name: "TeamPage",
    component: TeamPage,
    props: true
  }.
  {
    path: "/ShowFeedback",
    name: "ShowFeedback",
    component: ShowFeedback,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
