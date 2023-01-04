<template>
    <nav class="navbar fixed-top navbar-expand-lg" data-bs-theme="dark" style="height: 70px; background-color: #5f6caf;">
        <div class="container-fluid">
            &nbsp;&nbsp;&nbsp;
            <a class="navbar-brand" style="font-weight: bold;">
                <img src="../assets/tfpLogo.png">
            </a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a id="home" class="nav-link active right-buts" aria-current="page" @click="this.$router.replace('/')">
                        Home
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a id="today" class="nav-link active right-buts" @click="this.$router.replace('/todaysMatches')">
                        Todays's Matches
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a id="fixture" class="nav-link active right-buts" @click="this.$router.replace('/fixturePage')">
                        Fixture
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a id="teams" class="nav-link active right-buts" @click="this.$router.replace('/teamsList')">
                        Teams
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a id="referees" class="nav-link active right-buts" @click="this.$router.replace('/referees')">
                        Referees
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a id="standings" class="nav-link active right-buts" @click="this.$router.replace('/standings')">
                        Standings
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active" v-if="isLoggedIn()">
                    <a id="favorites" class="nav-link active right-buts" @click="this.$router.replace('/favoriteTeams')">
                        Favorites
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active" v-if="showAdminTools">
                    <a id="adminTools" class="nav-link active right-buts" style="font-weight: bolder; color: rgb(150, 175, 200);" @click="this.$router.replace('/AdminHome')">
                        Admin Tools
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active" v-if="showRefereeTools">
                    <a id="refereeTools" class="nav-link active right-buts" style="font-weight: bolder; color: rgb(150, 175, 200);" @click="this.$router.replace('/refereeVoting')">
                        Referee Tools
                    </a>
                </li>
            </ul>

            <a id="contact" class="nav-link active left-buts" @click="this.$router.replace('/feedback')">
                Contact
            </a>
            &nbsp;&nbsp;&nbsp;
            <a id="profile" class="nav-link active left-buts" v-if="isLoggedIn()" @click="this.$router.replace('/profilePage')">
                Profile
            </a>
            &nbsp;&nbsp;&nbsp;
            <a id="logOut" class="nav-link active left-buts" v-if="isLoggedIn()" @click="logOut()">
                Log Out
            </a>
            <a id="logIn" class="nav-link active left-buts" v-else @click="this.$router.replace('/login')">
                Log In
            </a>
            &nbsp;&nbsp;&nbsp;
        </div>
    </nav>
</template>

<script scoped>
    export default {
        name: 'NavBar',
        components: {},
        data() {
            return{
                showAdminTools: false,
                showRefereeTools: false,
                dropdown: null,
            }
        },
        mounted() {
            if(localStorage.isAdmin) this.showAdminTools = localStorage.isAdmin === "true";
            if(localStorage.isReferee) this.showRefereeTools = localStorage.isReferee === "true";
        },
        methods: {
            isLoggedIn(){
                if(localStorage.isLogedIn === undefined) return false;
                return true;
            },

            logOut() {
                localStorage.clear();
                this.$router.replace("/login");
            },
        },
    };
</script>

<style scoped>
    img{
        height: 65px;
        width: 175px;
    }

    .left-buts, .right-buts{
        color: black;
        font-weight: 500;
        border-radius: 10px;
        padding: 8px;
    }

    .left-buts:hover, .right-buts:hover{
        background-color: white;
        color: black;
        font-weight: bold;
        transform: scale(1.1);
        border-radius: 10px;
        padding: 8px;
        cursor: pointer;
    }
</style>