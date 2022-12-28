<template>
    <NavBar></NavBar>
    <div class="teams-list">
        <div v-if="items.length === 0 && finishedLoading === true" class="not-found-team">
            No Teams Found!
        </div>
        <div v-else-if="items.length === 0 || finishedLoading === false">
            <loadingPage></loadingPage>
        </div>
        <div v-else>
            <div class="row row-cols-3 g-3">
                <div class="col" v-for="item in items" :key="item.id">
                    <div id="{{ item.id }}" class="card team">
                        <router-link :to="{
                            name: 'TeamPage',
                            params: {
                                teamId: item.id
                            }
                        }">
                            <img :src=item.logoURL class="img-thumbnail team-logo">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <a class="team-name">{{item.name}}</a>
                                </h5>
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
    export default {
        name: "TeamsList",
        path: "teamsList",
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

    .teams-list{
        margin-top: 70px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        display: flexbox;
        background: rgba(185, 185, 185, 0.725);
    }

    .not-found-team{
        margin-top: 300px;
        font-weight: bold;
        font-style: italic;
        font-size: 35px;
    }

    .team{
        justify-content: space-between;
        padding: 10px 16px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
    }

    .team:hover{
        border: 3px solid rgba(218, 38, 152, 0.978);
        background-color: rgba(33, 66, 114, 0.818);
        transform: scale(1.1);
    }

    .team-name{
        color: black;
    }

    .team-name:hover{
        color: white;
    }

    .team-logo{
        border-width: 0px;
    }

    a{
        text-decoration: none;
    }

</style>