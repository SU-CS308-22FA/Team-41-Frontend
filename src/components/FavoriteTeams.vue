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
                <div v-for="item in items[0]" :key="item.id">
                    <diV>

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
                            
                        </router-link>
                        
                    </diV>
                    <diV>
                        
                        <button @click="deleteFavTeam(item.id)" :id="item.id" class="removeButton">X</button>
                    </diV>
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
        name: "FavoriteTeams",
        path: "/favoriteTeams",
        components: {
            NavBar,
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
                        alert("Delete Succeed!");
                        return;
                    }
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