import { createRouter, createWebHistory } from "vue-router";
import LogIn from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import HomePage from "../components/Home.vue";
import ProfilePage from "../components/ProfilePage.vue";
import EditProfile from "../components/EditProfile.vue";
import ChangePassword from "../components/ChangePassword.vue";
import FeedBack from "../components/FeedBack.vue";
import TodaysMatches from "../components/TodaysMatches.vue";
import AdminHome from "../components/AdminHome.vue";
import TeamsList from "../components/TeamsList.vue";
import TeamPage from "../components/TeamPage.vue";
import ShowFeedback from "../components/ShowFeedback.vue";
import ShowComments from "../components/ShowComments.vue";
import FavoriteTeams from "../components/FavoriteTeams.vue";
import FixturePage from "../components/FixturePage.vue";
import Referee from "../components/Referee.vue";
import RefereePage from "../components/RefereePage.vue";
import MatchPage from "../components/MatchPage.vue";
import Standings from "../components/Standings.vue";
import UsersList from "../components/usersList.vue";
import AddMatch from "../components/AddMatch.vue";
import BootStrap from "../components/Bootstrap.vue";
import SchedulePlan from "../components/SchedulePlan.vue";
import RefereeAssignment from "../components/RefereeAssignment.vue"
import RefereeVoting from "../components/RefereeVoting.vue"
import ResetPassword from "../components/ResetPassword.vue"

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
  {
    path: "/bootstrap",
    name: "BootStrap",
    component: BootStrap,
  },
  {
    path: "/schedulePlan",
    name: "SchedulePlan",
    component: SchedulePlan,
  },
  {
    path: "/refereeAssignment",
    name: "RefereeAssignment",
    component: RefereeAssignment,
  },
  {
    path: "/refereeVoting",
    name: "RefereeVoting",
    component: RefereeVoting,
  },
  {
    path: "/reset",
    name: "ResetPassword",
    component: ResetPassword,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
