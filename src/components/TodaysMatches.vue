<template>
    <HarunNavBar></HarunNavBar>
    <SideBar></SideBar>
    <div class="whole">
        
        <div class="container">
            <div v-if="items.length === 0 && finishedLoading === true">
                <h3>No Matches Found!</h3>
                
            </div>
            <div v-else-if="items.length === 0 || finishedLoading === false">
                <loadingPage></loadingPage>
            </div>
            <div v-else>
                <span class="head">
                    <div class="text">
                        Teams
                    </div>
                    <div class="text">
                        Referee
                    </div>
                    <div class="text">
                        Stadium
                    </div>
                    <div class="text">
                        Date and Time
                    </div>
                </span>

                <div v-for="item in items" :key="item.referee">
                    <span class="match" v-if="item.status === 'Match Finished'">
                        <div class="text">
                            {{item.homeTeamName}} <h3>&nbsp; {{item.goalHome}} - {{item.goalAway}} &nbsp;</h3> {{item.awayTeamName}}
                        </div>
                        <div class="text">
                            {{item.referee}}
                        </div>
                        <div class="text">
                            {{item.stadiumName}}
                        </div>
                        <div class="text">
                            {{item.dateAndTime.toString().replace("T", " ")}}
                        </div>
                    </span>
                    <span class="matchPlayed" v-else>
                        <div class="text">
                            {{item.homeTeamName}} vs. {{item.awayTeamName}}
                        </div>
                        <div class="text">
                            {{item.referee}}
                        </div>
                        <div class="text">
                            {{item.stadiumName}}
                        </div>
                        <div class="text">
                            {{item.dateAndTime.toString().replace("T", " ")}}
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import HarunNavBar from './HarunNavBar.vue';
    import SideBar from './SideBar.vue';
    import loadingPage from './loadingPage';
    export default {
        name: "TodaysMatches",
        path: "todaysMatches",
        components: {
            HarunNavBar,
            SideBar,
            loadingPage
        },
        data(){
            return {
                items: [],
                finishedLoading: false,
            }
        },
        mounted() {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            
            fetch("https://tfb308.herokuapp.com/api/v1/match/today", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.items = data.returnObject;
                }
                this.finishedLoading = true;
            });
        },
    };

</script>

<style lang="scss" scoped>

.whole{
        display: flex;
    }
    .container{
        width: 100%;
        margin-left: 0%;
        width: 100%;
    }

    .head{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 10px;
        font-weight: bold;
        font-size: larger;
        background-color: navy;
        color: white;
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
    
    .matchPlayed{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: turquoise;
        font-size: small;
    }

    .text{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }

    h3{
        margin-top: 5%;
        font-size: 25px;
    }


</style>