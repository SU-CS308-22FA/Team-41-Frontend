<template>
    <div class="whole">
        <SideBar></SideBar>
        <div class="container">
            <span  class="team">
                <img :src=logo class="logo">
                <a class="name">
                    {{teamName}}
                </a>
            </span >
            <button v-on:click="addToFav">Add to Favorites</button>
            <br><br>
            <button v-on:click="hideOrUnhide('players')">Hide/Unhide Players</button>
            <div class="players">
                <div v-for="player in players" :key="player.id">
                    <div class="team">
                        <div class="logo">
                            <img :src=player.pictureURL>
                        </div>
                        <div class="name">
                            {{player.name}}
                        </div>
                        <div class="name">
                            {{player.position}}
                        </div>
                        <div class="name" v-if="player.number !== -1">
                            {{player.number}}
                        </div>
                        <div class="name" v-else>
                            does not have a kit number
                        </div>
                    </div>
                </div>
            </div>

            <br><br>
            
            <button v-on:click="hideOrUnhide('matches')">Hide/Unhide Matches</button>
            <div class="matches">
                <div v-for="match in matches" :key="match.id">
                    <span  class="team">
                        <div class="name">
                            {{match.homeTeamName}} vs. {{match.awayTeamName}}
                        </div>
                        <div class="name" v-if="match.finished === true">
                            {{match.goalHome}} vs. {{match.goalAway}}
                        </div>
                        <div class="name">
                            {{match.referee}}
                        </div>
                        <div class="name">
                            {{match.stadiumName}}
                        </div>
                    </span >
                </div>
            </div>
        </div>    
    </div>        
</template>

<script>
    import SideBar from './SideBar.vue';
    //import loadingPage from './loadingPage';
    export default {
        props: ["teamId"],
        path: '/teamPage/:teamId',
        name: 'TeamPage',
        components: {
            SideBar,
            //loadingPage
        },
        data(){
            return {
                teamName: "",
                logo: "",
                players: [],
                matches: [],
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
                    this.teamName = data.returnObject.name;
                    this.logo = data.returnObject.logoURL;
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
            hideOrUnhide(block){
                var x = document.querySelector("." + block);
                if (x.style.display === "block") {
                    x.style.display = "none";
                }
                else {
                    x.style.display = "block";
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

<style>
.whole{
        display: flex;
    }
    .container{
        width: 39%;
        margin-left: 10%;
    }

    .team{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: lightblue;
    }
    .team:hover{
        border: 1px solid blue;
    }

    .logo{
        width:  50%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .name{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }
    .players{
        display:none;
    }
    .matches{
        display:none;
    }
</style>