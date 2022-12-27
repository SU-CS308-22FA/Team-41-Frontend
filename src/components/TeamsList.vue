<template>
    <NewNav></NewNav>
    <div class="whole">
        
        <div class="container">
            <div v-if="items.length === 0 && finishedLoading === true">
                No Teams Found!
            </div>
            <div v-else-if="items.length === 0 || finishedLoading === false">
                <loadingPage></loadingPage>
            </div>
            <div v-else>
                <div class="row row-cols-2 g-3">
                    <div class="col" v-for="item in items" :key="item.id">
                        <div id="{{ item.id }}" class="card">
                            <router-link :to="{
                                name: 'TeamPage',
                                params: {
                                    teamId: item.id
                                }
                            }">
                                <img :src=item.logoURL class="img-thumbnail">
                                <div class="card-body">
                                    <h5 class="card-title"><a>{{item.name}}</a></h5>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import NewNav from './newNav.vue';
    import loadingPage from './loadingPage';
    export default {
        name: "TeamsList",
        path: "teamsList",
        components: {
            NewNav,
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
            fetch("https://tfb308.herokuapp.com/api/v1/team/all", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    let sortedData = data.returnObject.sort((i1, i2) => (i1.name < i2.name) ? -1 : (i1.name > i2.name) ? 1 : 0);
                    this.items = sortedData;
                }
                this.finishedLoading = true;
            });
        },
    };

</script>

<style scoped>

    .whole{
        padding-top: 2.5%;
        display: flex;
        background: rgba(185, 185, 185, 0.725);
    }

    .card{
        justify-content: space-between;
        padding: 10px 16px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
        color: black;
        text-decoration: none;
    }

    .card:hover{
        border: 3px solid rgba(218, 38, 152, 0.978);
        background-color: rgba(33, 66, 114, 0.818);
        color: white;
        transform: scale(1.1);
        text-decoration: none;
    }

    a{
        text-decoration: none;
        color: black;
    }

    a:hover{
        text-decoration: none;
        color: white;
    }

    .img-thumbnail{
        border-width: 0px;
    }

</style>