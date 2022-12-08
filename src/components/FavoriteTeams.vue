<template>
    <HarunNavBar></HarunNavBar>
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
                            <div class="col">
                                <button @click="deleteFavTeam(item.id)" :id="item.id" class="removeButton">X</button>
                                <div class="name">
                                {{item.name}}
                            </div>
                            </div>

                            
                        </router-link>
                        
                    </diV>
                    <diV>
                        
                        
                    </diV>
                </div>
                
            </div>
        </div>
    </div>
</template>


<script>
    import HarunNavBar from './HarunNavBar.vue';
    import SideBar from './SideBar.vue';
    import loadingPage from './loadingPage';

    export default {
        name: "FavoriteTeams",
        path: "/favoriteTeams",
        components: {
            HarunNavBar,
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

body{
    background: rgba(185, 185, 185, 0.725);
}



.team{
    padding-top: 0;
    margin-bottom: 10%;
}

.col .removeButton{
    height: 30px;
    width: 50px;
    background-color: red;
    cursor: pointer;
    margin-right: -80%;
    margin-top: 1%;
   
}
.col{
    
    
}
.col .name{
    padding-top: 45%;
    margin-right: 30px;
}

</style>