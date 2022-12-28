<template>
    <!-- Modal -->
    <div>
        <div id="myModal" ref="modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Error</h5>
            </div>
            <div class="modal-body">
                <p>{{ errorMsg }}</p>
            </div>
            <div class="modal-footer">
                <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="closeModal()"
                >
                Close
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>

    <NavBar></NavBar>
    <div class="container">
        <div class="card team-info-box">
            <div class="row">
                <div class="col-md-4">
                    <img :src=team.logoURL class="card-img team-info-box-logo">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <svg v-if="isLoggedIn()" @click="addToFav" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart fav-button" viewBox="0 0 16 16">
                            <path id="favv" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                        <h5 class="card-title">{{team.name}}</h5>
                        <br>
                        <p class="card-text">City: {{team.city}}</p>
                        <p class="card-text">Stadium: {{team.stadiumName}}</p>
                    </div>
                </div>
            </div>
        </div>

        <br><br>
        
        <div class="row">
            <div class="col-sm-4">
                <table class="player-box">
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Kit Number</th>
                    </tr>
                    <tr v-for="player in players" :key="player.id">
                        <td><img :src=player.pictureURL class="card-img"></td>
                        <td>{{player.name}}</td>
                        <td>{{player.position}}</td>
                        <td v-if="player.number !== -1">{{player.number}}</td>
                        <td v-else>does not have a kit number</td>
                    </tr>
                </table>
            </div>
            <div class="col-sm-8">
                <table class="match-box">
                    <tr>
                        <th>Sides</th>
                        <th>Status</th>
                        <th>Referee</th>
                        <th>Stadium</th>
                        <th>Date</th>
                    </tr>
                    <tr v-for="match in matches" :key="match.id" class="matchx" @click="goToMatch(match.id)">
                        <td>{{match.homeTeamName}} vs. {{match.awayTeamName}}</td>
                        <td v-if="match.finished === true">{{match.goalHome}} vs. {{match.goalAway}}</td>
                        <td v-else>Not Played</td>
                        <td>{{match.referee}}</td>
                        <td>{{match.stadiumName}}</td>
                        <td>{{match.dateAndTime.replace('T', ' ')}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>      
</template>

<script scoped>
    import NavBar from './navbar.vue'
    import { Modal } from "bootstrap";

    export default {
        props: ["teamId"],
        path: '/teamPage/:teamId',
        name: 'TeamPage',
        components: {
            NavBar
        },
        data(){
            return {
                team: "",
                logo: "",
                players: [],
                matches: [],
                showP: "Show",
                showM: "Show",
                errorMsg: "",
                myModal: null,
            }
        },
        mounted() {
            this.myModal = new Modal(document.getElementById("myModal"));

            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/team/" + this.teamId.toString(10), requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.team = data.returnObject;
                }
            });

            fetch("https://tfb308.herokuapp.com/api/v1/player/team/" + this.teamId.toString(10), requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.players = data.returnObject;
                }
            });

            fetch("https://tfb308.herokuapp.com/api/v1/match/all/" + this.teamId.toString(10), requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.matches = data.returnObject;
                }
            });
        },
        methods: {
            isLoggedIn(){
                if(localStorage.isLogedIn === undefined) return false;
                return true;
            },

            goToMatch(id) {
                this.$router.push({ name: "MatchPage", params: {matchId: id}});
            },

            
            closeModal() {
                this.myModal.hide();
            },

            addToFav(){
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ teamId:this.teamId.toString(10),userId:localStorage.userId})
                };
                fetch("https://tfb308.herokuapp.com/api/v1/user/favTeams", requestOptions)
                .then(response => response.json())
                .then(data => {
                if(data.status !== "200") {
                    this.errorMsg = data.returnObject;
                    this.myModal.show();
                }
                else {
                    document.getElementById("favv").setAttribute("d", "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z");
                    document.getElementById("favv").setAttribute("fill-rule", "evenodd");
                }
            });
            }
        },
    };
</script>

<style scoped>

    .team-info-box{
        margin-top: 100px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        border-radius: 10px;
        background: rgba(185, 185, 185, 0.725);
    }

    .card-title{
        text-align: left;
        padding-bottom: 7%;
        font-size: 40px;
    }

    .card-text{
        text-align: left;
        font-size: 15px;
        font-style: italic;
    }

    .fav-button{
        align-items: right;
        position: absolute;
        top: 20px;
        right: 25px;
        border-width: 0px;
        font-size: 50px;
        height: 30px;
    }

    .fav-button:hover{
        transform: scale(1.5);
        color: red;
    }

    .team-info-box-logo{
        border-width: 0px;
        max-height: 200px;
        max-width: 200px;
        display: inline;
        
    }

    td {
        border: 1px solid black;
        padding: 15px;
        max-width: 400px;
        height: 80px;
    }

    .team-info-but{
        margin: 5px;
    }

    .team-info-but:hover{
        transform: scale(1.1);
    }

    .player-box{
        border: 1px solid black;
        overflow-y:scroll;
        height:450px;
        width: fit-content;
        display:block;
    }

    .match-box{
        border: 1px solid black;
        overflow-y:scroll;
        height: 450px;
        width: fit-content;
        display:block;
    }

    .matchx:hover{
        color: red;
        background: rgb(208, 202, 202);
    }

</style>