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
    
    <div class="signup-page">
        <form class="signup-form" @submit.prevent="signup">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Sign Up</h2>
            <br>
            <br>
            <label for="name">Name</label>
            <input name="name" v-model="name" placeholder="Name" type="text">
            <br>
            <label for="mail">Mail</label>
            <input name="mail" v-model="mail" placeholder="Enter mail" type="email">
            <br>
            <label for="password">Password</label>
            <input name="password" v-model="password" placeholder="Enter password" type="password" minlength="8" required autocomplete="current-password" >
            <br>
            <label for="birthday">Birthdate</label>
            <input type="date" name="birthdate" v-model="birthdate" required>
            <br>
            <div>
                <input type="radio" id="male" value="Male" name="gender" v-model="gender" required>
                <label for="male">&nbsp;Male</label>
                &nbsp;&nbsp;
                <input type="radio" id="Female" value="female" name="gender" v-model="gender" required>
                <label for="female">&nbsp;Female</label>
                &nbsp;&nbsp;
                <input type="radio" id="Other" value="other" name="gender" v-model="gender" required>
                <label for="other">&nbsp;Other</label>
            </div>
            <br>
            <label for="team">Choose your team</label>
            <select name="fanTeam" v-model="fanTeam" title="Choose a team that you are fan of it!" required>
                <option v-for="item in items" :key="item.id" :value="item.name"> {{ item.name }} </option>
            </select>
            <br>
            <br>
            <button class="but">
                <a>REGISTER</a>
            </button>
           
        </form>
    </div>
</template>

<script>
    import { Modal } from "bootstrap";
    import NavBar from './navbar.vue';

    export default {
        path: '/signup',
        name: 'SignUp',
        components: {
            NavBar,
        },
        data() {
            return {
                mail: "",
                name: "",
                password: "",
                birthdate: "",
                gender: "",
                fanTeam: "",
                items: [],
                errorMsg: "",
                myModal: null,
            };
        },
        mounted() {
            this.myModal = new Modal(document.getElementById("myModal"));

            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/team/all", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.items = data.returnObject;
                }
            });
        },
        methods: {
            closeModal() {
                this.myModal.hide();
            },

            signup() {
                const { mail, name, password, gender, fanTeam } = this;
                const birthdate = this.birthdate.replaceAll("/", "-");

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mail,
                        name,
                        password,
                        gender,
                        birthdate,
                        fanTeam,
                    })
                };
                fetch("https://tfb308.herokuapp.com/api/v1/user/signup", requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    if(data.status !== "200") {
                        this.errorMsg = data.returnObject;
                        this.myModal.show();
                    }
                    else {
                        this.$router.push("/login");
                    }
                })
                
                
            }
        }
    };
</script>

<style scoped>
    .title-login{
        color: rgba(33, 66, 114, 0.818);
    }

    .signup-page{
        margin-top: 70px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        display: flexbox;
        min-height: calc(100vh - 70px);
        background: rgba(185, 185, 185, 0.725);
    }

    .signup-form{
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
</style>
