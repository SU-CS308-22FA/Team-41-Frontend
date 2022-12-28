<template>
    <NavBar></NavBar>
    <div>
        <div v-if="items.length === 0 && finishedLoading === true" class="not-found-fav-team">
            No Teams Found!
        </div>
        <div v-else-if="items.length === 0 || finishedLoading === false">
            <loadingPage></loadingPage>
        </div>
        <div v-else class="teams-list-fav">
            <div class="row">
                <div class="col" v-for="item in items" :key="item.id">
                    <div id="{{ item.id }}" class="card fav-team">
                        <router-link :to="{
                            name: 'TeamPage',
                            params: {
                                teamId: item.id
                            }
                        }">
                            <img :src=item.logoURL class="img-thumbnail fav-team-logo">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <a class="fav-team-name">{{item.name}}</a>
                                </h5>
                            </div>
                        </router-link>
                        <div class="card-body del-but" @click="deleteFavTeam(item.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heartbreak-fill" viewBox="0 0 16 16">
                                <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import NavBar from './navbar.vue';
    import loadingPage from './loadingPage';

    export default {
        name: "FavoriteTeams",
        path: "/favoriteTeams",
        components: {
            NavBar,
            loadingPage
        },
        data(){
            return {
                items: [],
                finishedLoading: false
            };
        },
        mounted(){
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/user/favTeams/"+localStorage.userId, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    let sortedData = data.returnObject.sort((i1, i2) => (i1.name < i2.name) ? -1 : (i1.name > i2.name) ? 1 : 0);
                    this.items = sortedData;
                }
                this.finishedLoading = true;
            });
        },
        methods: {
            deleteFavTeam(id){
                const requestOptions = {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId:localStorage.userId, teamId:id})
                };
                fetch("https://tfb308.herokuapp.com/api/v1/user/favTeams", requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data.status === "200") {
                        this.items = this.items.filter(item => item.id !== id);
                    }
                });
            }
        }
    }


</script>


<style scoped>

    .teams-list-fav{
        margin-top: 10px;
        height: 100vh;
        width: 100%;
        position: fixed;
        margin-bottom: 0px;
        padding: 25px 25px 25px 25px;
        display: flex;
        background: rgba(185, 185, 185, 0.725);
    }

    .not-found-fav-team{
        margin-top: 300px;
        font-weight: bold;
        font-style: italic;
        font-size: 35px;
        text-align: center;
    }

    .fav-team{
        justify-content: space-between;
        padding: 15px 15px 15px 15px;
        margin: 25px 25px 25px 25px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
        width: 250px;
        height: fit-content;
    }

    .fav-team:hover{
        border: 3px solid rgba(218, 38, 152, 0.978);
        background-color: rgba(33, 66, 114, 0.818);
        transform: scale(1.1);
    }

    .fav-team-name{
        color: black;
    }

    .fav-team-name:hover{
        color: white;
    }

    .fav-team-logo{
        border-width: 0px;
    }

    a{
        text-decoration: none;
    }

    .del-but{
        top: 0px;
        right: 0px;
        position: absolute;
        color: red;
    }

    .del-but:hover{
        transform: scale(1.3);
    }

</style>