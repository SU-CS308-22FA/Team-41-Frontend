<template>
    <nav class="navbar fixed-top navbar-expand-lg bg-secondary" data-bs-theme="dark" style="height: 70px;">
        <div class="container-fluid">
            &nbsp;&nbsp;&nbsp;
            <a class="navbar-brand" style="font-weight: bold;">
                <img src="../assets/tfpLogo.png">
            </a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link active" aria-current="page" href="/">
                        Home
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link" href="/todaysMatches">
                        Todays's Matches
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link" href="/fixturePage">
                        Fixture
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link" href="/teamsList">
                        Teams
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link" href="/referees">
                        Referees
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link" href="/standings">
                        Standings
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active" v-if="isLoggedIn()">
                    <a class="nav-link" href="/favoriteTeams">
                        Favorites
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item dropdown" v-if="showAdminTools">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Admin Tools
                    </a>
                    <ul class="dropdown-menu active">
                        <!-- TODO -->
                    </ul>
                </li>
            </ul>

            <a class="nav-link" href="/profilePage" v-if="isLoggedIn()">
                Profile
            </a>
            &nbsp;&nbsp;&nbsp;
            <a class="nav-link" @click="logOut()" v-if="isLoggedIn()">
                Log Out
            </a>
            <a class="nav-link" href="/login" v-else>
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
            }
        },
        mounted() {
            if(localStorage.isAdmin) this.showAdminTools = localStorage.isAdmin === "true";
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

    li:hover{
        background-color: white;
        color: black;
        font-weight: bold;
        transform: scale(1.1);
        border-radius: 10px;
    }
</style>