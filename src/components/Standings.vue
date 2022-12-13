<template>
    <HarunNavBar></HarunNavBar>
    <SideBar></SideBar>
    <div class="whole">
        <div class="standings">
            
            <div v-if="standings.length === 0 || finishedLoading === false">
                <loadingPage></loadingPage>
            </div>
            <div >
                <table >
                    <tr>
                        <th>Position</th>
                        <th>Club Name</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Drawn</th>
                        <th>Lost</th>
                        <th>Goals For</th>
                        <th>Goals Against</th>
                        <th>Goal Difference</th>
                        <th>Points</th>
                    </tr>
                    <tr v-for="item in standings" :key="item.teamId">
                        <td>{{item.rank}}</td>
                        <td>{{item.teamName}}</td>
                        <td>{{item.winCount + item.drawnCount + item.loseCount}}</td>
                        <td>{{item.winCount}}</td>
                        <td>{{item.drawnCount}}</td>
                        <td>{{item.loseCount}}</td>
                        <td>{{item.goalsFor}}</td>
                        <td>{{item.goalsAgainst}}</td>
                        <td>{{item.average}}</td>
                        <td>{{item.points}}</td>

                    </tr>
                </table>
            </div>
        </div>
    </div>

</template>


<script>
    import HarunNavBar from './HarunNavBar.vue';
    import SideBar from './SideBar.vue';
    //import loadingPage from './loadingPage';

    export default{
        path: "/standings",
        name: "AllStandings",
        components: {
            HarunNavBar,
            SideBar
        },
        data(){
            return {
                standings: []
            }
        },
        mounted(){
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/standings", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.standings = data.returnObject;
                }
                this.finishedLoading = true;
            });
        }
    }


</script>



<style>

.standings{
    display: flex;
    margin: auto;
}

th{
    
    padding: 30px;
}

</style>