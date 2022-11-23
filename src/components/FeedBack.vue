<template>
    <HarunNavBar></HarunNavBar>
    <SideBar></SideBar>
    <div class="container">
        <form class="feedback-form" @submit.prevent="sendFeedback">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Feedback Box</h2>

            

            <label for="topic">Topic</label>
            <select id="topic" name="topic" type="topic" v-model="topic">
            <option value="referee">Referee Assignment</option>
            <option value="schedule">Schedule</option>
            <option value="other">Other</option>
            </select>
            <br>
            <label for="subject">Subject</label>
            <textarea v-model="body" id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>


            <button class="feedback">
                <a>SUBMIT</a>
            </button>
        </form>
    </div>
</template>

<script>
    import HarunNavBar from './HarunNavBar.vue'
    import SideBar from './SideBar.vue'

    export default {
        path: '/feedback',
        name: 'FeedBack',
        components: {
            HarunNavBar,
            SideBar
        },
        data(){
            return {
                userId: localStorage.userId,
                topic: "",
                body: ""
            };
        },
        methods: {
            sendFeedback() {
                const { userId,topic,body } = this;
                

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId,
                        topic,
                        body
                    })
                };
                fetch("https://tfb308.herokuapp.com/api/v1/feedback", requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    if(data.status !== "200") {
                        alert("Feedback Could not be Sent!\n"+data.returnObject);
                        return;
                    }
                    this.$router.push("/profilepage");
                    alert("Feedback Succesfully Sent!");
                })
                
                
            }
        }
    };
</script>


<style scoped>
    .container{
        display: flex;
        background: rgba(185, 185, 185, 0.725);
        width:100%;
        height:100%;
        text-align: center;
        display: flex;
        padding-left: 33%;
        padding-top: 4.7%;
        
        margin-left:0;
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