<template>
    <NavBar></NavBar>
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
                            <button @click="deleteFavTeam(item.id)" class="card-button">
                                <i
                                    class="bx"
                                    :class="'bx-message-square-x'"
                                />
                            </button>
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
                        this.items = this.items.filter(item => item.id !== id)
                        alert("Delete Succeed!");
                        return;
                    }
                });
            }
        }
    }


</script>


<style scoped>

    .whole{
        padding-top: 2.5%;
        display: flex;
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
        border: 3px solid rgba(33, 66, 114, 0.818);
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
    }

    .img-thumbnail{
        border-width: 0px;
    }

    .card-button{
        align-items: right;
        position: absolute;
        top: 3px;
        right: 5px;
        border-width: 0px;
        background-color: white;
        font-size: 30px;
    }

    .card-button:hover{
        color: red;
    }

</style>