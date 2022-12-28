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

            <div  v-for="item in items" v-on:click="navToMp(item.id)" :key="item.id">
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
                    this.items = data.returnObject;
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

</style>