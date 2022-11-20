
<template>
    <LoggedNavBar></LoggedNavBar>

    <div class="row">
        <div class="panel">
            <br><br>
            <h2>TFP Administration System</h2> 
        </div>


        <div class="column">
            <button class="referee">
                <a>Referee Assignment System</a> 
            </button>
        </div>
        <div class="column">
            <button class="schedule">
                <a>Schedule Planning System</a>
            </button>
        </div>
        <div class="column">
            <button class="feedback">
                <a>Show Feedback</a>
            </button>
        </div>
        <div class="column">
            <button class="report">
                <a>Report Evaluation</a>
            </button>
        </div>
    </div>


</template>

<script>
    import LoggedNavBar from './LoggedNavBar.vue'

    export default {
        path: '/AdminHome',
        name: 'AdminHome',
        components: {
            LoggedNavBar,
        }
    };
</script>

<style scoped>

    .row{

        background-color: rgba(25, 57, 152, 0.608);
        margin-top: 1%;
        height: 84vh;
        margin-left: -1%;
        margin-right: -1%
    }
    .column {
    float: left;
    width: 25%;
    margin-top: 10%;
    }
    .panel{
        margin-top:3.3%;
    }
    .referee{
        background-color: rgba(17, 73, 158, 0.818);
        padding:20px;
        border:none;
   
        border-radius: 5px;
        transition: 0.5s ease;
    }

    .referee a{
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-size: medium;
    }
    .referee:hover{
        cursor: pointer;

    }
    .schedule{
        background-color: rgba(17, 73, 158, 0.818);
        padding:20px;
        border:none;
   
        border-radius: 5px;
        transition: 0.5s ease;
    }

    .schedule a{
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-size: medium;
    }
    .schedule:hover{
        cursor: pointer;

    }
    .feedback{
        background-color: rgba(17, 73, 158, 0.818);
        padding:20px;
        border:none;
   
        border-radius: 5px;
        transition: 0.5s ease;
    }

    .feedback a{
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-size: medium;
    }
    .feedback:hover{
        cursor: pointer;

    }
    .report{
        background-color: rgba(17, 73, 158, 0.818);
        padding:20px;
        border:none;
   
        border-radius: 5px;
        transition: 0.5s ease;
    }

    .report a{
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-size: medium;
    }
    .report:hover{
        cursor: pointer;

    }


</style>