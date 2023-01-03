<template>
    <AdminNavBar></AdminNavBar>
    <div class="whole-fix">
        <div class="row-fixture">
    <div class="column-fixture leftt">
        <br>
        <h2>Fixture Generator</h2>
        <br>
        <div class="fix-gen-button">
            <button @click="genFixture()" :disabled="genFix.length !== 0"><h5> Generate Fixture</h5> </button>
        </div>
        <br><br><br>
        <h5>Rules</h5> 
        <p>1. Fixture for the next season is generated based on the standings of the current season.</p>
        <p>2. There will be 10 matches every week. There will be one team that does not play a match each week.</p>
        <p>3. Every team will face each other 2 times in a season, at each other's stadium.</p>
        <p>4. Each team plays only 2 consequtive away matches throughout the season.</p>
        <p>5. First 10 teams are "High" teams, rest are "Low" teams. Each team plays only 2 consequtive matches against High teams.</p>
    </div>
    <div class="column-fixture rightt">
        <table v-if="genFix.length > 0">
            <br>
            <div class="filter">

            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
            </svg>

            <select style="margin-left: 5px;" name="wantedWeek" v-model="weekNum" @click="getWeek(weekNum)">
                <option value="All">All Weeks</option>
                <option v-for="i in 38" :key="i" :value="i">{{ i }}. Week</option>
            </select>
            </div>

        
            <tr class="table-head">
                <td >
                    Teams
                </td>
                <td >
                    Stadium
                </td>
                <td>
                    Date and Time
                </td>
            </tr>
            <tr class="fixture-match" v-for="match in displayedFix" :key="match">
                <td>{{ match.homeTeamName }} vs. {{ match.awayTeamName }}</td>
                <td>{{ match.stadiumName }}</td>
                <td>{{ match.dateAndTime }}</td>
            </tr>
        </table>
    </div>
    </div>

    </div>
 
</template>

<script>
    import AdminNavBar from './adminNavbar.vue';
 

    export default {
        path: '/schedulePlan',
        name: 'SchedulePlan',
        components: {
            AdminNavBar,
        
        },
        data() {
            return{
                standings: null,
                teams: null,
                genFix: [],
                mapFix: null,
                ranks: [0, 1, 11, 2, 12, 3, 13, 4, 14, 5, 15, 6, 16, 7, 17, 8, 18, 9, 19, 10],
                weekNum: "All",
                displayedFix: [],
            }
        },
        mounted() {
            
        },
        methods: {
            getWeek(option) {
                if(option === "All") {
                    this.displayedFix = this.genFix;
                }
                else {
                    this.displayedFix = this.mapFix.get(parseInt(option));
                }
            },
            genFixture() {
                this.standings = new Map();
                this.teams = new Map();
                this.genFix = [];
                this.mapFix = new Map();
                let fix = this.createFixture(this.ranks);
                let seasonStart = new Date(2023, 6, 1, 0, 0, 0, 0);

                fetch('https://tfb308.herokuapp.com/api/v1/standings')
                .then(responsee => responsee.json())
                .then(ress => {
                    let lstS = ress.returnObject;
                    for(let x = 0; x < lstS.length; x++) {
                        this.standings.set(lstS[x].rank, lstS[x]);
                    }

                    fetch('https://tfb308.herokuapp.com/api/v1/team/all')
                    .then(response => response.json())
                    .then(res => {
                        let lstT = res.returnObject;
                        for(let x = 0; x < lstT.length; x++) {
                            this.teams.set(lstT[x].id, lstT[x]);
                        }

                        let fixture = new Map();
                        let allMatches = [];
                        for(let i = 0; i < 38; i++) {
                            let week = [];
                            let weekStart = new Date(seasonStart);
                            for(let j = 0; j <= 3; j++) {
                                weekStart.setHours(16)
                                for(let k = 1; k <= 3; k++) {
                                    if(fix[i][j*k][0] !== 0 && fix[i][j*k][1] !== 0) {
                                        var home = this.teams.get(this.standings.get(fix[i][j*k][0]).teamId);
                                        var away = this.teams.get(this.standings.get(fix[i][j*k][1]).teamId);
                                        week.push(this.matchTemplate(home, away, weekStart.toLocaleString()));
                                        allMatches.push(this.matchTemplate(home, away, weekStart.toLocaleString()));
                                        weekStart.setHours(weekStart.getHours()+2);
                                    }
                                }
                                weekStart.setDate(weekStart.getDate()+2);
                            }
                            seasonStart.setDate(seasonStart.getDate() + 7);
                            fixture.set(i+1, week);
                        }
                        this.genFix = allMatches;
                        this.mapFix = fixture;
                        this.getWeek(this.weekNum);
                    });
                });
            },
            createFixture(teams) {
                const count = teams.length;
                const sets = count - 1;
                const half = count / 2;
                const firstHalf = [];
                for (let turn = 0; turn < sets; turn++) {
                    const pairings = [];
                    for (let i = 0; i < half; i++) {
                    pairings.push([teams[i], teams[count - i - 1]]);
                    }
                    teams.splice(1, 0, teams.pop());
                    firstHalf.push(pairings);
                }
                const fixture = [];
                for (let i = 0; i < 10; i++) {
                    fixture.push(firstHalf[i]);
                    if (i !== 9) {
                    fixture.push(firstHalf[i + 10]);
                    }
                }
                const secondHalf = [];
                for (const f of fixture) {
                    const tmp = [];
                    for (const m of f) {
                    const tmpList = [m[1], m[0]];
                    tmp.push(tmpList);
                    }
                    secondHalf.push(tmp);
                }
                secondHalf.reverse();
                for (const f of secondHalf) {
                    fixture.push(f);
                }
                return fixture;
            },

            matchTemplate(home, away, d) {
                return {
                    homeTeamName: home.name,
                    awayTeamName: away.name,
                    referee: "",
                    city: home.city,
                    stadiumName: home.stadiumName,
                    dateAndTime: d
                };
            },
        }

    };
</script>

<style scoped>

.whole-fix{
    margin-top: 70px;
    min-height: calc(100vh - 70px);
    background-color: ghostwhite;
}
.column-fixture {
  float: left;
  height:100%;
}

.leftt {
  width: 25%;
  padding: 15px 15px 15px 15px;
  height:100%;
  
}
.leftt p{
    text-align: left;
    font-size: smaller;
}

.rightt {
  width: 75%;
  overflow-y:auto;
}
.row-fixture{
    height:100%;
    overflow-y:auto;
    
}
.fix-gen-button button{
    height: 70px;
    width: 200px;
}
.table-head{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 16px 10px 16px;
        margin: 20px 20px 10px 20px;
        margin-left: 12%;
        border: 1px solid black;
        border-radius: 10px;
        font-weight: bold;
        font-size: larger;
        background-color: rgb(156, 35, 128);
        color: white;
        width: 100%;
        overflow-y:auto;
    }
.fixture-match{
    margin-bottom: 5px;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    padding: 20px 16px 20px 16px;
    margin-left: 12%;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
    font-size: small;
    width: 100%;
    height: fit-content;
    overflow-y:auto;
}

.fixture-match:hover{
        cursor: pointer;
        
        background-color: rgba(33, 66, 114, 0.818);
        color: white;
    }

table{
    width: 80%;
    overflow-y:auto;
}

td, tr {
    text-align: center;
    width: fit-content;
    overflow-y:auto;
}
.filter{
    margin-left:12%;
}


</style>