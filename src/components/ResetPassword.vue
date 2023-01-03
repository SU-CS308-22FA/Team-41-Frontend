<template>
    <!-- Modal -->
    <div>
        <div id="myModal" ref="modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ modalTitle }}</h5>
            </div>
            <div class="modal-body">
                <p>{{ modalText }}</p>
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
            <h2 class="title-login card-title" style="color: rgba(17, 73, 158, 0.818)"><b>Reset Password</b></h2>
            <br>
            <br>
            <br>
            <br>
            <input name="email" v-model="email" placeholder="Enter email" type="text" pattern="[^@]+@[^\.]+\..+" title="Invalid email address" required autocomplete="current-username" on-error="Invalid email address">
            <br>
            <br>
            <br>
            <br>
            <br>
            <button class="but">
                <a>Reset</a>
            </button>
        </form>
    </div>
</template>

<script>
    import { Modal } from "bootstrap";
    import NavBar from './navbar.vue'

    export default {
        path: '/reset',
        name: 'ResetPassword',
        components: {
            NavBar,
        },
        data() {
            return {
                email: "",
                modalTitle: "",
                modalText: "",
                done: false,
                myModal: null,
            };
        },
        mounted() {
            this.myModal = new Modal(document.getElementById("myModal"));
        },
        methods: {
            closeModal() {
                this.myModal.hide();
                if(this.done) {
                    this.$router.replace("/login");
                }
            },

            login() {
                const { email } = this;

                this.errorMsg = "";

                localStorage.userError = "";
                localStorage.passwordError = "";
                localStorage.otherError = "";
                localStorage.pressed = true;
                
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: email
                };
                fetch("https://tfb308.herokuapp.com/api/v1/user/reset", requestOptions).
                then((res) => res.json()).
                then((data) => {
                    if(data.status === "200") {
                        this.done = true;
                        this.modalTitle = "Reset Password Confirmation";
                        this.modalText = "Please check your inbox for instructions!";
                    }
                    else {
                        this.modalTitle = "Error";
                        this.modalText = data.returnObject;
                    }
                    this.myModal.show();
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