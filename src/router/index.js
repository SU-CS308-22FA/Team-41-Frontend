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
import AdminHome from "../components/AdminHome";
import TeamsList from "../components/TeamsList";
import TeamPage from "../components/TeamPage";
import ShowFeedback from "../components/ShowFeedback";
import ShowComments from "../components/ShowComments";
import FavoriteTeams from "../components/FavoriteTeams";
import FixturePage from "../components/FixturePage";
import Referee from "../components/Referee";
import RefereePage from "../components/RefereePage";
import MatchPage from "../components/MatchPage.vue";
import Standings from "../components/Standings.vue";
import UsersList from "../components/usersList.vue";
import AddMatch from "../components/AddMatch.vue";

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
    props: true,
  },
  {
    path: "/ShowFeedback",
    name: "ShowFeedback",
    component: ShowFeedback,
  },
  {
    path: "/ShowComments",
    name: "ShowComments",
    component: ShowComments,
  },
  {
    path: "/favoriteTeams",
    name: "FavoriteTeams",
    component: FavoriteTeams,
  },
  {
    path: "/fixturePage",
    name: "FixturePage",
    component: FixturePage,
  },
  {
    path: "/referees",
    name: "AllReferees",
    component: Referee,
  },
  {
    path: "/matchPage/:matchId",
    name: "MatchPage",
    component: MatchPage,
    props: true,
  },
  {
    path: "/referees/:refereeId",
    name: "RefereePage",
    component: RefereePage,
    props: true,
  },
  {
    path: "/standings",
    name: "AllStandings",
    component: Standings,
  },
  {
    path: "/usersList",
    name: "UsersList",
    component: UsersList,
  },
  {
    path: "/addMatch",
    name: "AddMatch",
    component: AddMatch,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
