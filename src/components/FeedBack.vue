<template>
    <NavBar></NavBar>
    <div class="container">
        <form class="feedback-form">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Feedback Box</h2>

            <label for="name">Name</label>
            <input name="name" v-model="name" placeholder="Enter name" type="text">

            <label for="topic">Topic</label>
            <select id="topic" name="topic" type="topic">
            <option value="referee">Referee Assignment</option>
            <option value="schedule">Schedule</option>
            <option value="other">Other</option>
            </select>
            <label for="subject">Subject</label>
            <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>


            <button class="feedback">
                <a>SUBMIT</a>
            </button>
        </form>
    </div>
</template>

<script>
    import NavBar from './NavBar.vue'

    export default {
        path: '/feedback',
        name: 'FeedBack',
        components: {
            NavBar,
        },
    };
</script>


<style scoped>
    head{
        box-sizing: border-box;
        padding:0;
        margin:0;
    }

    body{
        margin: 0;
        height: 100%;
        position: absolute;
        bottom:0px;
    }
    .container{
        background-image: linear-gradient(to bottom, rgba(145,146,122,0.62),rgba(47, 20, 109, 0.8)),url(../assets/ball.jpg);
        background-size: cover;
        height:100vh;
        margin: 50px -10px 0 -10px;
        text-align: center;
        display: flex;
        padding-left: 33%;
        align-items: center;
    }

    .feedback-form{
        background-color: ghostwhite;
        width: 450px;
        height: 550px;
        padding:30px;
        margin: 1.1em 1em;
        display:grid;
        border-radius: 8px;
        text-align: left;

        /*background: #2980b9 url('https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png') repeat 0 0;
        -webkit-animation: 10s linear 0s normal none infinite animate;
        -moz-animation: 10s linear 0s normal none infinite animate;
        -ms-animation: 10s linear 0s normal none infinite animate;
        -o-animation: 10s linear 0s normal none infinite animate;
        animation: 10s linear 0s normal none infinite animate;*/
    }
    
    @-webkit-keyframes animate {
        from {background-position:0 0;}
        to {background-position: 500px 0;}
    }
    
    @-moz-keyframes animate {
        from {background-position:0 0;}
        to {background-position: 500px 0;}
    }
    
    @-ms-keyframes animate {
        from {background-position:0 0;}
        to {background-position: 500px 0;}
    }
    
    @-o-keyframes animate {
        from {background-position:0 0;}
        to {background-position: 500px 0;}
    }
    
    @keyframes animate {
        from {background-position:0 0;}
        to {background-position: 500px 0;}
    }

    input[type=text]{
        margin-bottom: 20px;
        border-radius: 7px;
        padding:6px;
        margin-top: 3px;
    }
 
    select[type=topic]{
        margin-bottom: 20px;
        border-radius: 7px;
        padding:6px;
        margin-top: 3px;
    }
    textarea{
        margin-bottom: 20px;
        border-radius: 7px;
        padding:6px;
        margin-top: 3px;
    }

    .feedback{
        background-color: rgba(17, 73, 158, 0.818);
        padding:10px;
        border:none;
        margin-top: 30px;
        margin-bottom: 30px;
        border-radius: 5px;
        transition: 0.5s ease;
    }

    .feedback a{
        color: white;
        text-decoration: none;
        font-weight: bold;
        text-transform: uppercase;
        font-size: medium;
    }
    .feedback:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
    



</style>