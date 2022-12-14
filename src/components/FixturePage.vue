<template>
    <HarunNavBar></HarunNavBar>
    <SideBar></SideBar>
    <div class="whole">
        
        <div class="container">
            <div v-if="items.length === 0 && finishedLoading === true">
                No Matches Found!
            </div>
            <div v-else-if="items.length === 0 || finishedLoading === false">
                <loadingPage></loadingPage>
            </div>
            <table v-else>
                <tr class="head">
                    <td class="text">
                        Teams
                    </td>
                    <td class="text">
                        Referee
                    </td>
                    <td class="text">
                        Stadium
                    </td>
                    <td class="text">
                        Date and Time
                    </td>
                </tr>

                <div  v-for="item in items[0]" v-on:click="navToMp(item.id)" :key="item.id">
                    <tr class="match" v-if="item.status === 'Match Finished'">
                        <td class="text">
                            {{item.homeTeamName}} <h3>&nbsp; {{item.goalHome}} - {{item.goalAway}} &nbsp;</h3> {{item.awayTeamName}}
                        </td>
                        <td class="text">
                            {{item.referee}}
                        </td>
                        <td class="text">
                            {{item.stadiumName}}
                        </td>
                        <td class="text">
                            {{item.dateAndTime.toString().replace("T", " ")}}
                        </td>
                    </tr>
                    <tr class="matchPlayed" v-else>
                        <td class="text">
                            {{item.homeTeamName}} vs. {{item.awayTeamName}}
                        </td>
                        <td class="text">
                            {{item.referee}}
                        </td>
                        <td class="text">
                            {{item.stadiumName}}
                        </td>
                        <td class="text">
                            {{item.dateAndTime.toString().replace("T", " ")}}
                        </td>
                    </tr>
                </div>
            </table>
        </div>
    </div>
</template>


<script>
    import HarunNavBar from './HarunNavBar.vue';
    import SideBar from './SideBar.vue';
    import loadingPage from './loadingPage';
    export default {
        name: "FixturePage",
        path: "fixturePage",
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
            fetch("https://tfb308.herokuapp.com/api/v1/match/all", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.items.push(data.returnObject);
                }
                this.finishedLoading = true;
            });
        },
        methods: {
            navToMp(id){
                
                this.$router.push({ name: "MatchPage", params: {matchId: id}});
            }
        }
    };

</script>

<style lang="scss" scoped>

    .whole{
        display: flex;
    }
    .container{
        width: 100%;
        margin-left: 0%;
    }
    .head{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 16px 10px 16px;
        margin: 20px 20px 20px 20px;
        margin-left: 10%;
        border: 1px solid black;
        border-radius: 10px;
        font-weight: bold;
        font-size: larger;
        background-color: rgb(156, 35, 128);
        color: white;
        width: 80%;
    }

    .match{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        padding: 20px 16px 20px 16px;
        margin-left: 10%;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
        font-size: small;
        width: 80%;
    }
    .match:hover{
        cursor:pointer;
        transform: scale(1.1);
        background-color: rgba(33, 66, 114, 0.818);
        color: white;
    }

    table{
        width: 100%;
    }

    td {
        text-align: center;
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


</style>