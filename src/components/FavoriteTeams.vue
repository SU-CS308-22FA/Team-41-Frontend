<template>
    <div class="whole">
        <SideBar></SideBar>
        
        <div class="container">
            <div v-if="items.length === 0 && finishedLoading === true">
                No Matches Found!
            </div>
            <div v-else-if="items.length === 0 || finishedLoading === false">
                <loadingPage></loadingPage>
            </div>
            <div v-else>
                <div v-for="item in items[0]" :key="item.id">
                    <router-link class="team" :to="{
                            name: 'TeamPage',
                            params: {
                                teamId: item.id
                            }
                        }"
                    >
                        <div class="logo">
                            <img :src=item.logoURL>
                        </div>
                        <div class="name">
                            {{item.name}}
                        </div>
                        
                        <button @click.stop="deleteFavTeam(item.id)" :id="item.id" class="removeButton">X</button>
                    </router-link>
                    
                </div>
                
            </div>
        </div>
    </div>
</template>


<script>
    import SideBar from './SideBar.vue';
    import loadingPage from './loadingPage';

    export default {
        name: "FavoriteTeams",
        path: "/favoriteTeams",
        components: {
            SideBar,
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
                    this.items.push(data.returnObject);
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
                    window.location.reload();
                    return;
                }
                alert(data.returnObject);
                
            });
            }
        }
    }


</script>


<style>

.removeButton{
    height: 10%;
    width: 10%;
    background-color: red;
    cursor: pointer;
    z-index: 1;
}



</style>