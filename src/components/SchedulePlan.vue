<template>
    <AdminNavBar></AdminNavBar>
    <div class="whole-fix">
        <div class="row-fixture">
    <div class="column-fixture leftt">
        <br>
        <h2>Fixture Generator</h2>
        <br>
        <div class="fix-gen-button">
            <button><h5> Generate Fixture</h5> </button>
        </div>
        <br>
        <h5>Rules</h5>
        <p>1. Fixture for the next season is generated based on the standings of the current season.</p>
        <p>2. There will be 10 matches every week. There will be one team that does not play a match each week.</p>
        <p>3. Every team will face each other 2 times in a season, at each other's stadium.</p>
        <p>4. Each team plays only 2 consequtive away matches throughout the season.</p>
        <p>5. First 10 teams are "High" teams, rest are "Low" teams. Each team plays only 2 consequtive matches against High teams.</p>
    </div>
    <div class="column-fixture rightt">
        <br>
        <h2>Fixture here</h2>
        <p>Some text..</p>
    </div>
    </div>

    </div>
 
</template>

<script>
    import AdminNavBar from './adminNavbar.vue';
 

    export default {
        path: '/schedulePlan',
        name: 'SchedulePlan',
        components: {
            AdminNavBar,
        
        },

    };
</script>

<style scoped>

.whole-fix{
    margin-top: 70px;
    min-height: calc(100vh - 70px);
    background-color: ghostwhite;
}
.column-fixture {
  float: left;
  height:100%;
}

.leftt {
  width: 25%;
  padding: 15px 15px 15px 15px;
  height:100%;
  
}
.leftt p{
    text-align: left;
    font-size: smaller;
}

.rightt {
  width: 75%;
}
.row-fixture{
    height:100%;
    
}
.fix-gen-button button{
    height: 70px;
    width: 200px;
}




</style>