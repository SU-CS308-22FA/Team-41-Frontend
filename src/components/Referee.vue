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
                <div class="referee" v-for="item in items[0]" :key="item.id">
                    <div class="name">
                        {{item.name}}
                    </div>
                    <div class="name">
                        Rating <br> {{item.rating}}
                    </div>
                    <div class="name">
                        Total Votes <br> {{item.totalVote}}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import NavBar from './NavBar.vue';
    import SideBar from './SideBar.vue';
    import loadingPage from './loadingPage';

    export default{
        path: "/referees",
        name: "AllReferees",
        components: {
            NavBar,
            SideBar,
            loadingPage
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
    background-color: lightblue;
}
.referee:hover{
    border: 1px solid blue;
}


.name{
    
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}


</style>