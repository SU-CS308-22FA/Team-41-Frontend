<template>
    <AdminNavBar></AdminNavBar>
    <div class="admin-panel">
        <div v-if="finishedLoading === true">
            <div class="row">
                <div class="col">
                    <div class="card panel-box panel-box-but">
                        <div class="card-body" @click="this.$router.replace('/usersList')" id="users-panel">
                            <h4 class="card-title">{{ userCount }}</h4>
                            <h4 class="card-title">Users</h4>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card panel-box panel-box-but" @click="this.$router.replace('/teamsList')" id="teams-panel">
                        <div class="card-body">
                            <h4 class="card-title">{{ teams.length }}</h4>
                            <h4 class="card-title">Teams</h4>
                        </div>
                    </div>
                  </div>
                <div class="col">
                    <div class="card panel-box panel-box-but" @click="this.$router.replace('/showComments')" id="reports-panel">
                        <div class="card-body">
                            <h4 class="card-title">{{ reports.length }}</h4>
                            <h4 class="card-title">Reports</h4>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card panel-box panel-box-but" @click="this.$router.replace('/showFeedback')" id="feedbacks-panel">
                        <div class="card-body">
                            <h4 class="card-title">{{ feedbacks.length }}</h4>
                            <h4 class="card-title">Feedbacks</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="card panel-box">
                        <div class="card-body" style="text-align: center;">
                            <h4 class="card-title">Today's Matches</h4>
                            <table class="todays-match-box" v-if="matches.length > 0">
                                <tr>
                                    <th>Sides</th>
                                    <th>Status</th>
                                    <th>Referee</th>
                                    <th>Stadium</th>
                                    <th>Date</th>
                                </tr>
                                <tr v-for="match in matches" :key="match.id" class="match-row" @click="goToMatch(match.id)" :id='"match-panel-"+match.id'>
                                    <td>{{match.homeTeamName}} vs. {{match.awayTeamName}}</td>
                                    <td v-if="match.finished === true">{{match.goalHome}} vs. {{match.goalAway}}</td>
                                    <td v-else>Not Played</td>
                                    <td>{{match.referee}}</td>
                                    <td>{{match.stadiumName}}</td>
                                    <td>{{match.dateAndTime.replace('T', ' ')}}</td>
                                </tr>
                            </table>
                            <div class="empty-box" v-else>
                                No matches for Today!
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card panel-box">
                        <div class="card-body">
                            <h4 class="card-title">Some Reports</h4>
                            <table class="todays-match-box" v-if="reports.length > 0">
                                <tr class="report-row">
                                    <th>Username</th>
                                    <th>Comment</th>
                                    <th>Reason</th>
                                    <th>Action</th>
                                </tr>
                                <tr v-for="report in reports" :key="report.id" class="report-row">
                                    <td>{{report.comment.username}}</td>
                                    <td>{{report.comment.body}}</td>
                                    <td>{{report.type}}</td>
                                    <td>
                                        <button class="btn btn-primary act-but" @click="delRep(report.id)" :id='"delete-user-panel-"+report.id'>Delete Report</button>
                                        <button class="btn btn-danger act-but" @click="banUser(report.id, report.comment.userId)" :id='"ban-user-panel-"+report.id'>Ban User</button>
                                    </td>
                                </tr>
                            </table>
                            <div class="empty-box" v-else>
                                No Reports Found!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <loadingPage></loadingPage>
        </div>
    </div>
</template>

<script>
    import AdminNavBar from "./adminNavbar.vue";
    import loadingPage from "./loadingPage.vue";

    export default {
        path: "/AdminHome",
        name: "AdminHome",
        components: {
            AdminNavBar,
            loadingPage,
        },
        data() {
            return {
                userCount: "",
                teams: [],
                reports: [],
                feedbacks: [],
                matches: [],
                finishedLoading: false,
                userId: "",
            };
        },
        mounted() {
            if(localStorage.userId) this.userId = localStorage.userId;

            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };

            fetch("https://tfb308.herokuapp.com/api/v1/user/count", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.userCount = data.returnObject;
                }

                fetch("https://tfb308.herokuapp.com/api/v1/team/all", requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data.status === "200") {
                        this.teams = data.returnObject;
                    }

                    fetch("https://tfb308.herokuapp.com/api/v1/report/all", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if(data.status === "200") {
                            this.reports = data.returnObject;
                        }

                        fetch("https://tfb308.herokuapp.com/api/v1/feedback", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            if(data.status === "200") {
                                this.feedbacks = data.returnObject;
                            }

                            fetch("https://tfb308.herokuapp.com/api/v1/match/today", requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                if(data.status === "200") {
                                    this.matches = data.returnObject;
                                }
                            });
                        });
                    });
                });
            }).then(() => {
                this.finishedLoading = true;
            });
        },
        methods: {
            goToMatch(matchId) {
                this.$router.push({ name: "MatchPage", params: {matchId: matchId}});
            },

            banUser(id, userId) {
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                };
                fetch(
                    "https://tfb308.herokuapp.com/api/v1/user/" +
                    this.userId +
                    "/ban/" +
                    userId,
                    requestOptions
                )
                .then((response) => response.json())
                .then((data) => {
                    this.finishedLoading = true;
                    if (data.status === "200") {
                        this.delRep(id)
                    } else {
                        alert(data.returnObject);
                    }
                });
            },

            delRep(id) {
                const issuerId = parseInt(this.userId);
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id, issuerId })
                };
                fetch("https://tfb308.herokuapp.com/api/v1/report/close", requestOptions)
                .then((response) => response.json())
                .then(() => {
                    location.reload();
                });
            },
        },
    };
</script>

<style scoped>
    .admin-panel {
        margin-top: 70px;
        padding: 75px 25px 25px 25px;
        min-height: calc(100vh - 70px);
        background: rgba(185, 185, 185, 0.725);
    }

    .panel-box {
        margin: 15px 10px 25px 10px;
        border-radius: 8px;
        background-color: beige;
        border: 2px outset beige;
    }

    .panel-box-but:hover {
        border: 2px solid black;
        transform: scale(1.1);
    }

    .todays-match-box{
        overflow-y:scroll;
        height: 450px;
        width: auto;
        display:block;
        margin: auto;
    }

    .match-row:hover{
        color: red;
        font-weight: bold;
        font-style: italic;
    }

    th{
        background-color: aquamarine;
        border: 1px solid aquamarine;
        width: fit-content;
        padding: 10px 25px 10px 25px;
        margin: 5px 20px 5px 20px;
    }

    td{
        background-color: azure;
        border: 1px solid aquamarine;
        width: fit-content;
        padding: 10px 15px 10px 15px;
        margin: 5px 20px 5px 20px;
    }

    tr{
        width: auto;
        margin: 2px 10px 2px 10px;
    }

    .act-but{
        width: fit-content;
        padding: auto;
        margin: 2px 5px 2px 5px;
    }

    .act-but:hover{
        transform: scale(1.1);
    }

    .empty-box{
        background-color: aquamarine;
        height: 450px;
        width: auto;
        display:block;
        margin: auto;
        padding: auto;
        text-align: center;
        line-height: 450px;
        font-size: large;
        font-weight: bold;
        font-style: italic;
    }
  
</style>
