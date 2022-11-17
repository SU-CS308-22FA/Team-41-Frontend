<template>
    <div class="whole">
        <SideBar></SideBar>
    <div class="container">
        <div v-for="item in items" :key="item.referee" class="match">
            <div class ="ht">
                {{item.home}}
            </div>
            <div class="inf">
                {{item.time}} <br>
                {{item.referee}}
            </div>
            <div class="at">
                {{item.away}}
            </div>
        </div>
        
    </div>
    </div>
</template>


<script>
import SideBar from './SideBar.vue';
    export default {
        name: "TodaysMatches",
        path: "todaysMatches",
        components: {
            SideBar
        },
        data(){
            return {
                items: [
                {
                    home: "Fenerbahce",
                    away: "Galatasaray",
                    time: "19.00",
                    referee: "Zorbay Kucuk"
                },
                {
                    home: "Hangi Kredi Konyaspor",
                    away: "Besiktas",
                    time: "21.00",
                    referee: "Cuneyt Cakir"
                },
            ]
            }
        },
    };

</script>

<style>

    .whole{
        display: flex;
    }
    .container{
        width: 39%;
        margin-left: 10%;
    }
    .match{
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 10px;
    }
    .match:hover{
        border: 1px solid blue;
    }

    .ht{
        width:  33%;
        
    }
    .at{
        width: 34%;
    }
    .inf{
        width:  33%;
        
    }


</style>