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
                <div class="grid-container">
                    <div class="grid-item-cl"></div>
                    <div class="grid-item">Champions League Qualifiers</div>
                    <div class="grid-item-uefa"></div>  
                    <div class="grid-item">UEFA League Qualifiers</div>
                    <div class="grid-item-down"></div>
                    <div class="grid-item">Relegation</div>   
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
    font-weight: bold;
}
.standings td{
    padding: 30px;
    font-weight: bold;
    
}
.headings{
	text-align: center;
	text-decoration: none;
	color: black;
	margin: 30px;
	display: block;
    background: ghostwhite;
}



.pos {
    color: rgb(57, 55, 55);
    background: ghostwhite;
   
}
.pos:hover{
	background-color: grey;
}

.pos:hover td{
	color: #000000;
    font-size: larger;
}

.down {
    color: red;
    background: ghostwhite;
}
.cl{
    color: #58d708;
}
.cl:hover{
	background-color: #58d708;
}

.cl:hover td{
	color: #000000;
    font-size: larger;
}

.down:hover{
	background-color: red;
}

.uefa {
    color: rgb(32, 144, 123);
    background: ghostwhite;
    
}
.uefa:hover{
	background-color: rgb(32, 144, 123);
}

.uefa:hover td{
	color: #000000;
    font-size: larger;
}

.down:hover td{
	color: #000000;
    font-size: larger;
}
.grid-container {
  display: grid;
  grid-template-columns: 5% 95%;
  width: 50%;
  padding: 10px 10px 10px 10px;
  
}
.grid-item {
  color: black;
  
  padding-left: 5%;
  font-size: 20px;
  text-align: left;

}
.grid-item-cl {
  background-color: #58d708;
  border: 1px solid rgba(0, 0, 0, 0.8);
  margin-bottom: 10%;
  margin-right: 5%;
  margin-top: 10%;
  font-size: 30px;
  text-align: center;
}
.grid-item-uefa {
  
  border: 1px solid rgba(0, 0, 0, 0.8);
  background-color: rgb(32, 144, 123);
  font-size: 30px;
  text-align: center;
  margin-bottom: 10%;
  margin-right: 5%;
  margin-top: 10%;
}
.grid-item-down {
  background-color: red;
  border: 1px solid rgba(0, 0, 0, 0.8);
  margin-bottom: 10%;
  margin-right: 5%;
  font-size: 30px;
  margin-top: 10%;
  text-align: center;
}

</style>