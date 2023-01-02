<template>
    <nav class="navbar fixed-top navbar-expand-lg" data-bs-theme="dark" style="height: 70px; background-color: rgba(44, 88, 176, 0.818);">
        <div class="container-fluid">
            &nbsp;&nbsp;&nbsp;
            <a class="navbar-brand" style="font-weight: bold;">
                <img src="../assets/tfpLogo.png">
            </a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link active right-buts" aria-current="page" @click="this.$router.replace('/AdminHome')">
                        Dashboard
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link active right-buts" @click="this.$router.replace('/usersList')">
                        Users
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link active right-buts" @click="this.$router.replace('#')">
                        Referee Assignment
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link active right-buts" @click="this.$router.replace('/schedulePlan')">
                        Fixture Planning
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link active right-buts" @click="this.$router.replace('/addMatch')">
                        Add Match
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link active right-buts" @click="this.$router.replace('/ShowComments')">
                        Reports
                    </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li class="nav-item active">
                    <a class="nav-link active right-buts" @click="this.$router.replace('/showFeedBack')">
                        Feedbacks
                    </a>
                </li>
            </ul>

            <a class="nav-link active right-buts" @click="this.$router.replace('/')">
                Go back Home
            </a>
            &nbsp;&nbsp;&nbsp;
        </div>
    </nav>
</template>

<script scoped>
    export default {
        name: 'AdminNavBar',
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