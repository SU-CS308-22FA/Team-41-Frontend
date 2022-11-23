<template>
    <div class="whole">
        <SideBar></SideBar>
        
        <div class="container">
            <h1>Referee Info</h1>
            <div class="referee2">
                <div class="name">
                        {{this.name}}
                    </div>
                    
                    <div class="name">
                        Rating <br> {{this.rating}}
                    </div>
                    <div class="name">
                        Total Votes <br> {{this.totalVote}}
                    </div>
            </div>
            <h1>Matches</h1>
            <div  v-for="match in matches" :key="match.id">
                <span  class="match">
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

    
</template>




<script>
import SideBar from './SideBar.vue';
    export default {
        props: ["refereeId"],
        path: "referees/:refereeId",
        name: "RefereePage",
        components: {
            SideBar
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
                    
                    console.log(this.matches)
                }
            });
        }

    }


</script>



<style>
    .whole{
        display: flex;
    }
    .container{
        width: 39%;
        margin-left: 10%;
    }

    .match{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: lightblue;
        font-size: small;
    }

    .referee2{
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    padding: 10px 16px;
    margin: 20px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: lightseagreen;
}

.name{
    
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}


</style>