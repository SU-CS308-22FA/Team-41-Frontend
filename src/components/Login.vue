<template>
    <!-- Modal -->
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
</template>

<script>
    import { Modal } from "bootstrap";
    import NavBar from './navbar.vue'

    export default {
        path: '/login',
        name: 'LogIn',
        components: {
            NavBar,
        },
        data() {
            return {
                mail: "",
                password: "",
                isLoged: false,
                userId: "",
                errorMsg: "",
                myModal: null,
            };
        },
        mounted() {
            this.myModal = new Modal(document.getElementById("myModal"));
        },
        methods: {
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
    };
</script>


<style scoped>
    .title-login{
        color: rgba(33, 66, 114, 0.818);
    }

    .login-page{
        margin-top: 70px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        display: flexbox;
        min-height: calc(100vh - 70px);
        background: rgba(185, 185, 185, 0.725);
    }

    .login-form{
        background-color: ghostwhite;
        width: auto;
        height: fit-content;
        padding:30px;
        margin: auto;
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
</style>