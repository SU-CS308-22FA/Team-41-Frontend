<template>
    <div>
        <div id="myModal" ref="modal" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Error</h5>
                    </div>
                    <div class="modal-body">
                        <p>{{ errorMsg }}</p>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                            @click="closeModal()"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="greet">
        <div>
            <h1  v-if="isLoggedIn()">Welcome to TFP, {{ name }}</h1>
            <h1  v-else>Welcome to TFP</h1>
        </div>
    </div>
    <body class="feed">

        <div class="tw1">
            <Tweet
                tweet-id="1610201415317868544"
                
                cards="visible"
                conversation="all"
                lang="en"
                theme="light"
                align="left"
                :dnt="false"
                @tweet-load-error="onTweetLoadError"
                @tweet-load-success="onTweetLoadSuccess"
            >
                <template v-slot:loading>
                <span>Loading...</span>
                </template>

                <template v-slot:error>
                <span>Sorry, that tweet doesn’t exist!</span>
                </template>
            </Tweet>
        </div>
        <div class="tw2">
            <Tweet
                tweet-id="1610268292308168704"
                cards="visible"
                conversation="all"
                lang="en"
                theme="light"
                align="left"

                :dnt="false"
                @tweet-load-error="onTweetLoadError"
                @tweet-load-success="onTweetLoadSuccess"
            >
                <template v-slot:loading>
                    <span>Loading...</span>
                </template>

                <template v-slot:error>
                    <span>Sorry, that tweet doesn’t exist!</span>
                </template>
            </Tweet>
        </div>
        <div>
            <div v-if="isLoggedIn()" class="user">
                <div class="feedback-page  d-flex justify-content-center">
                    <div class="feedback-form">
                        <h2 class="d-flex justify-content-center" style="color: rgba(17, 73, 158, 0.818)">Fan Team</h2>
                        <div class="col justify-content-center" style=" text-align: center;">
                            <div class="fan-team-info">
                                
                                <img class="img-thumbnail" :src='fanTeamLogo' style="margin-bottom: 20px;"/>
                                <div class="fan-rank">
        
                                <h3>{{ fanTeamName }}</h3>
                                <p>currently</p>
                                <div v-for="item in standings" :key="item.teamId" >
                                <div v-if="item.teamName === fanTeamName" class="rank">
                                    <h1 v-if="item.rank === 1">{{ item.rank}}st</h1>
                                    <h1 v-else-if="item.rank===2"> {{ item.rank}}nd</h1> 
                                    <h1 v-else-if="item.rank===3"> {{ item.rank}}rd</h1>
                                    <h1 v-else> {{ item.rank}}th</h1>
                                    <p>in the league</p></div>
                                
                            </div>
                                
                            </div>

                            </div>

                            <table>
                                <tr v-for="match in fanTeamCloseMatches" :key="match.id">
                                    <td v-if="match.finished" class="table-item"> {{ match.homeTeamName }} {{ match.goalHome }} - {{ match.goalAway }} {{ match.awayTeamName }}</td>
                                    <td v-else class="table-item"> {{ match.homeTeamName }} vs. {{ match.awayTeamName }}</td>
                                    <td class="table-item">{{ match.dateAndTime.replace('T', ' ') }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="not_user">
                <div class="login-page">
                    <form class="login-form" @submit.prevent="login">
                        <h2 class="title-login card-title" style="color: rgba(17, 73, 158, 0.818)"><b>Login</b></h2>
                        <br>
                        <br>
                        <input name="mail" v-model="mail" placeholder="Enter mail" type="text" pattern="[^@]+@[^\.]+\..+" title="Invalid email address" required autocomplete="current-username" on-error="Invalid email address">
                        <br>
                        <input name="password" v-model="password" placeholder="Enter password" type="password" minlength="8" required autocomplete="current-password">
                        <router-link class= "extra-links" to="/reset">Forget Password?</router-link>
                        <br>
                        <button class="but" id="login-button">
                            <a>Login</a>
                        </button>
                        <br><br><br>
                        <p>
                            Don't have an account?&nbsp;
                            <router-link class= "extra-links" to="/signup">Sign Up</router-link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    </body>
</template>

<script>
import { Modal } from "bootstrap";
import Tweet from 'vue-tweet';
    export default {
        name: 'MainFeed',
        path: "/mainFeed",
        components: {
            Tweet
        },
        data() {
            return{
                name:"",
                mail: "",
                password: "",
                isLoged: false,
                fanTeamName: "-",
                fanTeamId: "",
                fanTeamLogo: "",
                fanTeamCloseMatches: [],
                userId: "",
                errorMsg: "",
                myModal: null,
                standings:[],
            };
        },
        mounted(){
            this.myModal = new Modal(document.getElementById("myModal"));
            if(localStorage.userId) this.userId = localStorage.userId;
            const requestOptions = {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                };
                fetch("https://tfb308.herokuapp.com/api/v1/standings", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === "200") {
                    this.standings = data.returnObject;
                    }
                    this.finishedLoading = true;
                });

                fetch("https://tfb308.herokuapp.com/api/v1/user/" + this.userId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data.status === "200") {
                        this.name = data.returnObject.name; 
                        this.fanTeamName = data.returnObject.fanTeam;

                        fetch("https://tfb308.herokuapp.com/api/v1/team/all", requestOptions)
                        .then(responseT => responseT.json())
                        .then(dataT => {
                            if(data.status === "200") {
                                let teams = dataT.returnObject;
                                for(let i = 0; i < teams.length; i++) {
                                    if(teams.at(i).name === this.fanTeamName) {
                                        this.fanTeamId = teams.at(i).id;
                                        this.fanTeamLogo = teams.at(i).logoURL;
                                        break;
                                    }
                                }

                                fetch("https://tfb308.herokuapp.com/api/v1/match/all/" + this.fanTeamId, requestOptions)
                                .then(responseT => responseT.json())
                                .then(dataM => {
                                    let list = dataM.returnObject;
                                    
                                    const today = new Date();

                                    let closest = list.filter(item => new Date(item.dateAndTime) === today);

                                    if(closest.length == 0) {
                                        let closestDate = null;
                                        let closestItem = null;
                                        for (const item of list) {
                                            if (new Date(item.dateAndTime) > today && (!closestDate || new Date(item.dateAndTime) < new Date(closestDate))) {
                                                closestDate = item.dateAndTime;
                                                closestItem = item;
                                            }
                                        }
                                        closest = closestItem ? [closestItem] : [];
                                    }

                                    const idx = list.indexOf(closest[0])
                                    this.fanTeamCloseMatches = list.slice(idx-2, idx+3);
                                });
                            }
                        });
                    }
                   
                })
        },
        methods:{
            isLoggedIn(){
                if(localStorage.isLogedIn === undefined) return false;
                return true;
            },
            closeModal() {
                this.myModal.hide();
            },

            login() {
                const { mail, password } = this;

                this.errorMsg = "";

                localStorage.userError = "";
                localStorage.passwordError = "";
                localStorage.otherError = "";
                localStorage.pressed = true;
                
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ mail,  password})
                };
                fetch("https://tfb308.herokuapp.com/api/v1/user/login", requestOptions).
                then((res) => res.json()).
                then((res2) => {
                    if(res2.status !== "200") {
                        if(res2.status === "400: USER NOT FOUND!") {
                            this.errorMsg = "Email not found!";
                        } else if (res2.status === "400: WRONG PASSWORD!"){
                            this.errorMsg = "Wrong Password!";
                        } else {
                            this.errorMsg = res2.status;
                        }
                        this.myModal.show();
                    }
                    else {
                        window.localStorage.setItem("isLogedIn", true);
                        window.localStorage.setItem("userId", res2.returnObject.id);
                        window.localStorage.setItem("isAdmin", res2.returnObject.admin);
                        this.$router.push("/profilepage");// user profile sayfasina yonlendirilecek.
                    }
                });
            }
        },
        setup() {
    function onTweetLoadSuccess(embedNode) {
      console.log(embedNode)
    }

    function onTweetLoadError() {
      console.log("Ops... an error has occurred")
    }

    return { onTweetLoadSuccess, onTweetLoadError }
  }
    };

</script>


<style scoped>
    @keyframes bgcolor {
        0% {
            background-color: #45a3e5
        }

        30% {
            background-color: #66bf39
        }

        60% {
            background-color: #eb670f
        }

        90% {
            background-color: #f35
        }

        100% {
            background-color: #864cbf
        }
    }
    .feed{
        display:flex;
        -webkit-animation: bgcolor 20s infinite;
        animation: bgcolor 10s infinite;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
        min-height: calc(100vh - 17.2vh);
    }
    .greet{
        margin-top: 70px;
        margin-bottom:-0.5%;
        -webkit-animation: bgcolor 20s infinite;
        animation: bgcolor 10s infinite;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
       
    }
    .greet h1{
        padding:40px 10px 10px 10px;
        color:rgb(43, 42, 42);
    }
    .tw1{
        margin-left:5%;
        width:22%;
        
    }
    .tw2{
        margin-left:5%;
        width:27%;
    }
    .title-login{
        color: rgba(33, 66, 114, 0.818);
    }

    .login-page{
        padding-left: 45%;
        display: flex;       
    }

    .login-form{
        background-color: ghostwhite;
        padding:30%;
        
        display:grid;
        border-radius: 8px;
        text-align: center;
        height: fit-content;
    }

    .but{
        margin: 20px 20px 20px 20px;
        width: 210px;
        border-radius: 8px;
        background-color: rgba(33, 66, 114, 0.818);
        border: 2px solid rgba(33, 66, 114, 0.818);
        color: white;
        font-size: large;
    }

    .but:hover{
        transform: scale(1.1);
    }

    .extra-links{
        text-decoration: none;
        color: black;
        width: fit-content;
        text-align: center;
        margin: auto;
        padding-top: 10px;
    }

    .extra-links:hover{
        font-weight: bold;
        font-style: italic;
    }

    .fan-team-box{
       
        margin: 15px 10px 25px 10px;
        border-radius: 8px;
        background-color: beige;
        border: 2px outset beige;
        
    }

    .feedback-page{
        display: flex;
        text-align: center;
       
        
        align-items: center;
    }

    .feedback-form{
        background-color: ghostwhite;
        width: 550px;
        height: 550px;
        padding:30px;
        margin-left: 20%;
        display:grid;
        border-radius: 8px;
        text-align: left;
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
    .table-item{
        padding: 2px 5px 2px 5px;
        margin: 2px 8px 2px 8px;
        font-size: 16px;
        border-bottom: 2px solid black;
    }
    .fan-team-info{
        display:flex;
        margin-top:-10%;
        padding-bottom:10%;

    }
    .fan-rank{
        margin-left: 5%;
    }
    .fan-rank p{
        margin:0;
    }

</style>