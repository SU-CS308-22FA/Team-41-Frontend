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
        name: "TeamsList",
        path: "teamsList",
        components: {
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
            fetch("https://tfb308.herokuapp.com/api/v1/team/all", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.items.push(data.returnObject);
                }
                this.finishedLoading = true;
            });
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

    .team{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: lightblue;
    }
    .team:hover{
        border: 1px solid blue;
    }

    .logo{
        width:  50%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .name{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }


</style>