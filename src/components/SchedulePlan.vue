<template>
    <AdminNavBar></AdminNavBar>
    <div class="whole-fix">
        <div class="row-fixture">
    <div class="column-fixture leftt">
        <br>
        <h2>Fixture Generator</h2>
        <br>
        <div class="fix-gen-button">
            <button @click="genFixture()"><h5> Generate Fixture</h5> </button>
        </div>
        <br>
        <h5>Rules</h5>
        <p>1. Fixture for the next season is generated based on the standings of the current season.</p>
        <p>2. There will be 10 matches every week. There will be one team that does not play a match each week.</p>
        <p>3. Every team will face each other 2 times in a season, at each other's stadium.</p>
        <p>4. Each team plays only 2 consequtive away matches throughout the season.</p>
        <p>5. First 10 teams are "High" teams, rest are "Low" teams. Each team plays only 2 consequtive matches against High teams.</p>
    </div>
    <div class="column-fixture rightt">
        <br>
        <h2>Fixture here</h2>
        <p>Some text..</p>
        <table>
            <div v-for="week in genFix" :key="week">
                <tr v-for="match in week" :key="match">
                    <td>{{ match.homeTeamName }} vs. {{ match.awayTeamName }}</td>
                    <td>{{ match.dateAndTime }}</td>
                    <td>{{ match.stadiumName }}</td>
                </tr>
            </div>
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
                standings: new Map(),
                teams: new Map(),
                genFix: [],
                ranks: [0, 1, 11, 2, 12, 3, 13, 4, 14, 5, 15, 6, 16, 7, 17, 8, 18, 9, 19, 10],
                start: new Date(2023, 7, 1),
            }
        },
        mounted() {
            
        },
        methods: {
            genFixture() {
                let fix = this.createFixture(this.ranks);
                let seasonStart = new Date(this.start);

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

                        let fixture = [];
                        for(let i = 0; i < 38; i++) {
                            let week = [];
                            let weekStart = new Date(seasonStart);
                            for(let j = 0; j <= 3; j++) {
                                weekStart.setHours(16)
                                for(let k = 1; k <= 3; k++) {
                                if(fix[i][j*k][0] !== 0 && fix[i][j*k][1] !== 0) {
                                    var home = this.teams.get(this.standings.get(fix[i][j*k][0]).teamId);
                                    var away = this.teams.get(this.standings.get(fix[i][j*k][1]).teamId);
                                    week.push(this.matchTemplate(home, away, weekStart.toString()));
                                    weekStart.setHours(weekStart.getHours()+2);
                                }
                                }
                                weekStart.setDate(weekStart.getDate()+2);
                            }
                            seasonStart.setDate(seasonStart.getDate() + 7);
                            fixture.push(week);
                        }
                        this.genFix = fixture;
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
}
.row-fixture{
    height:100%;
    
}
.fix-gen-button button{
    height: 70px;
    width: 200px;
}




</style>