<template>
    <div class="whole">
        <SideBar></SideBar>
    <div class="container">
        <div class="match">
            <div class ="ht">
                Fenerbahce
            </div>
            <div class="inf">
                19.00
            </div>
            <div class="at">
                Galatasaray
            </div>
        </div>
        <div class="match">
            <div class ="ht">
                Fenerbahce
            </div>
            <div class="inf">
                19.00
            </div>
            <div class="at">
                Galatasaray
            </div>
        </div>
        <div class="match">
            <div class ="ht">
                Fenerbahce
            </div>
            <div class="inf">
                19.00
            </div>
            <div class="at">
                Galatasaray
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
    };

</script>

<style>

    .whole{
        display: flex;
    }
    .container{
        width: 35%;
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

</style>