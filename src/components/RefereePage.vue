<template>
    <HarunNavBar></HarunNavBar>
    <SideBar></SideBar>
    <div class="whole">

        
        <div class="container">
            <br>
            <h1>Referee Info</h1>
            <br>
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
            <br>
            <h1>Matches</h1>
            
            <div  v-for="match in matches" :key="match.id">
                <span  class="match">
                        <div class="name">
                            {{match.homeTeamName}} vs. {{match.awayTeamName}}
                        </div>
                        <div class="name" v-if="match.finished === true">
                            {{match.goalHome}} - {{match.goalAway}}
                        </div>
                        <div class="name" v-if="(match.finished === false)">
                            {{match.dateAndTime.toString().replace("T", " ")}}
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
import HarunNavBar from './HarunNavBar.vue';
    export default {
        props: ["refereeId"],
        path: "referees/:refereeId",
        name: "RefereePage",
        components: {
            SideBar,
            HarunNavBar
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
        padding: 20px 16px 20px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: lightblue;
        font-size: small;
        width: 200%;
        
    }

    .referee2{
    text-decoration: none;
   
    display: flex;
    justify-content: space-between;
    padding: 10px 16px 10px;
    width: 130%;
    margin-left: 38%;
    border: 1px solid black;
    border-radius: 10px;
    background-color: rgba(33, 66, 114, 0.818);
}

    .referee2 .name{
        
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: white;
    }
    h1{
        margin:auto;
        width: 200%;
    }
  

</style>