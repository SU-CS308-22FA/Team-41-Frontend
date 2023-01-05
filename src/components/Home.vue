<template>
    <!--Modal-->
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


    <NavBar></NavBar>
    <div class="home-page">
        <div v-if="loaded === true">
            <div class="row">
                <div class="col">
                    <h1  v-if="isLoggedIn()">Welcome to TFP, {{ name }}</h1>
                    <h1  v-else>Welcome to TFP</h1>
                </div>
            </div>
            <div class="row" style="padding: 20px;">
                <div class="col-4 d-flex justify-content-center">
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
                </div>
                <div class="col-4 d-flex justify-content-center">
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
                </div>
                <div class="col-4 d-flex justify-content-center">
                    <div class="card" style="margin-top: 10px; height: fit-content; width: fit-content;">
                        <div v-if="isLoggedIn()">
                            <div class="card-body" style="padding: 40px;">
                                <h2 class="card-title title-login" style="color: rgba(17, 73, 158, 0.818)"><b>Fan Team</b></h2>
                                <br><br>
                                <div class="row">
                                    <img class="col img-thumbnail" :src='fanTeamLogo' style="margin: auto;"/>
                                    <div class="col fan-rank" style="margin: auto;">
                                        <h3>{{ fanTeamName }}</h3>
                                        <p>currently</p>
                                        <h1 v-if="rank === 1">{{ rank }}st</h1>
                                        <h1 v-else-if="rank===2"> {{ rank }}nd</h1> 
                                        <h1 v-else-if="rank===3"> {{ rank }}rd</h1>
                                        <h1 v-else> {{ rank }}th</h1>
                                        <p>in the league</p>
                                        <div class="last-five">
                                            <div v-for="match in lastFive" :key="match.id">
                                                <div v-if="match.finished">
                                                    <div v-if="match.goalAway === match.goalHome" class="result-box draw">D</div>
                                                    <div v-if="match.homeTeamName === fanTeamName && match.goalHome > match.goalAway " class="result-box win">W</div>
                                                    <div v-if="match.homeTeamName === fanTeamName && match.goalHome < match.goalAway " class="result-box loss">L</div>
                                                    <div v-if="match.awayTeamName === fanTeamName && match.goalHome > match.goalAway " class="result-box loss">L</div>
                                                    <div v-if="match.awayTeamName === fanTeamName && match.goalHome < match.goalAway " class="result-box win">W</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br>

                                <table>
                                    <tr v-for="match in fanTeamCloseMatches" :key="match.id">
                                        <td v-if="match.finished" class="table-item"> {{ match.homeTeamName }} {{ match.goalHome }} - {{ match.goalAway }} {{ match.awayTeamName }}</td>
                                        <td v-else class="table-item"> {{ match.homeTeamName }} vs. {{ match.awayTeamName }}</td>
                                        <td class="table-item">{{ match.dateAndTime.replace('T', ' ') }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div v-else>
                            <form class="card-body" @submit.prevent="login" style="width: 300px;">
                                <h2 class="card-title title-login" style="color: rgba(17, 73, 158, 0.818)"><b>Login</b></h2>
                                <br>
                                <input class="form-input" name="mail" v-model="mail" placeholder="Enter mail" type="text" pattern="[^@]+@[^\.]+\..+" title="Invalid email address" required autocomplete="current-username" on-error="Invalid email address">
                                <br>
                                <input class="form-input" name="password" v-model="password" placeholder="Enter password" type="password" minlength="8" required autocomplete="current-password">
                                <br>
                                <router-link class= "extra-links" to="/reset" id="reset-home">Forget Password?</router-link>
                                <br>
                                <button class="but" id="login-button">
                                    <a>Login</a>
                                </button>
                                <br>
                                <p>
                                    Don't have an account?
                                    &nbsp;
                                    <router-link class= "extra-links" to="/signup" id="signup-home">Sign Up</router-link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <loadingPage></loadingPage>
        </div>
    </div>
</template>

<script scoped>
    import NavBar from './navbar.vue';
    import loadingPage from './loadingPage.vue';
    import { Modal } from "bootstrap";
    import Tweet from 'vue-tweet';

    export default {
        path: '/HomePage',
        name: 'HomePage',
        components: {
            NavBar,
            Tweet,
            loadingPage,
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
                rank: "",
                loaded: false,
                lastFive:[],
            };
        },
        mounted(){
            this.myModal = new Modal(document.getElementById("myModal"));
            if(localStorage.userId) this.userId = localStorage.userId;

            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };

            if(this.userId) {
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
                                    this.lastFive = list.slice(idx-5, idx);

                                    fetch("https://tfb308.herokuapp.com/api/v1/standings", requestOptions)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (data.status === "200") {
                                            let standings = data.returnObject;

                                            for(let k = 0; k < standings.length; k++) {
                                                if(standings[k].teamName === this.fanTeamName) {
                                                    this.rank = standings[k].rank;
                                                    this.loaded = true;
                                                    break;
                                                }
                                            }
                                        }
                                    });
                                });
                            }
                        });
                    }
                })
            }
            else {
                this.loaded = true;
            }
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
                console.log(embedNode);
            }

            function onTweetLoadError() {
                console.log("Ops... an error has occurred");
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

    .home-page {
        margin-top: 70px;
        padding: 25px;
        min-height: calc(100vh - 70px);
        -webkit-animation: bgcolor 20s infinite;
        animation: bgcolor 10s infinite;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
    }
    
    .tw1{
        width: 70%;
    }

    .tw2{
        width: 80%;
    }

    .title-login{
        color: rgba(33, 66, 114, 0.818);
        margin-bottom: 30px;
    }

    .form-input{
        margin-top: 7.5px;
        margin-bottom: 7.5px;
    }

    .but{
        margin: 40px 20px 40px 20px;
        padding: 3px 15px 3px 15px;
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

    .last-five{
        display:flex;
        margin-top: 9px;
    }

    .result-box {
        padding: 2px;
        height: fit-content;
        width: 40px;
        border-right: 2px solid ghostwhite;
    }

    .win{
        background: rgb(15, 167, 15);
    }
    .loss{
        background: red;
    }
    .draw{
        background: yellow;
    }

</style>
