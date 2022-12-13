<template>
    <HarunNavBar></HarunNavBar>
    <SideBar></SideBar>
    <div class="whole">
        <div class="standings">
            
            <div v-if="standings.length === 0 || finishedLoading === false">
                <loadingPage></loadingPage>
            </div>
            <div >
                <div class="headings">
                    <table >
                    <tr class="col">
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
                    <tr class= "cl" v-for="item in standings.slice(0,1)" :key="item.teamId">
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
                    <tr class= "uefa" v-for="item in standings.slice(1,3)" :key="item.teamId">
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
                    <tr class= "pos" v-for="item in standings.slice(3,-4)" :key="item.teamId">
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
                    <tr class= "down" v-for="item in standings.slice(-4)" :key="item.teamId">
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


.standings th{
    
    padding: 10px;
    
}
.standings td{
    padding: 30px;
    background-color: ghostwhite;
    
}
.headings{
	text-align: center;
	text-decoration: none;
	color: black;
	margin: 30px;
	display: block;
}

.cl td{
    color:rgb(7, 84, 7);
}
.uefa td{
    color: lightblue;
}
.pos td{
    color: black;
}
.down td{
    color: red;
}

.cl:hover{
	background-color: #77ff21;
}

.cl:hover td{
	color: #000000;
}

.down:hover{
	background-color: #ff7b21;
}
.uefa:hover{
	background-color: #77ff21;
}

.uefa:hover td{
	color: #000000;
}

.down:hover td{
	color: #000000;
}

</style>