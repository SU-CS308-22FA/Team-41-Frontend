<template>
    <NavBar></NavBar>
    <div class="referees-list">
        <div v-if="items.length === 0 && finishedLoading === true">
            No Referees Found!
        </div>
        <div v-else-if="items.length === 0 || finishedLoading === false">
            <loadingPage></loadingPage>
        </div>
        <div v-else>
            <div class="row row-cols-5 g-3">
                <div class="col" v-for="item in items" :key="item.id">
                    <div id="{{ item.id }}" class="card referee">
                        <router-link :to="{
                            name: 'RefereePage',
                            params: {
                                refereeId: item.id
                            }
                        }">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <a class="referee-name">{{item.name}}</a>
                                </h5>
                                <br>
                                <a class="card-text referee-stats">Rating: &nbsp; {{item.rating}}</a>
                                <br>
                                <a class="card-text referee-stats">Total Votes: &nbsp; {{item.totalVote}}</a>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import NavBar from './navbar.vue';
    import loadingPage from './loadingPage';

    export default{
        path: "/referees",
        name: "AllReferees",
        components: {
            NavBar,
            loadingPage,
        },
        data(){
            return {
                items : [],
                finishedLoading: false,
            }
        },
        mounted(){
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/referee/all", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    let sortedData = data.returnObject.sort((i1, i2) => (i1.rating < i2.rating) ? 1 : (i1.rating > i2.rating) ? -1 : 0);
                    this.items = sortedData;
                }
                this.finishedLoading = true;
            });
        }
    }


</script>

<style scoped>

    .referees-list{
        margin-top: 70px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        
        background: rgba(185, 185, 185, 0.725);
    }

    .referee{
        justify-content: space-between;
        padding: 10px 16px;
        margin: 10px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
    }

    .referee:hover{
        border: 3px solid rgba(218, 38, 152, 0.978);
        background-color: rgba(33, 66, 114, 0.818);
        transform: scale(1.1);
    }

    .referee-name{
        color: black;
        font-weight: bold;
        font-size: 21px;
    }

    .referee-stats{
        color: black;
        font-weight: bold;
        font-style: italic;
        font-size: 17px;
    }

    .referee-name:hover, .referee-stats:hover{
        color: white;
    }

    a{
        text-decoration: none;
    }

</style>