<template>
    <NavBar></NavBar>
    <div class="fixture-page">
        <div v-if="items.length === 0 && finishedLoading === true">
            No Matches Found!
        </div>
        <div v-else-if="items.length === 0 || finishedLoading === false">
            <loadingPage></loadingPage>
        </div>
        <table v-else>

            <div class="filter">

                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                </svg>
                
                <select style="margin-left: 5px;" name="wantedWeek" v-model="wantedWeek" @click="getWeek(wantedWeek)">
                    <option value="All">All Weeks</option>
                    <option v-for="i in 36" :key="i" :value="i">{{ i }}. Week</option>
                </select>
            </div>


            <tr class="table-head">
                <td class="table-head-text">
                    Teams
                </td>
                <td class="table-head-text">
                    Referee
                </td>
                <td class="table-head-text">
                    Stadium
                </td>
                <td class="table-head-text">
                    Date and Time
                </td>
            </tr>

            <div  v-for="item in displayedItems" v-on:click="navToMp(item.id)" :key="item.id">
                <tr class="fixture-match not-played" v-if="item.status === 'Match Finished'">
                    <td class="table-body-text">
                        {{item.homeTeamName}} <h3>&nbsp; {{item.goalHome}} - {{item.goalAway}} &nbsp;</h3> {{item.awayTeamName}}
                    </td>
                    <td class="table-body-text">
                        {{item.referee}}
                    </td>
                    <td class="table-body-text">
                        {{item.stadiumName}}
                    </td>
                    <td class="table-body-text">
                        {{item.dateAndTime.toString().replace("T", " ")}}
                    </td>
                </tr>
                <tr class="fixture-match played" v-else>
                    <td class="table-body-text">
                        {{item.homeTeamName}} vs. {{item.awayTeamName}}
                    </td>
                    <td class="table-body-text">
                        {{item.referee}}
                    </td>
                    <td class="table-body-text">
                        {{item.stadiumName}}
                    </td>
                    <td class="table-body-text">
                        {{item.dateAndTime.toString().replace("T", " ")}}
                    </td>
                </tr>
            </div>
        </table>
    </div>
</template>


<script>
    import NavBar from './navbar.vue';
    import loadingPage from './loadingPage';
    
    export default {
        name: "FixturePage",
        path: "fixturePage",
        components: {
            NavBar,
            loadingPage
        },
        data(){
            return {
                items: [],
                displayedItems: [],
                filteredItems: new Map(),
                finishedLoading: false,
                wantedWeek: "",
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
                    this.items = data.returnObject;
                    
                    let idx = 0;
                    for(let i = 1; idx < this.items.length && i <= 36; i++) {
                        let week = [];

                        let startOfWeek = new Date(this.items[idx].dateAndTime)
                        startOfWeek.setHours(0);
                        startOfWeek.setMinutes(0);
                        startOfWeek.setSeconds(0);
                        let endOfWeek = new Date(this.items[idx].dateAndTime)
                        endOfWeek.setHours(23);
                        endOfWeek.setMinutes(59);
                        endOfWeek.setSeconds(59);
                        endOfWeek.setDate(endOfWeek.getDate() + 6)
                        let c = 0;
                        while(c < 9 && idx < this.items.length && new Date(this.items[idx].dateAndTime) >= startOfWeek && new Date(this.items[idx].dateAndTime) <= endOfWeek) {
                            week.push(this.items[idx]);
                            idx++;
                            c++;
                        }
                        this.filteredItems.set(i, week);
                        let today = new Date();
                        if(today.getTime() >= startOfWeek.getTime() && today.getTime() <= endOfWeek.getTime()) {
                            this.wantedWeek = i;
                            this.displayedItems = this.filteredItems.get(i);
                        }
                    }
                }
                this.finishedLoading = true;
            });
        },
        methods: {
            getWeek(option) {
                if(option === "All") {
                    this.displayedItems = this.items;
                }
                else {
                    this.displayedItems = this.filteredItems.get(parseInt(option));
                }
            },

            navToMp(id){
                this.$router.push({ name: "MatchPage", params: {matchId: id}});
            }
        }
    };

</script>

<style scoped>

    .fixture-page{
        display: flex;
    }

    .container{
        width: 100%;
        margin-left: 0%;
    }

    .table-head{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 16px 10px 16px;
        margin: 20px 20px 10px 20px;
        margin-left: 10%;
        border: 1px solid black;
        border-radius: 10px;
        font-weight: bold;
        font-size: larger;
        background-color: rgb(156, 35, 128);
        color: white;
        width: 80%;
    }

    .fixture-match{
        margin-bottom: 5px;
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
        height: fit-content;
    }
    .fixture-match:hover{
        cursor: pointer;
        transform: scale(1.1);
        background-color: rgba(33, 66, 114, 0.818);
        color: white;
    }

    table{
        width: 100%;
    }

    td, tr {
        text-align: center;
        width: fit-content;
    }

    .not-played{
        background-color: blanchedalmond;
    }
    
    .played{
        background-color: turquoise;
    }

    .table-body-text, .table-head-text{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }

    .filter{
        font-size: 17px;
        padding: auto;
        margin: 20px 20px 0px 20px;
    }

</style>