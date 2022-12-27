<template>
    <NavBar></NavBar>
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
                    <router-link class="referee"  :to="{
                            name: 'RefereePage',
                            params: {
                                refereeId: item.id
                            }
                        }"
                    >
                
                    <div class="name">
                        {{item.name}}
                    </div>
                    
                    <div class="name">
                        Rating <br> {{item.rating}}
                    </div>
                    <div class="name">
                        Total Votes <br> {{item.totalVote}}
                    </div>
                    </router-link>
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
                isLoading : false
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
                    this.items.push(data.returnObject);
                }
                this.finishedLoading = true;
            });
        }
    }


</script>

<style>

.whole{
    display: flex;
}
.container{
    width: 39%;
    margin-left: 10%;
}

.referee{
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    padding: 10px 16px;
    margin: 20px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
}


.referee:hover{
    border: 3px solid rgba(218, 38, 152, 0.978);
    background-color: rgba(33, 66, 114, 0.818);
    color: white;
    transform: scale(1.1);

}


.name{
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}
.referee .name:hover{
    color: white;
}



</style>