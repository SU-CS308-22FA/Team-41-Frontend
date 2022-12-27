<template>
    <NewNav></NewNav>
    <div class="container">
        <div class="card">
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
        
        <button v-on:click="hideOrUnhide('players')" class="btn btn-primary">{{ showP }} Players</button>
        <button v-on:click="hideOrUnhide('matches')" class="btn btn-info">{{ showM }} Matches</button>
        
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
    </div>      
</template>

<script scoped>
    import NewNav from './newNav.vue'
    export default {
        props: ["teamId"],
        path: '/teamPage/:teamId',
        name: 'TeamPage',
        components: {
            NewNav
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

    .card{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        margin: 20px;
        border-radius: 10px;
        color: black;
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

    table{
        border: 1px solid black;
        width: fit-content;
        height: 400px;
        margin: auto;
        overflow: auto; /* make the div scrollable */
    }

    td, th {
        padding: 15px;
        max-width: 400px;
        height: 80px;
    }

    .players{
        display:none;
    }

    .matches{
        display:none;
    }

    .matchx:hover{
        color: red;
        background: rgb(208, 202, 202);
    }

</style>