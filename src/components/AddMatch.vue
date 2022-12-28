<template>
    <AdminNavBar></AdminNavBar>
    <div v-if="isLoaded === 2 || true">
        <div class="add-match-page">
            <div class="col d-flex justify-content-center">
                <form class="add-match-form">
                    <div class="row col-sm-3" style="margin: auto; width: 400px;">
                        <h2 class="add-match-form-title">Add Match</h2>

                        <label for="homeId">Choose Home Team</label>
                        <select class="add-match-elem" name="homeId" v-model="homeId" >
                            <option v-for="team in teams" :key="team.id" :value="team.id" :disabled="team.id === awayId"> {{ team.name }} </option>
                        </select>
                        <label for="homeGoals">Enter Home Goals:</label>
                        <input class="add-match-elem" id="homeGoals" type="number" v-model.number="homeGoals" min="0" :disabled="without_result"/>

                        <label for="awayId">Choose Away Team</label>
                        <select class="add-match-elem" name="awayId" v-model="awayId" >
                            <option v-for="team in teams" :key="team.id" :value="team.id" :disabled="team.id === homeId"> {{ team.name }} </option>
                        </select>
                        
                        <label for="awayGoals">Enter Away Goals:</label>
                        <input class="add-match-elem" id="awayGoals" type="number" v-model.number="awayGoals" min="0" :disabled="without_result"/>

                        <label for="refereeId">Choose Referee</label>
                        <select class="add-match-elem" name="refereeId" v-model="refereeId" >
                            <option v-for="ref in referees" :key="ref.id" :value="ref.id"> {{ ref.name }} </option>
                        </select>

                        <label for="date">Enter Match Date & Time:</label>
                        <input class="add-match-elem" id="date" type="datetime-local" v-model="date" />

                        <a>
                            <input type="checkbox" id="without_result" name="without_result" v-model="without_result">&nbsp;
                            <label for="vehicle1">I will add without results</label>
                        </a>
                    </div>
                    <div class="row row-sm-3" style="margin: auto; width: fit-content;">
                        <button class="btn btn-primary but-add" @click="addMatch()">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div v-else>
        <Loading></Loading>
    </div>
</template>

<script>
    import AdminNavBar from './adminNavbar.vue'
    import Loading from './loadingPage.vue';
    export default {
        path: '/addMatch',
        name: 'AddMatch',
        components: {
            AdminNavBar,
            Loading,
        },
        
        data() {
            return {
                userId: "",
                homeId: "",
                awayId: "",
                refereeId: "",
                homeGoals: 0,
                awayGoals: 0,
                date: "",
                isLoaded: 0,
                without_result: false,
                teams: [],
                referees: [],
            };
        },
        mounted() {
            let admin = false;
            if(localStorage.isAdmin) admin = localStorage.isAdmin === "true";
            if(!admin) {
                this.$router.replace("/");
            }
            else {
                if(localStorage.userId) this.userId = localStorage.userId;
                this.isLoaded = 0;
                const requestOptions = {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                };
                fetch("https://tfb308.herokuapp.com/api/v1/team/all", requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data.status === "200") {
                        this.teams = data.returnObject;
                        this.isLoaded += 1;
                    }
                });

                fetch("https://tfb308.herokuapp.com/api/v1/referee/all", requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data.status === "200") {
                        this.referees = data.returnObject;
                        this.isLoaded += 1;
                    }
                });
            }
        },
        methods: {
            addMatch() {
                const {userId, homeId, awayId, refereeId, without_result} = this;
                const date = this.date + ":00";

                let homeGoals = this.datehomeGoals;
                let awayGoals = this.dateawayGoals;

                if(without_result === true) {
                    homeGoals = -1;
                    awayGoals = -1;
                }

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId, 
                        homeId, 
                        awayId, 
                        refereeId, 
                        homeGoals, 
                        awayGoals,
                        date
                    })
                };

                //endpoint to be determined
                fetch("https://tfb308.herokuapp.com/api/v1/match/add_match", requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data.status !== "200"){
                        alert("Data Couldn't be Changed!\n"+data.returnObject);
                        return;
                    }
                    alert("Data Updated Successfully!");
                    this.$router.replace("/fixturePage");
                });
            }
        },
    };
</script>

<style scoped>
    .add-match-page{
        margin-top: 70px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        display: flexbox;
        min-height: calc(100vh - 70px);
        background: rgba(185, 185, 185, 0.725);
    }

    .add-match-form{
        background-color: ghostwhite;
        width: fit-content;
        height: fit-content;
        padding:30px;
        margin: auto;
        display:grid;
        border-radius: 8px;
        text-align: center;
    }

    .add-match-form-title{
        color: rgba(17, 73, 158, 0.818);
        margin-bottom: 50px;
        text-align: center;
    }

    .add-match-elem{
        margin-bottom: 15px;
        text-align: center;
    }

    .but-add{
        margin-top: 60px;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 25px;
        width: 210px;
    }

    .but-add:hover{
        transform: scale(1.1);
    }
</style>