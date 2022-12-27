<template>
    
    <NewNav></NewNav>

        <div class="container" v-if="isLoaded === 2">
            <form class="newMatch-form" @submit.prevent="addMatch">
                <div>
                    <label for="homeId">Choose Home Team</label>
                    <select name="homeId" v-model="homeId" >
                        <option v-for="team in teams" :key="team.id" :value="team.id" :disabled="team.id === awayId"> {{ team.name }} </option>
                    </select>

                    <label for="homeGoals">Enter Home Goals:</label>
                    <input id="homeGoals" type="number" v-model.number="homeGoals" min="0" />
                </div>
                
                <div>
                    <label for="awayId">Choose Away Team</label>
                    <select name="awayId" v-model="awayId" >
                        <option v-for="team in teams" :key="team.id" :value="team.id" :disabled="team.id === homeId"> {{ team.name }} </option>
                    </select>

                    <label for="awayGoals">Enter Away Goals:</label>
                    <input id="awayGoals" type="number" v-model.number="awayGoals" min="0" />
                </div>
                
                <div>
                    <label for="refereeId">Choose Referee</label>
                    <select name="refereeId" v-model="refereeId" >
                        <option v-for="ref in referees" :key="ref.id" :value="ref.id"> {{ ref.name }} </option>
                    </select>
                </div>
                
                <div>
                    <label for="date">Enter Match Date & Time:</label>
                    <input id="date" type="datetime-local" v-model="date" />
                </div>

                <button class="addMatch" :disabled="userId === ''">
                    <a>Add Match</a>
                </button>
            
            </form>
        </div>
        <div v-else>
            <Loading></Loading>
        </div>

</template>

<script>
    import NewNav from './newNav.vue'
    import Loading from './loadingPage.vue';
    export default {
        path: '/addMatch',
        name: 'AddMatch',
        components: {
            NewNav,
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
                teams: [],
                referees: [],
            };
        },
        mounted() {
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
        },
        methods: {
            addMatch() {
                const {userId, homeId, awayId, refereeId, homeGoals, awayGoals} = this;
                const date = this.date + ":00";

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

<style></style>
