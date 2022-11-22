<template>
    <NavBar></NavBar>
    <SideBar></SideBar>
    <div class="whole">
        
        <div class="container">
            <div v-if="items.length === 0 && finishedLoading === true">
                No Matches Found!
            </div>
            <div v-else-if="items.length === 0 || finishedLoading === false">
                <loadingPage></loadingPage>
            </div>
            <div v-else>
                <div v-for="item in items" :key="item.referee" class="match">
                    <div class ="ht">
                        {{item.homeTeam}}
                    </div>
                    <div class="inf">
                        {{item.dateAndTime.substring(11, 16)}} <br>
                        {{item.referee}}
                    </div>
                    <div class="at">
                        {{item.awayTeam}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import NavBar from './NavBar.vue';
    import SideBar from './SideBar.vue';
    import loadingPage from './loadingPage';
    export default {
        name: "TodaysMatches",
        path: "todaysMatches",
        components: {
            NavBar,
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
            var currentdate = new Date();
            var datetime = currentdate.getFullYear() + "-" + currentdate.getMonth() + "-" + currentdate.getDay();
            //var datetime = "2022-08-07";      //denemelik
            for (let i = 1; i <= 342; i++) {
                fetch("https://tfb308.herokuapp.com/api/v1/match/" + i.toString(), requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data.status === "200" && data.returnObject.dateAndTime.substring(0, 10) === datetime) {
                        this.items.push(data.returnObject);
                    }
                    if(i === 342) {
                        this.finishedLoading = true;
                    }
                });
            }
        },
    };

</script>

<style lang="scss" scoped>

    .whole{
        display: flex;
    }
    .container{
        width: 39%;
        margin-left: 10%;
    }

    .match{
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 10px;
    }
    .match:hover{
        border: 1px solid blue;
    }

    .ht{
        width:  33%;
        
    }
    .at{
        width: 34%;
    }
    .inf{
        width:  33%;
        
    }


</style>