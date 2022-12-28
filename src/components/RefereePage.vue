<template>
    <NavBar></NavBar>
    <div class="container">
        <div class="card referee-info-box">
            <div class="row">
                <div class="col">
                    <div class="card-body">
                        <h5 class="card-title ref-name">{{this.name}}</h5>
                        <div class="row">
                            <div class="col">
                                <p class="card-text ref-stats">Rating: {{this.rating}}</p>
                            </div>
                            <div class="col">
                                <p class="card-text ref-stats">Total Votes: {{this.totalVote}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <br><br>

        <table class="referee-match-table">
            <tr class="col">
                <th>Sides</th>
                <th>Status</th>
                <th>Stadium</th>
                <th>Date</th>
            </tr>
            <tr v-for="match in matches" :key="match.id" class="referee-match" @click="goToMatch(match.id)">
                <td>{{match.homeTeamName}} vs. {{match.awayTeamName}}</td>
                <td v-if="match.finished === true">{{match.goalHome}} vs. {{match.goalAway}}</td>
                <td v-else>Not Played</td>
                <td>{{match.stadiumName}}</td>
                <td>{{match.dateAndTime.replace('T', ' ')}}</td>
            </tr>
        </table>

        <br><br>
    </div>      
</template>

<script>
    import NavBar from './navbar.vue';
    export default {
        props: ["refereeId"],
        path: "referees/:refereeId",
        name: "RefereePage",
        components: {
            NavBar,
        },
        data(){
            return {
                name: "",
                totalVote: 0,
                rating: 0.0,
                matches: []
            };
        },
        mounted(){
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/referee/"+this.refereeId.toString(10),  requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.name = data.returnObject.name;
                    this.totalVote = data.returnObject.totalVote;
                    this.rating = data.returnObject.rating;
                    this.matches = data.returnObject.matchesList;
                }
            });
        },
        methods: {
            goToMatch(id) {
                this.$router.push({ name: "MatchPage", params: {matchId: id}});
            },
        }
    }

</script>

<style scoped>

    .referee-info-box{
        margin-top: 100px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        border-radius: 10px;
        background: rgba(185, 185, 185, 0.725);
    }

    .ref-name{
        text-align: left;
        padding-bottom: 7%;
        font-size: 40px;
        font-weight: bolder;
        text-align: center;
    }

    .ref-stats{
        text-align: left;
        font-size: 25px;
        font-style: italic;
        text-align: center;
    }

    .referee-match-table{
        border: 1px solid black;
        width: fit-content;
        height: 400px;
        margin: auto;
    }

    td {
        padding: 15px;
        max-width: max-content;
        height: 80px;
        border:1px solid black;
    }
    
    .not-played{
        background-color: blanchedalmond;
    }
    
    .played{
        background-color: turquoise;
    }

    .referee-match:hover{
        color: rgba(33, 66, 114, 0.818);
        background: rgb(208, 202, 202);
        font-style: italic;
    }

</style>