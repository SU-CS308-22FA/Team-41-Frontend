<template>
    <NavBar></NavBar>
    <div class="container">
        <div class="card team-info-box">
            <div class="row">
                <div class="col-md-4">
                    <img :src=team.logoURL class="card-img">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <button v-on:click="addToFav" class="card-button">
                            <i
                                class="bx"
                                :class="'bx-heart'"
                            />
                        </button>
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


<!--
        <button v-on:click="hideOrUnhide('players')" class="btn btn-primary team-info-but">{{ showP }} Players</button>
        <button v-on:click="hideOrUnhide('matches')" class="btn btn-info team-info-but">{{ showM }} Matches</button>
        
        <br><br>

        <table class="players">
            <tr class="col">
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

        <br><br>

        <table class="matches">
            <tr class="col">
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

        <br><br>
-->

<script scoped>
    import NavBar from './navbar.vue'
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
            }
        },
        mounted() {
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
            goToMatch(id) {
                this.$router.push({ name: "MatchPage", params: {matchId: id}});
            },
            change(block) {
                if(block === "players") {
                    if(this.showP === "Show") {
                        this.showP = "Hide";
                    }
                    else {
                        this.showP = "Show";
                    }
                }
                else {
                    if(this.showM === "Show") {
                        this.showM = "Hide";
                    }
                    else {
                        this.showM = "Show";
                    }
                }
            },
            hideOrUnhide(block){
                var x = document.querySelector("." + block);
                if (x.style.display === "block") {
                    x.style.display = "none";
                    this.change(block);
                }
                else {
                    x.style.display = "block";
                    this.change(block);
                }
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
                if(data.status === "200") {
                    alert("Succesfully added to your fav list.");
                    return;
                }
                alert(data.returnObject);
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

    .card-button{
        align-items: right;
        position: absolute;
        top: 3px;
        right: 5px;
        border-width: 0px;
        background-color: white;
        font-size: 20px;
    }

    .card-img{
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