<template>
    <NavBar></NavBar>
    <div class="feedback-page  d-flex justify-content-center">
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
    import NavBar from './navbar.vue'

    export default {
        path: '/feedback',
        name: 'FeedBack',
        components: {
            NavBar,
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

    .feedback-page{
        display: flex;
        background: rgba(185, 185, 185, 0.725);
        min-height: calc(100vh - 70px);
        text-align: center;
        margin-top: 70px;
        padding: 25px;
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